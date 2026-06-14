import { GameSession, Question, UserStats } from "../types";
import { getRankTitle, getAvatarUrl } from "../utils/gameUtils";
import { audio } from "../utils/audio";
import {
  Trophy,
  Activity,
  Award,
  Zap,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Printer,
  Calendar,
  Layers,
  Heart,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";
import { useState, useEffect } from "react";

interface ResultsViewProps {
  session: GameSession;
  stats: UserStats;
  currentUsername: string;
  onRestart: () => void;
  onPracticeMissed: (missedQuestions: Question[]) => void;
  setMode: (mode: any) => void;
}

export default function ResultsView({
  session,
  stats,
  currentUsername,
  onRestart,
  onPracticeMissed,
  setMode
}: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "review">("summary");

  const total = session.questions.length;
  const correct = session.score;
  const wrong = total - correct;
  const accuracy = Math.round((correct / total) * 100) || 0;

  // Sound effects on load
  useEffect(() => {
    if (accuracy >= 80) {
      audio.playLevelUp();
    } else {
      audio.playAchievement();
    }
  }, [accuracy]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}m ${remaining}s`;
  };

  // Extract failed question records
  const missedQuestionsList = session.questions.filter((q) =>
    session.incorrectQuestions.includes(q.id)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative">
      
      {/* CELEBRATION FLOATING CONFETTI (CSS Only Particles) */}
      {accuracy >= 50 && (
        <div className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden h-[300px] flex justify-center z-10 select-none">
          {Array.from({ length: 40 }).map((_, i) => {
            const colors = ["bg-red-500", "bg-yellow-400", "bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-pink-500"];
            const randomColor = colors[i % colors.length];
            const leftOffset = Math.sin(i) * 50 + 50; // percentage
            const delay = (Math.cos(i) * 3 + 3).toFixed(1); // seconds
            const duration = (Math.random() * 4 + 3).toFixed(1); // seconds

            return (
              <div
                key={i}
                className={`absolute w-3 h-3 rounded ${randomColor} opacity-75 animate-bounce`}
                style={{
                  left: `${leftOffset}%`,
                  top: `-${Math.random() * 50}px`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  transform: `rotate(${i * 15}deg)`
                }}
              />
            );
          })}
        </div>
      )}

      {/* HEADER HERO BOARD */}
      <div className="text-center mb-8 relative z-20">
        <div className="inline-block p-4 bg-gradient-to-tr from-yellow-500 to-amber-400 rounded-full shadow-lg shadow-amber-500/20 mb-4 animate-bounce">
          <Trophy className="w-12 h-12 text-slate-900" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent">
          {accuracy >= 80 ? "Phenomenal Performance!" : accuracy >= 50 ? "Task Completed!" : "Keep Studying!"}
        </h1>
        <p className="text-sm text-gray-400 mt-1 font-medium font-mono">
          {session.mode} Session • {session.subjectId || "Mixed Subjects"}
        </p>
      </div>

      {/* MAIN LAYOUT WRAPPER */}
      <div className="bg-slate-900/40 border border-blue-900/20 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl mb-6">
        
        {/* TABS CONTROLLERS */}
        <div className="flex border-b border-slate-800 mb-6 font-mono text-sm font-bold">
          <button
            onClick={() => setActiveTab("summary")}
            className={`pb-3 px-4 border-b-2 transition cursor-pointer ${activeTab === "summary" ? "border-indigo-500 text-white" : "border-transparent text-gray-400 hover:text-white"}`}
          >
            Review Summary
          </button>
          <button
            onClick={() => setActiveTab("review")}
            className={`pb-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${activeTab === "review" ? "border-indigo-500 text-white" : "border-transparent text-gray-400 hover:text-white"}`}
          >
            <span>Incorrect Cards</span>
            <span className="text-xs bg-red-950 text-red-400 px-2 py-0.5 rounded-full font-bold">
              {missedQuestionsList.length}
            </span>
          </button>
        </div>

        {/* TAB 1: SUMMARY DATA */}
        {activeTab === "summary" && (
          <div className="space-y-6 animate-fade-in">
            {/* STATS TILES GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-center">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Accuracy</div>
                <div className="text-2xl font-black text-indigo-400 font-mono">{accuracy}%</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-center">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Score</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {correct} <span className="text-xs text-gray-500">/ {total}</span>
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-center">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Duration</div>
                <div className="text-2xl font-black text-amber-500 font-mono">{formatTimer(session.timeTaken)}</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-center">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">XP Earned</div>
                <div className="text-2xl font-black text-yellow-400 font-mono">
                  +{session.score * 10} XP
                </div>
              </div>
            </div>

            {/* XP progress milestones feedback alert */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-950/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={getAvatarUrl(currentUsername)} alt="avatar" className="w-10 h-10 rounded-full" />
                <div>
                  <div className="text-sm font-bold text-white font-mono">{currentUsername}</div>
                  <div className="text-xs text-gray-400 font-semibold uppercase">{getRankTitle(stats.level)} (Lvl {stats.level})</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 uppercase block font-bold">Accumulated stats</span>
                <span className="text-sm font-bold text-indigo-400 font-mono">{stats.totalCorrect} Lifetime Correct</span>
              </div>
            </div>

            {/* EXAM SIMULATOR CERTIFICATE PRINT PREVIEW CARD */}
            {session.mode === "EXAM" && (
              <div id="print_cert" className="border-4 border-dashed border-indigo-900/30 bg-slate-950 rounded-2xl p-6 relative select-none">
                <div className="absolute top-2 right-2 text-indigo-900/20 font-black text-4xl font-mono uppercase tracking-widest leading-none pointer-events-none select-none">PIT CERT</div>
                <div className="text-center space-y-4">
                  <div className="mx-auto block text-yellow-500 font-serif text-lg tracking-wider italic font-bold">Polytechnic Institute of Tabaco</div>
                  <h3 className="text-lg font-black text-white tracking-widest uppercase">2026 BSIT PROFICIENCY SIMULATION REPORT</h3>
                  <div className="border-t border-slate-900 max-w-sm mx-auto my-2"></div>
                  
                  <p className="text-xs text-gray-300 italic max-w-md mx-auto leading-relaxed">
                    This certifies that student <span className="text-white font-bold font-mono underline uppercase">{currentUsername}</span> has taken and completed the 175 multiple-choice proficiency exam simulation mock sitting on {new Date().toLocaleDateString()} with verified metrics detailed as follows:
                  </p>

                  <div className="grid grid-cols-2 max-w-md mx-auto bg-slate-900/60 p-4 border border-slate-900 rounded-xl font-mono text-center text-xs gap-3">
                    <div>
                      <div className="text-gray-500 uppercase font-black">Score Achieved</div>
                      <div className="text-lg text-yellow-400 font-bold mt-0.5">{correct} / 175 Pts</div>
                    </div>
                    <div>
                      <div className="text-gray-500 uppercase font-black">Accuracy</div>
                      <div className="text-lg text-indigo-400 font-bold mt-0.5">{accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500 uppercase font-black">Simulation Time</div>
                      <div className="text-lg text-amber-500 font-bold mt-0.5">{formatTimer(session.timeTaken)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 uppercase font-black">BSIT Level Rank</div>
                      <div className="text-lg text-purple-400 font-bold mt-0.5">Lvl {stats.level}</div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <button
                      onClick={handlePrint}
                      className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-indigo-400" />
                      <span>Print Official Scorecard PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REVIEW INCORRECT CARDS */}
        {activeTab === "review" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between gap-4 mb-2">
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Review failed question concepts from the master PDF. Practicing failed concepts is the single best way to prepare.
              </p>
              {missedQuestionsList.length > 0 && (
                <button
                  onClick={() => onPracticeMissed(missedQuestionsList)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow flex items-center gap-1 cursor-pointer flex-shrink-0 animate-pulse"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Failures ({missedQuestionsList.length})</span>
                </button>
              )}
            </div>

            {missedQuestionsList.length === 0 ? (
              <div className="text-center py-10 bg-slate-950 rounded-2xl border border-slate-900">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-2 animate-bounce" />
                <h4 className="text-sm font-bold text-white">Flawless Session!</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  You scored 100% correct answers! No failed questions to review. Outstanding academic performance.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {missedQuestionsList.map((q, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 border border-red-950 rounded-2xl">
                    <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px] font-bold">
                      <span className="text-red-400 uppercase tracking-wider">Missed Question</span>
                      <span className="text-slate-500 uppercase">{q.subject}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-relaxed mb-3">{q.question}</h4>
                    <div className="p-3 bg-indigo-950/20 border border-indigo-900/10 rounded-xl text-xs font-medium">
                      <span className="text-indigo-400 font-extrabold mr-1">Correct Answer:</span>
                      <span className="text-gray-300">{q.choices[q.correctAnswer]}</span>
                    </div>
                    <div className="p-3 mt-2 bg-slate-900/60 rounded-xl text-xs font-medium text-gray-400 leading-relaxed">
                      <span className="text-gray-300 font-extrabold block mb-1">Explanation:</span>
                      {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={() => { audio.playClick(); setMode("LOBBY"); }}
          className="px-6 py-2.5 bg-slate-950 border border-slate-900 hover:border-slate-805 text-gray-400 hover:text-white rounded-xl transition text-xs font-mono font-bold cursor-pointer"
        >
          ← Return to Lobby
        </button>

        <button
          onClick={onRestart}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl transition text-xs font-bold shadow flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
}
