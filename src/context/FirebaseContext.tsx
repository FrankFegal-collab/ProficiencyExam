import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { doc, getDoc, setDoc, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db, OperationType, handleFirestoreError } from "../utils/firebase";
import { UserStats, LeaderboardEntry } from "../types";
import { getAvatarUrl } from "../utils/gameUtils";

interface FirebaseContextType {
  user: { uid: string; isAnonymous: boolean } | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  onlineLeaderboard: LeaderboardEntry[];
  syncUserStatsToCloud: (stats: UserStats, username: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children, currentStats, onStatsLoaded }: {
  children: ReactNode;
  currentStats: UserStats;
  onStatsLoaded: (stats: UserStats, username: string) => void;
}) {
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

  // Load user data on startup and sync
  useEffect(() => {
    let isSubscribed = true;

    async function loadStatsAndProvision() {
      try {
        const userDocRef = doc(db, "users", studentUid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const cloudData = docSnap.data() as any;

          // Perform a unified smart merge of local and cloud progress
          const fetchedStats: UserStats = {
            xp: cloudData.xp ?? 0,
            level: cloudData.level ?? 1,
            streak: cloudData.streak ?? 0,
            lastActiveDate: cloudData.lastActiveDate ?? new Date().toISOString().split("T")[0],
            totalAnswered: cloudData.totalAnswered ?? 0,
            totalCorrect: cloudData.totalCorrect ?? 0,
            totalWrong: cloudData.totalWrong ?? 0,
            subjectProgress: currentStats.subjectProgress,
            unlockedBadges: Array.from(new Set([
              ...(currentStats.unlockedBadges || []),
              ...(cloudData.unlockedBadges || [])
            ])),
            survivalHighScore: Math.max(currentStats.survivalHighScore ?? 0, cloudData.survivalHighScore ?? 0),
            avatarId: cloudData.avatarId ?? currentStats.avatarId ?? "pixel_dev",
          };

          // To provide a robust user experience and avoid overwriting newer local progress,
          // compare levels and XP to determine if the local device has unsaved progress.
          const localIsAhead = (currentStats.level > fetchedStats.level) || 
                               (currentStats.level === fetchedStats.level && currentStats.xp > fetchedStats.xp);

          const finalStats = localIsAhead ? {
            ...currentStats,
            unlockedBadges: fetchedStats.unlockedBadges,
            survivalHighScore: fetchedStats.survivalHighScore,
          } : fetchedStats;

          let loadedUsername = cloudData.username || localStorage.getItem("pit_bsit_student_username");
          if (!loadedUsername || loadedUsername === "enter nickname" || loadedUsername.trim() === "") {
            const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
            loadedUsername = `Classmate_${randomHex}`;
            localStorage.setItem("pit_bsit_student_username", loadedUsername);
          }
          if (isSubscribed) {
            onStatsLoaded(finalStats, loadedUsername);
          }
        } else {
          // Document doesn't exist, provision it with current local stats
          let defaultName = localStorage.getItem("pit_bsit_student_username");
          if (!defaultName || defaultName === "enter nickname" || defaultName.trim() === "") {
            const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
            defaultName = `Classmate_${randomHex}`;
            localStorage.setItem("pit_bsit_student_username", defaultName);
          }
          const payload = {
            username: defaultName.substring(0, 18),
            xp: currentStats.xp,
            level: currentStats.level,
            streak: currentStats.streak,
            lastActiveDate: currentStats.lastActiveDate,
            totalAnswered: currentStats.totalAnswered,
            totalCorrect: currentStats.totalCorrect,
            totalWrong: currentStats.totalWrong,
            survivalHighScore: currentStats.survivalHighScore,
            avatarId: currentStats.avatarId ?? "pixel_dev",
          };
          await setDoc(userDocRef, payload);
          if (isSubscribed) {
            onStatsLoaded(currentStats, payload.username);
          }
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
  }, [studentUid, onStatsLoaded]);

  // Listen to the real-time leaderboard data from Firestore
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(30));
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

          uList.push({
            username: username,
            avatar: getAvatarUrl(username, data.avatarId),
            level: data.level || 1,
            xp: data.xp || 0,
            score: data.xp || 0,
            isCurrentUser: isUser,
          });
        });
        setOnlineLeaderboard(uList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "users");
      }
    );

    return () => unsubscribe();
  }, [studentUid]);

  const signInWithGoogle = async () => {
    // No-op since Google authentication is removed
  };

  const logout = async () => {
    // No-op
  };

  const syncUserStatsToCloud = useCallback(async (stats: UserStats, username: string) => {
    try {
      const userDocRef = doc(db, "users", studentUid);
      const payload = {
        username: username.substring(0, 18),
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
      await setDoc(userDocRef, payload, { merge: true });
    } catch (error) {
      console.error("Error updating user statistics in Firestore: ", error);
    }
  }, [studentUid]);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        logout,
        onlineLeaderboard,
        syncUserStatsToCloud,
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
