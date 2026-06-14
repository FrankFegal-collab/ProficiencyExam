import { Question } from "../types";
import { SUBJECTS_LIST } from "../data/questions";
import { audio } from "../utils/audio";
import {
  BookOpen,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Boxes,
  CodeXml,
  Globe,
  Database,
  Palette,
  Cpu,
  Network
} from "lucide-react";
import { useState } from "react";

interface StudyDeckProps {
  questions: Question[];
  onExit: () => void;
}

export default function StudyDeck({ questions, onExit }: StudyDeckProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  // Toggle correct answers display per card
  const toggleReveal = (qId: number) => {
    if (revealedIds.includes(qId)) {
      setRevealedIds(prev => prev.filter(id => id !== qId));
    } else {
      audio.playClick();
      setRevealedIds(prev => [...prev, qId]);
    }
  };

  // Filter list of questions based on choices
  const filteredQuestions = questions.filter(q => {
    const matchesSubject = selectedSubject === "All" || q.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    const matchesKeyword = searchQuery.trim() === "" ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.choices.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSubject && matchesDifficulty && matchesKeyword;
  });

  return (
    <div id="study_deck_view" className="max-w-4xl mx-auto px-4 py-8">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onExit}
            className="text-xs text-gray-500 hover:text-white font-bold font-mono uppercase bg-slate-950 border border-slate-900 hover:border-slate-800 px-3 py-1.5 rounded-xl cursor-pointer mb-3"
          >
            ← Exit Study Mode
          </button>
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Academic Study Deck</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Browse, study, and search the entire 175 proficiency reviewer questions.</p>
        </div>

        {/* Dynamic counter */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2.5 text-right flex-shrink-0">
          <div className="text-[10px] text-gray-500 font-mono tracking-wider">FILTER RATIO</div>
          <div className="text-sm font-black text-indigo-300 font-mono">
            {filteredQuestions.length} <span className="text-[10px] text-gray-500 font-normal">/ {questions.length} Questions</span>
          </div>
        </div>
      </div>

      {/* FILTER SEARCH FILING BAR */}
      <div className="bg-slate-900/40 border border-blue-900/20 rounded-2xl p-4 gap-4 grid grid-cols-1 md:grid-cols-12 mb-6">
        {/* Search Query bar */}
        <div className="md:col-span-4 relative">
          <label className="block text-[10px] font-bold text-gray-500 font-mono mb-1.5 uppercase">Search Keywords</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-gray-600 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. SQL, Stacks, CSS..."
              className="w-full bg-slate-950 text-xs border border-slate-800 rounded-xl pl-9 pr-4 py-3 placeholder:text-slate-600 text-white focus:outline-none focus:border-indigo-505 font-medium"
            />
          </div>
        </div>

        {/* Subject filter */}
        <div className="md:col-span-5">
          <label className="block text-[10px] font-bold text-gray-500 font-mono mb-1.5 uppercase">Filter Subject Area</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full bg-slate-900 text-xs text-gray-300 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-505 cursor-pointer font-semibold"
          >
            <option value="All">All Subjects (7 Categories)</option>
            {SUBJECTS_LIST.map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty filter */}
        <div className="md:col-span-3">
          <label className="block text-[10px] font-bold text-gray-500 font-mono mb-1.5 uppercase">Difficulty Range</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full bg-slate-900 text-xs text-gray-300 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-505 cursor-pointer font-semibold"
          >
            <option value="All">All Levels</option>
            <option value="Easy">Easy (40%)</option>
            <option value="Medium">Medium (40%)</option>
            <option value="Hard">Hard (20%)</option>
          </select>
        </div>
      </div>

      {/* FILTER RESULTS CARDS STACK */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-slate-955 rounded-3xl border border-slate-900">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">No Review Cards Match</h4>
            <p className="text-xs text-gray-500 mt-1">Refine your active keyword search query or change filters selections.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isRevealed = revealedIds.includes(q.id);

            return (
              <div
                key={q.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-800/80 rounded-2xl p-5 transition duration-300 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 border-b border-slate-800/65 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] bg-slate-950 text-indigo-300 border border-indigo-900/20 px-2.5 py-1 rounded-full font-bold uppercase font-mono">
                      Q#{q.id} • {q.subject}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono ${
                        q.difficulty === "Easy"
                          ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/20"
                          : q.difficulty === "Medium"
                          ? "bg-amber-950/40 text-amber-400 border border-amber-900/20"
                          : "bg-rose-950/40 text-rose-400 border border-rose-900/20"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white leading-relaxed mb-4">{q.question}</h3>

                {/* Choices list with indicators */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                  {q.choices.map((choice, idx) => {
                    const isCorrect = idx === q.correctAnswer;
                    let choiceStyle = "bg-slate-950/40 border-slate-900 text-gray-400";

                    if (isRevealed && isCorrect) {
                      choiceStyle = "bg-emerald-950/30 border-emerald-500/40 text-emerald-300 font-bold";
                    }

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border text-xs leading-relaxed flex items-center gap-2 ${choiceStyle}`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold font-mono text-[10px] ${isRevealed && isCorrect ? "bg-emerald-500 text-slate-950" : "bg-slate-900 text-gray-500"}`}>
                          {["A", "B", "C", "D"][idx]}
                        </div>
                        <span className="truncate">{choice}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Show Answer Trigger Toggle */}
                <button
                  onClick={() => toggleReveal(q.id)}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-950 rounded-xl hover:bg-slate-950/80 transition text-xs font-mono font-bold cursor-pointer text-indigo-400 hover:text-indigo-300"
                >
                  <span>{isRevealed ? "Hide Target Answer Block" : "Verify Correct Answer Details"}</span>
                  {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Expanded Answer Content Block */}
                {isRevealed && (
                  <div className="mt-3 p-4 bg-slate-950 border border-emerald-900/20 rounded-xl animate-fade-in text-xs font-semibold">
                    <div className="text-emerald-400 font-black mb-1 font-mono uppercase tracking-widest text-[10px]">Academic Answer Core</div>
                    <p className="text-gray-300 font-bold leading-normal mb-2.5">
                      {q.choices[q.correctAnswer]}
                    </p>
                    <div className="border-t border-slate-900 my-2 pt-2">
                      <span className="text-[10px] text-gray-500 uppercase font-mono block mb-1">Official Reference Clarification</span>
                      <p className="text-gray-400 leading-relaxed font-normal">{q.explanation}</p>
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
