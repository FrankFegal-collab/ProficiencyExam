import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { doc, getDoc, setDoc, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db, OperationType, handleFirestoreError } from "../utils/firebase";
import { UserStats, LeaderboardEntry } from "../types";
import { getInitialStats, saveUserStats, getAvatarUrl } from "../utils/gameUtils";

interface FirebaseContextType {
  user: { uid: string; isAnonymous: boolean } | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  onlineLeaderboard: LeaderboardEntry[];
  stats: UserStats;
  currentUsername: string;
  updateStats: (newStats: UserStats, newlyUnlocked: string[]) => Promise<void>;
  updateUsername: (newUsername: string, avatarId?: string) => Promise<void>;
  resetProgressAll: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [studentUid] = useState<string>(() => {
    let uid = localStorage.getItem("pit_bsit_student_uuid");
    if (!uid) {
      uid = "guest_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
      localStorage.setItem("pit_bsit_student_uuid", uid);
    }
    return uid;
  });

  const [user] = useState<{ uid: string; isAnonymous: boolean }>(() => ({
    uid: studentUid,
    isAnonymous: true,
  }));

  const [loading, setLoading] = useState(true);
  const [onlineLeaderboard, setOnlineLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Local state initialized immediately from cache to avoid flicker on load
  const [stats, setStats] = useState<UserStats>(() => getInitialStats());
  const [currentUsername, setCurrentUsername] = useState<string>(() => {
    const cached = localStorage.getItem("pit_bsit_student_username");
    if (cached && cached !== "enter nickname" && cached.trim() !== "") {
      return cached;
    }
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const generatedName = `Classmate_${randomHex}`;
    localStorage.setItem("pit_bsit_student_username", generatedName);
    return generatedName;
  });

  // Load cloud data on startup and perform a smart merge
  useEffect(() => {
    let isSubscribed = true;

    async function loadStatsAndProvision() {
      try {
        const userDocRef = doc(db, "users", studentUid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const cloudData = docSnap.data() as any;

          // Merge local and cloud progress intelligently
          const fetchedStats: UserStats = {
            xp: cloudData.xp ?? 0,
            level: cloudData.level ?? 1,
            streak: Math.max(stats.streak ?? 0, cloudData.streak ?? 0),
            lastActiveDate: cloudData.lastActiveDate ?? new Date().toISOString().split("T")[0],
            totalAnswered: Math.max(stats.totalAnswered ?? 0, cloudData.totalAnswered ?? 0),
            totalCorrect: Math.max(stats.totalCorrect ?? 0, cloudData.totalCorrect ?? 0),
            totalWrong: Math.max(stats.totalWrong ?? 0, cloudData.totalWrong ?? 0),
            subjectProgress: stats.subjectProgress,
            unlockedBadges: Array.from(new Set([
              ...(stats.unlockedBadges || []),
              ...(cloudData.unlockedBadges || [])
            ])),
            survivalHighScore: Math.max(stats.survivalHighScore ?? 0, cloudData.survivalHighScore ?? 0),
            avatarId: cloudData.avatarId ?? stats.avatarId ?? "pixel_dev",
          };

          // To avoid overwriting newer local progress, check if local device is ahead
          const localIsAhead = (stats.level > fetchedStats.level) || 
                               (stats.level === fetchedStats.level && stats.xp > fetchedStats.xp);

          const finalStats = localIsAhead ? {
            ...stats,
            unlockedBadges: fetchedStats.unlockedBadges,
            survivalHighScore: fetchedStats.survivalHighScore,
          } : fetchedStats;

          let loadedUsername = cloudData.username || localStorage.getItem("pit_bsit_student_username");
          if (!loadedUsername || loadedUsername === "enter nickname" || loadedUsername.trim() === "") {
            const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
            loadedUsername = `Classmate_${randomHex}`;
          }

          localStorage.setItem("pit_bsit_student_username", loadedUsername);
          saveUserStats(finalStats);

          if (isSubscribed) {
            setStats(finalStats);
            setCurrentUsername(loadedUsername);

            // Immediately sync back to the cloud if the local stats were further ahead
            if (localIsAhead) {
              const payload = {
                username: loadedUsername.substring(0, 18),
                xp: finalStats.xp,
                level: finalStats.level,
                streak: finalStats.streak,
                lastActiveDate: finalStats.lastActiveDate,
                totalAnswered: finalStats.totalAnswered,
                totalCorrect: finalStats.totalCorrect,
                totalWrong: finalStats.totalWrong,
                survivalHighScore: finalStats.survivalHighScore,
                avatarId: finalStats.avatarId ?? "pixel_dev",
              };
              await setDoc(userDocRef, payload);
            }
          }
        } else {
          // Document does not exist in Firestore yet: provision with current local specs
          let defaultName = localStorage.getItem("pit_bsit_student_username");
          if (!defaultName || defaultName === "enter nickname" || defaultName.trim() === "") {
            const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
            defaultName = `Classmate_${randomHex}`;
            localStorage.setItem("pit_bsit_student_username", defaultName);
          }
          const payload = {
            username: defaultName.substring(0, 18),
            xp: stats.xp,
            level: stats.level,
            streak: stats.streak,
            lastActiveDate: stats.lastActiveDate,
            totalAnswered: stats.totalAnswered,
            totalCorrect: stats.totalCorrect,
            totalWrong: stats.totalWrong,
            survivalHighScore: stats.survivalHighScore,
            avatarId: stats.avatarId ?? "pixel_dev",
          };
          await setDoc(userDocRef, payload);
        }
      } catch (error) {
        console.error("Error setting up user profile in Firestore:", error);
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    }

    loadStatsAndProvision();

    return () => {
      isSubscribed = false;
    };
  }, [studentUid]);

  // Real-time listener for the leaderboard
  useEffect(() => {
    // Single-field ordering (natively indexed in Firestore; never fails or triggers composite index issues)
    // We scale limit to 100 on level, then sort by cumulative total XP client-side for ultra-accurate ranking.
    const q = query(collection(db, "users"), orderBy("level", "desc"), limit(100));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const uList: LeaderboardEntry[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const isUser = docSnap.id === studentUid;
          
          let username = data.username || "Anonymous Classmate";
          if (username === "enter nickname" || username.trim() === "") {
            username = "Anonymous Classmate";
          }

          // Calculate cumulative/total XP for accurate sorting
          let cumulativeXp = data.xp || 0;
          const level = data.level || 1;
          for (let i = 1; i < level; i++) {
            cumulativeXp += i * 300; // matching getXPNeededForLevel(i)
          }

          uList.push({
            username: username,
            avatar: getAvatarUrl(username, data.avatarId),
            level: level,
            xp: cumulativeXp,
            score: cumulativeXp,
            isCurrentUser: isUser,
          });
        });

        // Client-side sort on real cumulative total XP
        uList.sort((a, b) => b.xp - a.xp);

        setOnlineLeaderboard(uList.slice(0, 30)); // Take top 30 classmates

        // Auto-seed competitive classmate profiles in the live database if solo,
        // so multiple real-time profiles are immediately visible and interactive!
        const hasSeeded = localStorage.getItem("pit_bsit_leaderboard_seeded_v1");
        if (snapshot.size <= 1 && !hasSeeded) {
          localStorage.setItem("pit_bsit_leaderboard_seeded_v1", "true");
          const currentDateStr = new Date().toISOString().split("T")[0];
          const seedCompetitors = [
            { id: "seed_comp_1", username: "BinaryBoss_PIT", xp: 1200, level: 44, streak: 15, lastActiveDate: currentDateStr, totalAnswered: 150, totalCorrect: 120, totalWrong: 30, survivalHighScore: 48, avatarId: "pixel_ninja" },
            { id: "seed_comp_2", username: "Grace_Ada_Albay", xp: 1100, level: 38, streak: 12, lastActiveDate: currentDateStr, totalAnswered: 120, totalCorrect: 100, totalWrong: 20, survivalHighScore: 25, avatarId: "pixel_wizard" },
            { id: "seed_comp_3", username: "PhpTabacoExpert", xp: 500, level: 32, streak: 10, lastActiveDate: currentDateStr, totalAnswered: 100, totalCorrect: 85, totalWrong: 15, survivalHighScore: 30, avatarId: "pixel_dev" },
            { id: "seed_comp_4", username: "QueryQueen_Panal", xp: 800, level: 27, streak: 8, lastActiveDate: currentDateStr, totalAnswered: 80, totalCorrect: 68, totalWrong: 12, survivalHighScore: 18, avatarId: "pixel_geek" },
            { id: "seed_comp_5", username: "NetWarrior_2026", xp: 800, level: 21, streak: 6, lastActiveDate: currentDateStr, totalAnswered: 60, totalCorrect: 50, totalWrong: 10, survivalHighScore: 15, avatarId: "pixel_robot" },
            { id: "seed_comp_6", username: "Linus_Panal", xp: 200, level: 16, streak: 5, lastActiveDate: currentDateStr, totalAnswered: 45, totalCorrect: 38, totalWrong: 7, survivalHighScore: 13, avatarId: "pixel_knight" },
            { id: "seed_comp_7", username: "WebDevWizard", xp: 600, level: 11, streak: 3, lastActiveDate: currentDateStr, totalAnswered: 30, totalCorrect: 25, totalWrong: 5, survivalHighScore: 10, avatarId: "pixel_astronaut" },
            { id: "seed_comp_8", username: "FreshmanFox", xp: 900, level: 5, streak: 1, lastActiveDate: currentDateStr, totalAnswered: 15, totalCorrect: 11, totalWrong: 4, survivalHighScore: 6, avatarId: "pixel_cat" },
            { id: "seed_comp_9", username: "NullPointer_Tab", xp: 450, level: 3, streak: 1, lastActiveDate: currentDateStr, totalAnswered: 10, totalCorrect: 7, totalWrong: 3, survivalHighScore: 4, avatarId: "pixel_dog" }
          ];
          seedCompetitors.forEach(async (comp) => {
            const competitorRef = doc(db, "users", comp.id);
            const { id, ...competitorPayload } = comp;
            try {
              await setDoc(competitorRef, competitorPayload);
            } catch (err) {
              console.error("Failed to seed competitor:", comp.username, err);
            }
          });
        }
      },
      (error) => {
        console.error("Firestore Leaderboard listen error (non-fatal): ", error);
      }
    );

    return () => unsubscribe();
  }, [studentUid]);

  // Safe handler to update stats both locally and on the cloud
  const updateStats = useCallback(async (newStats: UserStats, newlyUnlocked: string[]) => {
    setStats(newStats);
    saveUserStats(newStats);

    try {
      const userDocRef = doc(db, "users", studentUid);
      const payload = {
        username: currentUsername.substring(0, 18),
        xp: newStats.xp,
        level: newStats.level,
        streak: newStats.streak,
        lastActiveDate: newStats.lastActiveDate,
        totalAnswered: newStats.totalAnswered,
        totalCorrect: newStats.totalCorrect,
        totalWrong: newStats.totalWrong,
        survivalHighScore: newStats.survivalHighScore,
        avatarId: newStats.avatarId ?? "pixel_dev",
      };
      await setDoc(userDocRef, payload, { merge: true });
    } catch (error) {
      console.error("Error updating user statistics in Firestore: ", error);
    }
  }, [studentUid, currentUsername]);

  // Safe handler to update nickname and/or avatar ID both locally and on the cloud
  const updateUsername = useCallback(async (newUsername: string, avatarId?: string) => {
    setCurrentUsername(newUsername);
    localStorage.setItem("pit_bsit_student_username", newUsername);

    const updatedStats = { ...stats };
    if (avatarId) {
      updatedStats.avatarId = avatarId;
      setStats(updatedStats);
      saveUserStats(updatedStats);
    }

    try {
      const userDocRef = doc(db, "users", studentUid);
      const payload = {
        username: newUsername.substring(0, 18),
        xp: updatedStats.xp,
        level: updatedStats.level,
        streak: updatedStats.streak,
        lastActiveDate: updatedStats.lastActiveDate,
        totalAnswered: updatedStats.totalAnswered,
        totalCorrect: updatedStats.totalCorrect,
        totalWrong: updatedStats.totalWrong,
        survivalHighScore: updatedStats.survivalHighScore,
        avatarId: updatedStats.avatarId ?? "pixel_dev",
      };
      await setDoc(userDocRef, payload, { merge: true });
    } catch (error) {
      console.error("Error updating nickname in Firestore: ", error);
    }
  }, [studentUid, stats]);

  // Safe progress purge handler
  const resetProgressAll = useCallback(async () => {
    localStorage.removeItem("pit_bsit_user_stats");
    localStorage.removeItem("pit_bsit_student_username");

    const defaultStats: UserStats = {
      xp: 0,
      level: 1,
      streak: 0,
      lastActiveDate: new Date().toISOString().split("T")[0],
      totalAnswered: 0,
      totalCorrect: 0,
      totalWrong: 0,
      subjectProgress: {},
      unlockedBadges: [],
      survivalHighScore: 0,
      avatarId: "pixel_dev"
    };

    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const defaultName = `Classmate_${randomHex}`;
    localStorage.setItem("pit_bsit_student_username", defaultName);

    setStats(defaultStats);
    setCurrentUsername(defaultName);
    saveUserStats(defaultStats);

    try {
      const userDocRef = doc(db, "users", studentUid);
      const payload = {
        username: defaultName.substring(0, 18),
        xp: defaultStats.xp,
        level: defaultStats.level,
        streak: defaultStats.streak,
        lastActiveDate: defaultStats.lastActiveDate,
        totalAnswered: defaultStats.totalAnswered,
        totalCorrect: defaultStats.totalCorrect,
        totalWrong: defaultStats.totalWrong,
        survivalHighScore: defaultStats.survivalHighScore,
        avatarId: defaultStats.avatarId,
      };
      await setDoc(userDocRef, payload);
    } catch (error) {
      console.error("Error resetting user document in Firestore: ", error);
    }
  }, [studentUid]);

  const signInWithGoogle = async () => {};
  const logout = async () => {};

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        logout,
        onlineLeaderboard,
        stats,
        currentUsername,
        updateStats,
        updateUsername,
        resetProgressAll,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}
