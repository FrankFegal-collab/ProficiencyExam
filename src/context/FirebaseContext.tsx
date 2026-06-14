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
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "users");
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
