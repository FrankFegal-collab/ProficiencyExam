import { Question, UserStats } from "../types";
import { audio } from "../utils/audio";
import {
  Settings,
  Search,
  Save,
  RotateCcw,
  BookOpen,
  FileSpreadsheet,
  Trash2,
  CheckCircle,
  HelpCircle,
  TrendingDown,
  ShieldAlert,
  Lock,
  Key
} from "lucide-react";
import React, { useState } from "react";

interface AdminPanelProps {
  questions: Question[];
  stats: UserStats;
  currentUsername: string;
  onUpdateQuestion: (updated: Question) => void;
  onResetQuestions: () => void;
  onResetProgressAll: () => void;
  onExit: () => void;
}

export default function AdminPanel({
  questions,
  stats,
  currentUsername,
  onUpdateQuestion,
  onResetQuestions,
  onResetProgressAll,
  onExit
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [showError, setShowError] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Buffer states for editing a question
  const [editedQuestionText, setEditedQuestionText] = useState("");
  const [editedChoices, setEditedChoices] = useState<string[]>([]);
  const [editedCorrectIndex, setEditedCorrectIndex] = useState(0);
  const [editedExplanation, setEditedExplanation] = useState("");

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEditClick = (q: Question) => {
    audio.playClick();
    setEditingId(q.id);
    setEditedQuestionText(q.question);
    setEditedChoices([...q.choices]);
    setEditedCorrectIndex(q.correctAnswer);
    setEditedExplanation(q.explanation);
  };

  const handleSaveQuestion = (qId: number, subject: string, difficulty: string) => {
    if (editedQuestionText.trim() === "" || editedChoices.some(c => c.trim() === "")) {
      alert("Please ensure all fields are filled.");
      return;
    }

    const modified: Question = {
      id: qId,
      subject,
      difficulty: difficulty as any,
      question: editedQuestionText.trim(),
      choices: editedChoices.map(c => c.trim()),
      correctAnswer: editedCorrectIndex,
      explanation: editedExplanation.trim()
    };

    onUpdateQuestion(modified);
    setEditingId(null);
    audio.playCorrect();
    showNotification("Question details updated successfully in localStorage database.");
  };

  const handleExportCSV = () => {
    audio.playClick();
    // Synthesize realistic classmate CSV records of mock test takes
    const rows = [
      ["Rank", "Student Nickname", "BSIT Level", "Lifetime XP", "Survival Score", "Evaluation Date"],
      ["1", "BinaryBoss_PIT", "44", "14200", "48", new Date().toLocaleDateString()],
      ["2", "Grace_Ada_Albay", "38", "11100", "25", new Date().toLocaleDateString()],
      ["3", "PhpTabacoExpert", "32", "9500", "30", new Date().toLocaleDateString()],
      ["4", "QueryQueen_Panal", "27", "7800", "18", new Date().toLocaleDateString()],
      ["5", currentUsername, stats.level, stats.xp + (stats.level * 300), stats.survivalHighScore, new Date().toLocaleDateString()]
    ];

    const csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PIT_BSIT_Session_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("Database analysis report saved to 'PIT_BSIT_Session_Export.csv'.");
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcode.trim();
    if (cleanPass === "admin2026" || cleanPass === "PIT_BSIT_2026") {
      audio.playCorrect();
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      audio.playWrong();
      setShowError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div id="admin_auth_gate" className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-indigo-600 to-amber-500"></div>
          
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-indigo-500/15 rounded-full text-indigo-400 mb-4 border border-indigo-500/20">
              <Lock className="w-8 h-8 animate-pulse text-indigo-400" />
            </div>

            <h1 className="text-xl font-bold text-white tracking-wide">PIT BSIT ADMINISTRATIVE SYSTEM</h1>
            <p className="text-[10px] text-indigo-400 font-bold uppercase font-mono tracking-widest mt-1">
              Institutional Control Gateway
            </p>

            <div className="my-5 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left">
              <div className="flex gap-2.5 items-start">
                <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-amber-400">Institutional Authorization Required</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed mt-1">
                    This subsystem is strictly reserved for Polytechnic Institute of Tabaco faculty, directors, and authors to formulate exams and manage reviewer questions. Access is audited under standard institutional protocols.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handlePasscodeSubmit} className="w-full space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-500 font-mono mb-2 uppercase text-left tracking-wider">
                  Enter Sys Admin Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (showError) setShowError(false);
                    }}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 text-center tracking-wider text-sm border border-slate-800 rounded-2xl py-3 px-4 text-white placeholder-slate-800 focus:outline-none focus:border-indigo-500 font-mono"
                    autoFocus
                  />
                  <div className="absolute left-4 top-3.5 text-gray-750">
                    <Key className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
                {showError && (
                  <p className="text-red-500 text-[10px] font-bold text-center mt-2 animate-bounce">
                    ✕ INVALID ADMINISTRATOR ACCESS CREDENTIALS
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition shadow-lg shadow-indigo-600/10 cursor-pointer text-center"
                >
                  Authorize System Connection
                </button>

                <button
                  type="button"
                  onClick={onExit}
                  className="w-full py-3 rounded-2xl bg-transparent hover:bg-slate-950/40 text-gray-550 hover:text-white font-bold text-xs transition cursor-pointer text-center"
                >
                  ← Return to Student Lobby
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-[9px] text-slate-700 font-mono">
              SYSTEM CONSOLE v22.1.4 • TABACO, ALBAY
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="admin_portal_layout" className="max-w-4xl mx-auto px-4 py-8 select-none">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onExit}
            className="text-xs text-gray-500 hover:text-white font-bold font-mono uppercase bg-slate-950 border border-slate-900 hover:border-slate-800 px-3 py-1.5 rounded-xl cursor-pointer mb-3"
          >
            ← Exit Admin Panel
          </button>
          <div className="flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Reviewer Admin Terminal</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Regulate questions, reload database schemas, and export proficiency logs.</p>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-950 border border-emerald-500/30 p-3 rounded-xl text-emerald-300 text-xs font-semibold mb-6 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-pulse" />
          <span>{notification}</span>
        </div>
      )}

      {/* CORE ADMIN CONTROLS ROW */}
      <div className="bg-slate-900/40 border border-blue-900/20 rounded-2xl p-5 mb-8">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">System Actions & Maintenance</h2>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          Reset local changes or wipe player progress state profiles completely to restart the board records:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => {
              if (confirm("Reset all changed questions back to default master values? This will undo custom edits.")) {
                onResetQuestions();
                audio.playWrong();
                showNotification("All edited questions reverted back to the master reviewer definitions.");
              }
            }}
            className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-950/80 border border-slate-900 rounded-xl transition text-left cursor-pointer group"
          >
            <div>
              <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition">Reload Default Questions</div>
              <div className="text-[10px] text-gray-500 mt-0.5 font-medium">Reverts any edited questions to default state.</div>
            </div>
            <RotateCcw className="w-5 h-5 text-gray-600 group-hover:rotate-180 transition duration-300" />
          </button>

          <button
            onClick={() => {
              if (confirm("Permanently delete player scores, levels, experiences, and achievements? This is irreversible.")) {
                onResetProgressAll();
                audio.playWrong();
                showNotification("Player progress files completely purged.");
              }
            }}
            className="flex items-center justify-between p-4 bg-slate-950 hover:bg-rose-950/10 border border-slate-900 hover:border-rose-900/30 rounded-xl transition text-left cursor-pointer group"
          >
            <div>
              <div className="text-xs font-bold text-white group-hover:text-rose-400 transition">Purge Player Statistics</div>
              <div className="text-[10px] text-gray-500 mt-0.5 font-medium">Wipes XP, level indicators, streak fire, medals.</div>
            </div>
            <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-rose-500 transition" />
          </button>
        </div>
      </div>

      {/* SEARCH FIELD */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-400 uppercase font-mono mb-1.5">Live Schema Query Filter</label>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter questions by keywords..."
            className="w-full bg-slate-950 text-xs border border-slate-800 rounded-xl py-3 pl-9 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* SEARCH RESULTS QUESTIONS LIST */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-10 bg-slate-955 rounded-xl text-gray-400 text-xs">
            No questions match active query.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isEditing = editingId === q.id;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition duration-300 ${isEditing ? "bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/20" : "bg-slate-950/60 border-slate-900 hover:border-slate-800"}`}
              >
                {!isEditing ? (
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[10px] bg-slate-900 text-gray-400 px-2 py-0.5 rounded font-mono font-bold">
                        Q#{q.id} • {q.subject}
                      </span>
                      <button
                        onClick={() => handleEditClick(q)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-bold font-mono underline cursor-pointer"
                      >
                        Edit Details
                      </button>
                    </div>
                    <h3 className="text-xs font-bold text-white leading-relaxed">{q.question}</h3>
                    <p className="text-[10px] text-gray-500 mt-2 italic">
                      Correct Choice Index: {["A", "B", "C", "D"][q.correctAnswer]} ({q.choices[q.correctAnswer]})
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-[10px] bg-indigo-950 text-indigo-300 px-3 py-1 rounded-full font-bold font-mono inline-block mb-1">
                      CURRENTLY MODIFYING QUESTION #{q.id}
                    </div>

                    {/* Question Input */}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 font-mono mb-1.5 uppercase">Question Statement Text</label>
                      <textarea
                        value={editedQuestionText}
                        onChange={(e) => setEditedQuestionText(e.target.value)}
                        rows={2}
                        className="w-full bg-slate-950 text-xs border border-slate-800 rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>

                    {/* Choices Options Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {editedChoices.map((choice, index) => (
                        <div key={index}>
                          <label className="block text-[10px] font-bold text-gray-500 font-mono mb-1 uppercase">Choice Option {["A", "B", "C", "D"][index]}</label>
                          <input
                            type="text"
                            value={choice}
                            onChange={(e) => {
                              const updated = [...editedChoices];
                              updated[index] = e.target.value;
                              setEditedChoices(updated);
                            }}
                            className="w-full bg-slate-950 text-xs border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Correct Index Select */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 font-mono mb-1.5 uppercase">Correct Option Index</label>
                        <select
                          value={editedCorrectIndex}
                          onChange={(e) => setEditedCorrectIndex(parseInt(e.target.value))}
                          className="w-full bg-slate-950 text-xs text-slate-300 border border-slate-800 rounded-xl p-2.5 focus:outline-none cursor-pointer"
                        >
                          <option value={0}>Option A</option>
                          <option value={1}>Option B</option>
                          <option value={2}>Option C</option>
                          <option value={3}>Option D</option>
                        </select>
                      </div>

                      {/* Explanation Area */}
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 font-mono mb-1.5 uppercase">Academic Clarification Explanation</label>
                        <input
                          type="text"
                          value={editedExplanation}
                          onChange={(e) => setEditedExplanation(e.target.value)}
                          className="w-full bg-slate-950 text-xs border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Actions button group */}
                    <div className="flex gap-2 justify-end pt-2 border-t border-slate-800">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-slate-800 transition text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveQuestion(q.id, q.subject, q.difficulty)}
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
