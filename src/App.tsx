import { useState, useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import QuizPlayground from "./components/QuizPlayground";
import ResultsView from "./components/ResultsView";
import StudyDeck from "./components/StudyDeck";
import AdminPanel from "./components/AdminPanel";

import { QUESTIONS } from "./data/questions";
import { UserStats, Question, GameSession } from "./types";
import { getInitialStats, saveUserStats, getRankTitle } from "./utils/gameUtils";
import { audio } from "./utils/audio";
import { Award, Trophy, Bell, Sparkles, Star, Milestone } from "lucide-react";
import { FirebaseProvider, useFirebase } from "./context/FirebaseContext";

export default function App() {
  return (
    <FirebaseProviderWrapper />
  );
}

function FirebaseProviderWrapper() {
  const [currentStats, setCurrentStats] = useState<UserStats>(() => getInitialStats());
  const [statsLoadedHandler, setStatsLoadedHandler] = useState<((stats: UserStats, username: string) => void) | null>(null);

  return (
    <FirebaseProvider
      currentStats={currentStats}
      onStatsLoaded={(stats, username) => {
        if (statsLoadedHandler) {
          statsLoadedHandler(stats, username);
        }
      }}
    >
      <AppContent
        currentStats={currentStats}
        registerStatsLoader={(handler) => setStatsLoadedHandler(() => handler)}
      />
    </FirebaseProvider>
  );
}

function AppContent({ currentStats, registerStatsLoader }: {
  currentStats: UserStats;
  registerStatsLoader: (handler: (stats: UserStats, username: string) => void) => void;
}) {
  const { user, signInWithGoogle, logout, onlineLeaderboard, syncUserStatsToCloud } = useFirebase();

  // Global States
  const [stats, setStats] = useState<UserStats>(currentStats);
  const [currentUsername, setCurrentUsername] = useState<string>(() => {
    const emailPrefix = "enter nickname";
    const cached = localStorage.getItem("pit_bsit_student_username");
    return cached || emailPrefix;
  });

  const [activeMode, setActiveMode] = useState<"LOBBY" | "SUBJECT" | "QUICK" | "SURVIVAL" | "EXAM" | "DAILY" | "RESULTS" | "STUDY" | "ADMIN">("LOBBY");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  // Persistent dynamic questions list (includes potential admin modifications saved locally)
  const [appQuestions, setAppQuestions] = useState<Question[]>(() => {
    const cached = localStorage.getItem("pit_bsit_questions_cache");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed loading questions cache", e);
      }
    }
    return QUESTIONS;
  });

  // Active quiz session properties
  const [activeSession, setActiveSession] = useState<GameSession | null>(null);

  // Buffer state just for newly unlocked achievements alerts
  const [achievementAlert, setAchievementAlert] = useState<string | null>(null);
  const [levelUpAlert, setLevelUpAlert] = useState<number | null>(null);

  // Register custom handler to listen to stats loaded from cloud DB
  useEffect(() => {
    registerStatsLoader((loadedStats, loadedUsername) => {
      setStats(loadedStats);
      setCurrentUsername(loadedUsername);
      saveUserStats(loadedStats);
      localStorage.setItem("pit_bsit_student_username", loadedUsername);
    });
  }, [registerStatsLoader]);

  const handleSignOut = async () => {
    try {
      await logout();
      localStorage.removeItem("pit_bsit_student_username");
      localStorage.removeItem("pit_bsit_user_stats");
      
      const defaultStats: UserStats = {
        xp: 0,
        level: 1,
        streak: 1,
        lastActiveDate: new Date().toISOString().split("T")[0],
        totalAnswered: 0,
        totalCorrect: 0,
        totalWrong: 0,
        subjectProgress: {},
        unlockedBadges: [],
        survivalHighScore: 0
      };
      setStats(defaultStats);
      saveUserStats(defaultStats);
      setCurrentUsername("enter nickname");
      setActiveMode("LOBBY");
    } catch (err) {
      console.error("Failed to safely sign out user:", err);
    }
  };

  // Synchronize local changes to Firestore if connected
  useEffect(() => {
    if (user) {
      syncUserStatsToCloud(stats, currentUsername);
    }
  }, [stats, currentUsername, user, syncUserStatsToCloud]);

  // Check if system query parameter is set to admin on boot
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("system") === "admin" || params.get("admin") === "true") {
      setActiveMode("ADMIN");
    }
  }, []);

  // Safe handler to update stats persistently
  const handleUpdateStats = (newStats: UserStats, newlyUnlocked: string[]) => {
    if (newStats.level > stats.level) {
      setLevelUpAlert(newStats.level);
    }
    setStats(newStats);
    saveUserStats(newStats);

    if (newlyUnlocked.length > 0) {
      setAchievementAlert(newlyUnlocked.join(", "));
    }
  };

  const handleUsernameChange = (newNick: string) => {
    setCurrentUsername(newNick);
    localStorage.setItem("pit_bsit_student_username", newNick);
  };

  const handleResetProgressAll = () => {
    localStorage.removeItem("pit_bsit_user_stats");
    localStorage.removeItem("pit_bsit_student_username");
    
    // reset stats hook
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
      survivalHighScore: 0
    };
    
    setStats(defaultStats);
    saveUserStats(defaultStats);
    setCurrentUsername("enter nickname");
    setActiveMode("LOBBY");
  };

  // Sub-track triggers
  const handleSelectSubject = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setActiveMode("SUBJECT");
  };

  const handleStartQuickReview = () => {
    setActiveMode("QUICK");
  };

  const handleStartSurvival = () => {
    setActiveMode("SURVIVAL");
  };

  const handleStartExam = () => {
    setActiveMode("EXAM");
  };

  const handleStartDaily = () => {
    setActiveMode("DAILY");
  };

  // Callback once user ends any test view
  const handleCompleteSession = (session: GameSession) => {
    setActiveSession(session);
    setActiveMode("RESULTS");
  };

  // Resume custom missed review deck play session or setup
  const handlePracticeMissedQuestions = () => {
    if (!activeSession) return;
    const missedQuiz: GameSession = {
      ...activeSession,
      items: activeSession.items.filter(item => !item.answeredCorrectly),
      currentIdx: 0,
    };
    setActiveSession(missedQuiz);
  };

  // Admin dynamic question adjustments
  const handleUpdateQuestion = (updated: Question) => {
    const list = appQuestions.map(q => q.id === updated.id ? updated : q);
    setAppQuestions(list);
    localStorage.setItem("pit_bsit_questions_cache", JSON.stringify(list));
  };

  const handleResetQuestions = () => {
    localStorage.removeItem("pit_bsit_questions_cache");
    setAppQuestions(QUESTIONS);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans transition-all duration-300">
      
      {/* HEADER SECTION HUD */}
      <Header
        stats={stats}
        currentUsername={currentUsername}
        onUsernameChange={handleUsernameChange}
        onResetStats={handleResetProgressAll}
        setMode={setActiveMode}
        user={user}
        onSignIn={signInWithGoogle}
        onSignOut={handleSignOut}
      />

      {/* FLOATING LEVEL UP CELEBRATE MODAL */}
      {levelUpAlert && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-indigo-950/30 to-slate-900 border-2 border-amber-500/30 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden animate-zoom-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-500"></div>
            
            <div className="p-4 bg-amber-500/10 text-amber-400 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
              <Milestone className="w-10 h-10 animate-pulse text-amber-300" />
            </div>

            <h2 className="text-2xl font-black text-white">LEVEL UP INSCRIBED!</h2>
            <p className="text-xs text-amber-400 font-extrabold uppercase font-mono tracking-wider mt-1">
              You Reached Level {levelUpAlert} ★
            </p>

            <p className="text-xs text-gray-400 leading-relaxed my-4">
              Your BSIT academic capability status has advanced. You are now designated as a <span className="text-white font-bold">{getRankTitle(levelUpAlert)}</span>.
            </p>

            <button
              onClick={() => { audio.playClick(); setLevelUpAlert(null); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black tracking-wide text-xs transition shadow-lg animate-pulse"
            >
              Exemplary Progress Continue
            </button>
          </div>
        </div>
      )}

      {/* FLOATING ACHIEVEMENT EARNED ALERT POPUP */}
      {achievementAlert && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 border border-indigo-500/30 rounded-2xl p-4 shadow-2xl shadow-indigo-500/10 animate-slide-in flex items-start gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <Trophy className="w-5 h-5 text-indigo-400 animate-bounce" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white flex items-center gap-1.5 leading-none">
              <span>Achievement Inscription!</span>
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            </h4>
            <p className="text-[11px] text-gray-300 font-semibold mt-1.5">
              Unlocked Badge: <span className="text-indigo-400">{achievementAlert}</span>
            </p>
            <button
              onClick={() => setAchievementAlert(null)}
              className="text-[10px] text-gray-500 hover:text-white font-bold underline block mt-2"
            >
              Dismiss Notification
            </button>
          </div>
        </div>
      )}

      {/* APP VIEWS SWITCH ENGINE */}
      <main className="flex-grow animate-fade-in">
        {activeMode === "LOBBY" && (
          <Dashboard
            stats={stats}
            currentUsername={currentUsername}
            onSelectSubject={handleSelectSubject}
            onStartQuickReview={handleStartQuickReview}
            onStartSurvival={handleStartSurvival}
            onStartExam={handleStartExam}
            onStartDaily={handleStartDaily}
            setMode={setActiveMode}
            onOpenStudyDeck={() => setActiveMode("STUDY")}
            onlineLeaderboard={onlineLeaderboard}
            user={user}
            onSignIn={signInWithGoogle}
          />
        )}

        {(activeMode === "SUBJECT" ||
          activeMode === "QUICK" ||
          activeMode === "SURVIVAL" ||
          activeMode === "EXAM" ||
          activeMode === "DAILY") && (
          <QuizPlayground
            stats={stats}
            onUpdateStats={handleUpdateStats}
            mode={activeMode}
            subjectFilter={selectedSubject}
            allQuestions={appQuestions}
            onExit={() => {
              audio.playClick();
              setActiveMode("LOBBY");
            }}
            onComplete={handleCompleteSession}
          />
        )}

        {activeMode === "RESULTS" && activeSession && (
          <ResultsView
            session={activeSession}
            stats={stats}
            currentUsername={currentUsername}
            onRestart={() => {
              setActiveMode("LOBBY");
              setActiveSession(null);
            }}
            onPracticeMissed={handlePracticeMissedQuestions}
            setMode={setActiveMode}
          />
        )}

        {activeMode === "STUDY" && (
          <StudyDeck
            questions={appQuestions}
            onExit={() => {
              audio.playClick();
              setActiveMode("LOBBY");
            }}
          />
        )}

        {activeMode === "ADMIN" && (
          <AdminPanel
            questions={appQuestions}
            stats={stats}
            currentUsername={currentUsername}
            onUpdateQuestion={handleUpdateQuestion}
            onResetQuestions={handleResetQuestions}
            onResetProgressAll={handleResetProgressAll}
            onExit={() => {
              audio.playClick();
              setActiveMode("LOBBY");
            }}
          />
        )}
      </main>

      {/* FOOTER BAR */}
      <footer className="border-t border-slate-900 bg-slate-950/40 py-6 text-center text-xs text-gray-650 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-gray-500 font-medium">
          <div>
            <span 
              onDoubleClick={() => {
                audio.playClick();
                setActiveMode("ADMIN");
              }}
              className="cursor-default select-none hover:text-indigo-400/30 transition duration-550"
              title="Official Institutional administration portal access"
            >
              © 2026 Polytechnic Institute of Tabaco • BSIT Study Center
            </span>
          </div>
          <div className="flex justify-center gap-4 text-[10px] uppercase font-mono tracking-wider text-gray-650">
            <span>Verified Source Reviewer Phase 2 Expanded Edition</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
