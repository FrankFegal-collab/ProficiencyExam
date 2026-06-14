import { Question, GameSession, UserStats } from "../types";
import { audio } from "../utils/audio";
import { getRankTitle, addXP, checkAchievements, getInitialStats, saveUserStats } from "../utils/gameUtils";
import {
  Heart,
  Timer,
  AlertTriangle,
  Award,
  Zap,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface QuizPlaygroundProps {
  stats: UserStats;
  onUpdateStats: (newStats: UserStats, newlyUnlocked: string[]) => void;
  mode: "SUBJECT" | "QUICK" | "SURVIVAL" | "EXAM" | "DAILY";
  subjectFilter?: string;
  allQuestions: Question[];
  onExit: () => void;
  onComplete: (session: GameSession) => void;
}

export default function QuizPlayground({
  stats,
  onUpdateStats,
  mode,
  subjectFilter,
  allQuestions,
  onExit,
  onComplete
}: QuizPlaygroundProps) {
  // Prep questions based on mode
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lives, setLives] = useState<number | undefined>(undefined);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [selectedAnswersMap, setSelectedAnswersMap] = useState<{ [qId: number]: number }>({});
  const [incorrectList, setIncorrectList] = useState<number[]>([]);
  const [xpGainedSession, setXpGainedSession] = useState(0);
  const [floatingXpText, setFloatingXpText] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize questions list
  useEffect(() => {
    let list: Question[] = [];

    if (mode === "SUBJECT") {
      list = allQuestions.filter(q => q.subject === subjectFilter);
    } else if (mode === "QUICK") {
      // Shuffled random 10
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      list = shuffled.slice(0, 10);
    } else if (mode === "SURVIVAL") {
      // Endless randomized shuffling
      list = [...allQuestions].sort(() => 0.5 - Math.random());
      setLives(3);
    } else if (mode === "EXAM") {
      // Simulated entire exam: all 175 questions sorted or randomized
      list = [...allQuestions].sort((a, b) => a.id - b.id);
    } else if (mode === "DAILY") {
      // Deterministic 10 questions for today
      const todayNum = new Date().getDate();
      const startIndex = (todayNum * 7) % (allQuestions.length - 12);
      list = allQuestions.slice(startIndex, startIndex + 10);
    }

    setQuestions(list);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeTaken(0);
    setIncorrectList([]);
    setSelectedAnswersMap({});
    setSelectedAnswer(null);
    setIsLocked(false);
    setXpGainedSession(0);
  }, [mode, subjectFilter, allQuestions]);

  // Handle active seconds stopwatch
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeTaken(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleSelectChoice = (choiceIndex: number) => {
    if (isLocked) return;
    setSelectedAnswer(choiceIndex);
    audio.playClick();
  };

  const handleLockChoice = () => {
    if (selectedAnswer === null || isLocked) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setIsLocked(true);

    // Save selected answer to map
    const newAnswersMap = { ...selectedAnswersMap, [currentQuestion.id]: selectedAnswer };
    setSelectedAnswersMap(newAnswersMap);

    let xpValue = 10;
    if (currentQuestion.difficulty === "Medium") xpValue = 20;
    if (currentQuestion.difficulty === "Hard") xpValue = 30;

    if (isCorrect) {
      audio.playCorrect();
      setScore(prev => prev + 1);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);

      setXpGainedSession(prev => prev + xpValue);
      setFloatingXpText(`+${xpValue} XP`);

      // Clear floating text after anim
      setTimeout(() => setFloatingXpText(null), 1200);
    } else {
      audio.playWrong();
      setStreak(0);
      setIncorrectList(prev => [...prev, currentQuestion.id]);

      if (mode === "SURVIVAL" && lives !== undefined) {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          // Finish session on death delay
          setTimeout(() => {
            handleCompleteSession(newAnswersMap, score, timeTaken, [...incorrectList, currentQuestion.id]);
          }, 1500);
          return;
        }
      }
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsLocked(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      handleCompleteSession(selectedAnswersMap, score, timeTaken, incorrectList);
    }
  };

  const handleCompleteSession = (
    finalAnswers: { [qId: number]: number },
    finalScore: number,
    finalSeconds: number,
    finalIncorrect: number[]
  ) => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Dynamic XP Reward synthesis
    let bonusXP = 0;
    if (mode === "SUBJECT" && finalScore === 25) bonusXP = 100;
    if (mode === "DAILY" && finalScore >= 8) bonusXP = 50;
    if (mode === "EXAM" && finalScore >= 120) bonusXP = 500;

    const totalXPEarned = xpGainedSession + bonusXP;

    // Save final stats update variables
    let currentStats = { ...stats };
    currentStats.totalAnswered += questions.length;
    currentStats.totalCorrect += finalScore;
    currentStats.totalWrong += (questions.length - finalScore);

    // Subject progress updates
    if (mode === "SUBJECT" && subjectFilter) {
      const prevSubStats = currentStats.subjectProgress[subjectFilter] || { answered: 0, correct: 0, highScore: 0 };
      currentStats.subjectProgress[subjectFilter] = {
        answered: Math.max(prevSubStats.answered, questions.length),
        correct: Math.max(prevSubStats.correct, finalScore),
        highScore: Math.max(prevSubStats.highScore, finalScore)
      };
    }

    // Survival High Score updates
    if (mode === "SURVIVAL") {
      currentStats.survivalHighScore = Math.max(currentStats.survivalHighScore, finalScore);
    }

    // Daily Challenge completion timestamp
    if (mode === "DAILY") {
      currentStats.dailyChallengeDoneDate = new Date().toISOString().split("T")[0];
    }

    // Weekly streak bump increments
    const today = new Date().toISOString().split("T")[0];
    if (currentStats.lastActiveDate !== today) {
      currentStats.streak += 1;
      currentStats.lastActiveDate = today;
    }

    // Commit dynamic Experience values
    const xpResponse = addXP(currentStats, totalXPEarned);
    currentStats = xpResponse.stats;

    // Check achievement metrics immediately
    const achResponse = checkAchievements(
      currentStats,
      maxStreak,
      subjectFilter,
      mode === "EXAM",
      mode === "DAILY"
    );

    onUpdateStats(achResponse.stats, achResponse.newlyUnlocked);

    // Callback complete view
    onComplete({
      mode,
      subjectId: subjectFilter,
      questions,
      currentIndex: questions.length,
      selectedAnswers: finalAnswers,
      timeTaken: finalSeconds,
      score: finalScore,
      lives,
      streak: maxStreak,
      maxStreak,
      incorrectQuestions: finalIncorrect
    });
  };

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-gray-300">
        <HelpCircle className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
        <p className="font-mono text-sm leading-relaxed">System assembling diagnostic parameters...</p>
      </div>
    );
  }

  // Format Elapsed Timer nicely
  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  const currentPercent = Math.round(((currentIndex) / questions.length) * 100);

  return (
    <div id="quiz_layout" className="max-w-3xl mx-auto px-4 py-6">
      {/* HUD HEADER */}
      <div className="flex items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold leading-normal">
            <div className="text-gray-400 uppercase font-mono tracking-wider text-[10px]">
              {mode} MODE
            </div>
            <div className="text-white text-sm font-black">
              Q. {currentIndex + 1} <span className="text-gray-500 font-normal">/ {questions.length}</span>
            </div>
          </div>
        </div>

        {/* Lives (Survival Mode) */}
        {mode === "SURVIVAL" && lives !== undefined && (
          <div className="flex items-center gap-1 bg-red-950/20 border border-red-900/20 px-3 py-1.5 rounded-xl text-red-500">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Heart
                key={idx}
                className={`w-5 h-5 ${idx < lives ? "fill-red-500 stroke-red-500 scale-110" : "text-slate-800 scale-95"} transition-all duration-300`}
              />
            ))}
          </div>
        )}

        {/* Combos Streaks */}
        {streak > 2 && (
          <div className="flex items-center gap-1 text-xs text-orange-400 font-extrabold animate-bounce bg-orange-950/20 border border-orange-900/30 px-3 py-1.5 rounded-xl">
            <Zap className="w-4 h-4 fill-orange-500 stroke-orange-500" />
            <span>{streak} Streak!</span>
          </div>
        )}

        {/* Stopwatch Chrono */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 rounded-xl border border-slate-800 text-gray-300 font-mono text-xs">
          <Timer className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>{formatTimer(timeTaken)}</span>
        </div>
      </div>

      {/* PROGRESS FLOW BAR */}
      <div className="px-1 mb-6">
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${currentPercent}%` }}
          ></div>
        </div>
      </div>

      {/* MAIN QUESTION CARD */}
      <div className="relative bg-slate-900/40 border border-blue-900/20 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl mb-6">
        {/* Floating XP Gain Visual */}
        {floatingXpText && (
          <div className="absolute top-4 right-4 pointer-events-none animate-bounce bg-yellow-400 text-slate-950 font-black text-sm px-3 py-1.5 rounded-xl shadow-lg ring-2 ring-white/20">
            {floatingXpText}
          </div>
        )}

        {/* Topic Tag info header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs bg-slate-950 border border-slate-800 text-indigo-300 px-3 py-1 rounded-full font-bold uppercase font-mono">
            {currentQuestion.subject}
          </span>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-bold font-mono ${
              currentQuestion.difficulty === "Easy"
                ? "bg-emerald-950/40 border border-emerald-900/30 text-emerald-400"
                : currentQuestion.difficulty === "Medium"
                ? "bg-amber-950/40 border border-amber-900/30 text-amber-400"
                : "bg-rose-950/40 border border-rose-900/30 text-rose-400"
            }`}
          >
            {currentQuestion.difficulty}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-base md:text-lg font-bold text-white leading-relaxed mb-6">
          {currentQuestion.question}
        </h2>

        {/* Choices Option Stack */}
        <div className="flex flex-col gap-3">
          {currentQuestion.choices.map((choice, idx) => {
            const letter = ["A", "B", "C", "D"][idx];
            const isSelected = selectedAnswer === idx;

            let optionStyle = "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-gray-300";

            if (isLocked) {
              const isCorrectTarget = idx === currentQuestion.correctAnswer;
              if (isCorrectTarget) {
                optionStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/20 shadow-md shadow-emerald-500/5";
              } else if (isSelected && !isCorrectTarget) {
                optionStyle = "bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500/20";
              } else {
                optionStyle = "bg-slate-950/20 border-slate-900 text-gray-600 cursor-not-allowed";
              }
            } else if (isSelected) {
              optionStyle = "bg-indigo-950/60 border-indigo-500 text-indigo-200 ring-1 ring-indigo-500/40";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectChoice(idx)}
                disabled={isLocked}
                className={`flex items-center gap-3 w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all duration-200 group relative ${optionStyle}`}
              >
                {/* Prefix choice identifier alphabet bubble */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs font-mono transition-colors ${
                    isLocked && idx === currentQuestion.correctAnswer
                      ? "bg-emerald-500 text-slate-950"
                      : isLocked && isSelected
                      ? "bg-rose-500 text-white"
                      : isSelected
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-900 group-hover:bg-slate-800 text-gray-400"
                  }`}
                >
                  {letter}
                </div>
                <div className="flex-1 pr-4">{choice}</div>
              </button>
            );
          })}
        </div>

        {/* Reveal explanation after locked */}
        {isLocked && (
          <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-2xl animate-fade-in">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs font-mono uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Diagnostic Explanation</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* QUIZ SUBMIT NAVIGATION BUTTONS */}
      <div className="flex items-center justify-between gap-4">
        {mode !== "EXAM" ? (
          <button
            onClick={() => { audio.playClick(); onExit(); }}
            className="px-5 py-2.5 rounded-xl font-bold bg-slate-950 border border-slate-900 hover:border-slate-800 text-gray-400 hover:text-white transition text-xs font-mono cursor-pointer"
          >
            ← Leave Session
          </button>
        ) : (
          <div className="text-[10px] text-gray-500 font-mono tracking-wider italic uppercase">
            ⚠️ Exit / Pause is Disabled for Simulated Exam
          </div>
        )}

        {!isLocked ? (
          <button
            onClick={handleLockChoice}
            disabled={selectedAnswer === null}
            className="px-6 py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition text-xs shadow disabled:opacity-50 cursor-pointer"
          >
            Lock Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center gap-1.5 transition text-xs shadow cursor-pointer animate-pulse"
          >
            <span>{currentIndex + 1 < questions.length ? "Next Question" : "View Results"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
