import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { auth, db, googleProvider, OperationType, handleFirestoreError } from "../utils/firebase";
import { UserStats, LeaderboardEntry } from "../types";
import { getAvatarUrl, getXPNeededForLevel } from "../utils/gameUtils";

interface FirebaseContextType {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [onlineLeaderboard, setOnlineLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Track Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const cloudData = docSnap.data() as any;
            const fetchedStats: UserStats = {
              xp: cloudData.xp ?? 0,
              level: cloudData.level ?? 1,
              streak: cloudData.streak ?? 0,
              lastActiveDate: cloudData.lastActiveDate ?? new Date().toISOString().split("T")[0],
              totalAnswered: cloudData.totalAnswered ?? 0,
              totalCorrect: cloudData.totalCorrect ?? 0,
              totalWrong: cloudData.totalWrong ?? 0,
              subjectProgress: currentStats.subjectProgress, // keep local or fall back
              unlockedBadges: cloudData.unlockedBadges ?? [],
              survivalHighScore: cloudData.survivalHighScore ?? 0,
            };
            const loadedUsername = cloudData.username || firebaseUser.displayName || `Student_${firebaseUser.uid.substring(0, 5)}`;
            onStatsLoaded(fetchedStats, loadedUsername);
          } else {
            // Document doesn't exist, provision it with current local stats
            const defaultName = firebaseUser.displayName?.replace(/[^a-zA-Z0-9_]/g, "") || `Student_${firebaseUser.uid.substring(0, 5)}`;
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
            };
            await setDoc(userDocRef, payload);
            onStatsLoaded(currentStats, payload.username);
          }
        } catch (error) {
          console.error("Error setting up user profile in Firestore", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [onStatsLoaded]);

  // Listen to the real-time leaderboard data from Firestore
  useEffect(() => {
    if (!user) {
      setOnlineLeaderboard([]);
      return;
    }

    const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(25));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const uList: LeaderboardEntry[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          // Map to LeaderboardEntry shape
          let userTotalXP = data.xp || 0;
          for (let i = 1; i < (data.level || 1); i++) {
            userTotalXP += i * 300; // Formula matching gameUtils.ts: level * 300
          }

          uList.push({
            username: data.username || "Anonymous",
            avatar: getAvatarUrl(data.username || "Anonymous"),
            level: data.level || 1,
            xp: userTotalXP,
            score: data.xp || 0, // Fallback placeholder or XP
            isCurrentUser: docSnap.id === user.uid,
          });
        });
        setOnlineLeaderboard(uList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "users");
      }
    );

    return () => unsubscribe();
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error", error);
    }
  };

  const syncUserStatsToCloud = async (stats: UserStats, username: string) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
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
      };
      await updateDoc(userDocRef, payload);
    } catch (error) {
      console.error("Error updating user statistics in Firestore: ", error);
    }
  };

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
