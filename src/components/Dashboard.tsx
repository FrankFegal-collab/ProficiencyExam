import { UserStats, LeaderboardEntry } from "../types";
import { SUBJECTS_LIST } from "../data/questions";
import { ACHIEVEMENTS } from "../data/achievements";
import {
  generateWeaknessAnalysis,
  getXPNeededForLevel,
  getAvatarUrl,
  getRankTitle,
  getLeaderboard
} from "../utils/gameUtils";
import { audio } from "../utils/audio";
import {
  Trophy,
  Flame,
  Zap,
  Swords,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  BarChart2,
  Lock,
  Compass,
  ArrowRight,
  Activity,
  Award,
  Crown,
  Trash2,
  Sliders,
  Database,
  Cpu,
  Network,
  Palette,
  Boxes,
  CodeXml,
  Globe,
  Settings
} from "lucide-react";

interface DashboardProps {
  stats: UserStats;
  currentUsername: string;
  onSelectSubject: (subjectId: string) => void;
  onStartQuickReview: () => void;
  onStartSurvival: () => void;
  onStartExam: () => void;
  onStartDaily: () => void;
  setMode: (mode: any) => void;
  onOpenStudyDeck: () => void;
  onlineLeaderboard: LeaderboardEntry[];
  user: any;
  onSignIn: () => void;
}

export default function Dashboard({
  stats,
  currentUsername,
  onSelectSubject,
  onStartQuickReview,
  onStartSurvival,
  onStartExam,
  onStartDaily,
  setMode,
  onOpenStudyDeck,
  onlineLeaderboard,
  user,
  onSignIn
}: DashboardProps) {
  const diagnostics = generateWeaknessAnalysis(stats);

  const totalPossibleQuestions = 175;
  const answeredPercent = Math.round((stats.totalAnswered / totalPossibleQuestions) * 100) || 0;
  const overallAccuracy = stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;

  // Render proper icon for subjects list
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case "Boxes": return <Boxes className="w-5 h-5 text-blue-400" />;
      case "CodeXml": return <CodeXml className="w-5 h-5 text-purple-400" />;
      case "Globe": return <Globe className="w-5 h-5 text-emerald-400" />;
      case "Database": return <Database className="w-5 h-5 text-amber-400" />;
      case "Palette": return <Palette className="w-5 h-5 text-rose-400" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-cyan-400" />;
      case "Network": return <Network className="w-5 h-5 text-violet-400" />;
      default: return <BookOpen className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleSelectSub = (sub: string) => {
    audio.playClick();
    onSelectSubject(sub);
  };

  return (
    <div id="game_lobby" className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 max-w-7xl mx-auto">
      {/* LEFT COLUMN: Main Game Modes & Core Study Tracks (8 Cols) */}
      <div className="lg:col-span-8 flex flex-col gap-6">

        {/* SECTION 1: Gamified Core Modes Carousel */}
        <div className="bg-slate-900/40 border border-blue-900/20 rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Compass className="w-6 h-6 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
              <h2 className="text-xl font-bold tracking-tight text-white">Select Game Mode</h2>
            </div>
            <div className="text-xs text-indigo-300 font-semibold uppercase font-mono">2026 BSIT Proficiency</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Practice Mode Card */}
            <div
              onClick={onStartQuickReview}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-5 hover:border-blue-700/60 hover:-translate-y-1 transition-all duration-300 shadow hover:shadow-blue-500/5"
            >
              <div className="absolute top-0 left-0 h-full w-1 px-1 bg-blue-500/20 group-hover:bg-blue-500 transition-colors"></div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Sparkles className="w-6 h-6 text-blue-400 group-hover:scale-110 transition" />
                </div>
                <span className="text-[10px] bg-blue-950 text-blue-400 px-2.5 py-1 rounded-full font-bold uppercase font-mono">10 Questions</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition mb-1">Quick Practice</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Take a rapid 10-question mixed diagnostic. Excellent for memory retention.
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-blue-400 font-semibold group-hover:underline justify-end">
                <span>Start Practice</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Survival Mode Card */}
            <div
              onClick={onStartSurvival}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-5 hover:border-red-700/60 hover:-translate-y-1 transition-all duration-300 shadow hover:shadow-red-500/5"
            >
              <div className="absolute top-0 left-0 h-full w-1 px-1 bg-red-500/20 group-hover:bg-red-500 transition-colors"></div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-red-500/10 rounded-xl">
                  <Swords className="w-6 h-6 text-red-500 group-hover:scale-110 transition" />
                </div>
                <div className="flex items-center gap-1 text-[10px] bg-red-950 text-red-400 px-2.5 py-1 rounded-full font-bold uppercase font-mono">
                  <span>Endless</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-red-400 transition mb-1">Survival Mode</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Start with 3 Hearts. Wrong answers cost lives. Build your longest streak!
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-red-400 font-semibold group-hover:underline justify-end">
                <span>Enter Arena</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Daily Challenge Card */}
            <div
              onClick={onStartDaily}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-5 hover:border-amber-700/60 hover:-translate-y-1 transition-all duration-300 shadow hover:shadow-amber-500/5"
            >
              <div className="absolute top-0 left-0 h-full w-1 px-1 bg-amber-500/20 group-hover:bg-amber-500 transition-colors"></div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-amber-500/10 rounded-xl animate-pulse">
                  <Calendar className="w-6 h-6 text-amber-500 group-hover:scale-110 transition" />
                </div>
                <span className="text-[10px] bg-amber-950 text-amber-400 px-2.5 py-1 rounded-full font-bold uppercase font-mono">+50 XP Bonus</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition mb-1">Daily Quest</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                10 randomized challenge questions. Resets every midnight with a fresh set of review questions.
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-amber-500 font-semibold group-hover:underline justify-end">
                <span>Play Daily</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Exam Simulator Card */}
            <div
              onClick={onStartExam}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-5 hover:border-purple-700/60 hover:-translate-y-1 transition-all duration-300 shadow hover:shadow-purple-500/5"
            >
              <div className="absolute top-0 left-0 h-full w-1 px-1 bg-purple-500/20 group-hover:bg-purple-500 transition-colors"></div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Layers className="w-6 h-6 text-purple-400 group-hover:scale-110 transition" />
                </div>
                <span className="text-[10px] bg-purple-950 text-purple-400 px-2.5 py-1 rounded-full font-bold uppercase font-mono">175 Questions</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition mb-1">Exam Simulator</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Replicate the official exam. No pause, 175 questions in one sitting, final printable board rankings.
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-purple-400 font-semibold group-hover:underline justify-end">
                <span>Launch Mock</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Dynamic Subject Tracks Grid (Subject Mode) */}
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Subject Tracks Review (25 Questions/Each)</h2>
            </div>
            <button
              onClick={onOpenStudyDeck}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline"
            >
              Study Question Deck ({totalPossibleQuestions}) →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBJECTS_LIST.map((sub) => {
              const prog = stats.subjectProgress[sub.name] || { answered: 0, correct: 0, highScore: 0 };
              const percent = Math.round((prog.answered / 25) * 100) || 0;

              return (
                <div
                  key={sub.id}
                  onClick={() => handleSelectSub(sub.name)}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 cursor-pointer transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl group-hover:bg-indigo-950/40 group-hover:border-indigo-900/30 transition duration-300">
                        {getSubjectIcon(sub.icon)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-snug group-hover:text-indigo-300 transition">
                          {sub.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 font-mono">25 Core Reviewed Questions</p>
                      </div>
                    </div>
                    {prog.highScore === 25 ? (
                      <span className="text-xs bg-yellow-950 text-yellow-300 px-2 py-0.5 rounded-full font-bold border border-yellow-800/40">
                        ★ PERFECT
                      </span>
                    ) : prog.highScore > 0 ? (
                      <span className="text-[10px] text-indigo-400/80 font-semibold font-mono">
                        HS: {prog.highScore}/25
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-[10px] font-semibold text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{percent}% ({prog.answered}/25)</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: Diagnostic Weakness Analysis */}
        <div id="diagnostic_board" className="bg-gradient-to-br from-indigo-950/20 via-slate-900/40 to-slate-950 border border-blue-900/30 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Activity className="w-32 h-32 text-indigo-400" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Academic Diagnostic (Weakness Analysis)</h2>
              <p className="text-xs text-gray-400">Targeted preparation recommendations based on evaluation history</p>
            </div>
          </div>

          <div className="bg-slate-950/60 rounded-2xl border border-slate-900 p-4 mb-4">
            <div className="text-xs font-semibold text-gray-400 uppercase font-mono mb-1.5 tracking-wider">Identified Struggle Profile</div>
            <div className="text-lg font-bold text-white mb-2 bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              {diagnostics.lowSubject}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {diagnostics.text}
            </p>
          </div>

          <div className="p-4 bg-indigo-950/20 border border-indigo-900/20 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-indigo-300">Mastery Recommendation</div>
              <p className="text-xs text-gray-300 leading-relaxed mt-1">
                {diagnostics.recommendation}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Leaderboards & Gamified Achievements (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">

        {/* PROFILE SUMMARY WIDGET */}
        <div id="student_badge" className="bg-slate-900/40 border border-blue-900/10 rounded-3xl p-5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500"></div>
          <img
            src={getAvatarUrl(currentUsername)}
            alt="User Avatar"
            className="w-20 h-20 rounded-2xl mx-auto mb-3 shadow-md border border-slate-700 bg-slate-950"
          />
          <h2 className="text-lg font-bold text-white flex items-center justify-center gap-1">
            <span>{currentUsername}</span>
            {stats.level >= 30 && <Crown className="w-4 h-4 text-amber-400" />}
          </h2>
          <p className="text-xs text-indigo-400 font-bold uppercase font-mono tracking-wider mb-2">
            {getRankTitle(stats.level)}
          </p>

          <div className="grid grid-cols-3 gap-2 mt-4 bg-slate-950/70 p-3 rounded-2xl border border-slate-900">
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Correct</div>
              <div className="text-sm font-bold text-emerald-400">{stats.totalCorrect}</div>
            </div>
            <div className="border-x border-slate-800">
              <div className="text-xs text-gray-400 mb-0.5">Accuracy</div>
              <div className="text-sm font-bold text-indigo-400 font-mono">{overallAccuracy}%</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-0.5">Streak</div>
              <div className="text-sm font-bold text-orange-400">{stats.streak}d</div>
            </div>
          </div>
        </div>

        {/* WEEKLY ACTIVITY GRAPHICS (GitHub Grid Style) */}
        <div id="weekly_activity_board" className="bg-slate-900/40 border border-blue-900/20 rounded-3xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Weekly Tracker</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Your daily study streak matrix over the past weeks:
          </p>

          <div className="flex items-center justify-between gap-1 p-2 bg-slate-950 rounded-2xl border border-slate-900">
            {Array.from({ length: 7 }).map((_, i) => {
              const levels = ["bg-slate-900", "bg-indigo-900/40", "bg-indigo-800/60", "bg-indigo-600", "bg-emerald-500"];
              // deterministic style relative to user correct answers
              const scoreLevel = isNaN(overallAccuracy) ? 0 : Math.min(4, Math.floor((stats.totalCorrect + i) / 5));
              const currentStyle = levels[scoreLevel] || "bg-slate-900";

              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-lg ${currentStyle} mb-1.5 border border-white/5 transition duration-300`} />
                  <span className="text-[10px] text-gray-500 font-mono">Day {i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* GAMIFIED LEADERBOARD MODULE */}
        <div id="leaderboard_card" className="bg-slate-900/40 border border-blue-900/20 rounded-3xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500 animate-pulse" />
                <span className="text-sm font-extrabold text-white uppercase tracking-wider">Classmates Board</span>
              </div>
              <span className="text-[9px] font-mono text-amber-500 font-extrabold bg-amber-950/20 border border-amber-900/30 px-2.5 py-0.5 rounded-full uppercase">BSIT LEADERBOARD</span>
            </div>

            {/* Scoreboard listing */}
            <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
              {getLeaderboard(stats, "global", currentUsername).map((e, index) => {
                const rank = index + 1;
                const isUser = e.username === currentUsername;
                let rankStyle = "bg-slate-950 text-gray-400";
                if (rank === 1) rankStyle = "bg-amber-500/20 text-yellow-300 border border-amber-500/30";
                if (rank === 2) rankStyle = "bg-slate-300/20 text-slate-300 border border-slate-300/20";
                if (rank === 3) rankStyle = "bg-amber-900/20 text-amber-500 border border-amber-900/20";

                return (
                  <div
                    key={rank + "_" + e.username}
                    className={`flex items-center justify-between p-2.5 rounded-xl transition ${isUser ? "bg-indigo-600/25 border border-indigo-500/40 shadow shadow-indigo-500/5 font-bold" : "bg-slate-950/40 border border-slate-950"}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-6 h-6 rounded-lg ${rankStyle} flex items-center justify-center font-extrabold text-xs flex-shrink-0`}>
                        {rank}
                      </div>
                      <img src={e.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-800 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isUser ? "text-indigo-200 animate-pulse" : "text-gray-300"}`}>
                          {e.username} {isUser && "👈"}
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono">
                          Lvl {e.level} • {getRankTitle(e.level).split(" ")[0]}
                        </div>
                      </div>
                    </div>

                    <div className="text-right text-xs font-black font-mono text-indigo-400">
                      <span>{e.xp || 0} XP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* LOCKED/UNLOCKED ACHIEVEMENTS DISPLAY */}
        <div id="achievements_card" className="bg-slate-900/40 border border-blue-900/20 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Achievements</h3>
            </div>
            <span className="text-xs font-mono text-gray-500 font-bold">
              {stats.unlockedBadges.length} / {ACHIEVEMENTS.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
            {ACHIEVEMENTS.map((ach) => {
              const isUnlocked = stats.unlockedBadges.includes(ach.id);

              return (
                <div
                  key={ach.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition ${isUnlocked ? "bg-slate-950/80 border-indigo-500/20" : "bg-slate-950/25 border-slate-900 opacity-60"}`}
                >
                  <div className={`p-2.5 rounded-xl ${isUnlocked ? "bg-indigo-500/10 text-indigo-400" : "bg-slate-900 text-gray-600"}`}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight flex items-center gap-1.5">
                      <span>{ach.title}</span>
                      {isUnlocked && <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded-full font-bold">UNLOCKED</span>}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-snug">
                      {ach.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>



      </div>
    </div>
  );
}
