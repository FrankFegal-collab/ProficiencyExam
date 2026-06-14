import { UserStats } from "../types";
import { getRankTitle, getXPNeededForLevel, getAvatarUrl, PREDEFINED_AVATARS } from "../utils/gameUtils";
import { audio } from "../utils/audio";
import { Trophy, Volume2, VolumeX, RefreshCw, User as UserIcon, Flame, Award, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  stats: UserStats;
  currentUsername: string;
  onUsernameChange: (name: string, avatarId?: string) => void;
  onResetStats: () => void;
  setMode: (mode: any) => void;
  user: any;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function Header({
  stats,
  currentUsername,
  onUsernameChange,
  onResetStats,
  setMode,
  user,
  onSignIn,
  onSignOut
}: HeaderProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempUsername, setTempUsername] = useState(currentUsername);
  const [selectedAvatarId, setSelectedAvatarId] = useState(stats.avatarId || "pixel_dev");
  const [isMuted, setIsMuted] = useState(audio.getMuted());

  // Synchronize dynamic input name when parent changes or modal opens
  useEffect(() => {
    setTempUsername(currentUsername);
    setSelectedAvatarId(stats.avatarId || "pixel_dev");
  }, [currentUsername, stats.avatarId, isEditingProfile]);

  const xpNeeded = getXPNeededForLevel(stats.level);
  const xpPercent = Math.min(100, Math.round((stats.xp / xpNeeded) * 100));

  const toggleMute = () => {
    const nextMuted = !isMuted;
    audio.setMute(nextMuted);
    setIsMuted(nextMuted);
  };

  const handleSaveProfile = () => {
    if (tempUsername.trim().length >= 3) {
      onUsernameChange(tempUsername.trim(), selectedAvatarId);
      setIsEditingProfile(false);
      audio.playCorrect();
    }
  };

  return (
    <header id="app_header" className="border-b border-blue-900/40 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Branding & Tagline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMode("LOBBY")}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
              <Trophy className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
                BSIT Proficiency Quest
              </h1>
              <p className="text-xs text-gray-400 font-medium">"Study. Compete. Dominate the Board."</p>
            </div>
          </div>

          {/* Quick Actions Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-gray-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsEditingProfile(true)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-gray-400"
            >
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Live EXP & Level Bar */}
        <div id="experience_hud" className="flex-1 max-w-md bg-slate-900/60 border border-blue-950/60 rounded-xl px-4 py-2 flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-bold text-slate-950 shadow-md shadow-amber-500/20">
              Lvl {stats.level}
            </div>
            {stats.level >= 50 && (
              <span className="absolute -top-1 -right-1 text-xs animate-bounce bg-yellow-400 text-slate-950 rounded-full h-4 w-4 flex items-center justify-center font-extrabold shadow">
                ★
              </span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-indigo-300 font-semibold tracking-wider uppercase font-mono">{getRankTitle(stats.level)}</span>
              <span className="text-gray-400 font-medium font-mono">
                {stats.xp} / {xpNeeded} XP
              </span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden ring-1 ring-white/5">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 h-2.5 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(79,70,229,0.4)]"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right: Actions, Badges & Streaks */}
        <div className="hidden md:flex items-center gap-3">
          {/* Daily Streak Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-950/40 border border-orange-900/30 text-orange-400 text-xs font-semibold shadow">
            <Flame className="w-4 h-4 fill-orange-500 stroke-orange-500 animate-bounce" />
            <span>{stats.streak} Day Streak</span>
          </div>

          {/* Sound Effect toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-gray-300 hover:text-white transition cursor-pointer"
            title={isMuted ? "Unmute Sound FX" : "Mute Sound FX"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Open profile modal button */}
          <button
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-indigo-950/40 hover:border-indigo-800/40 border border-slate-800 text-gray-300 hover:text-white transition cursor-pointer"
          >
            <img src={getAvatarUrl(currentUsername, stats.avatarId)} alt={currentUsername} className="w-6 h-6 rounded-full" />
            <span className="text-sm font-medium">{currentUsername}</span>
          </button>

          {/* Reset profile state */}
          <button
            onClick={onResetStats}
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/40 text-gray-400 hover:text-rose-400 transition cursor-pointer"
            title="Reset Game Progress"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* User Edit Profile Modal Overlay */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-blue-900/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-indigo-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/20 rounded-xl">
                <UserIcon className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-lg font-bold text-white">Student Profile</h2>
            </div>

            {/* Dynamic Pixel Avatar */}
            <div className="flex justify-center mb-5">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center w-full max-w-[200px]">
                <img src={getAvatarUrl(tempUsername, selectedAvatarId)} alt="Avatar" className="w-16 h-16 mx-auto rounded-xl mb-2" />
                <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider font-semibold text-slate-400">Selected Avatar Preview</span>
              </div>
            </div>

            {/* Avatar Selection Grid */}
            <div className="mb-5">
              <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase font-mono tracking-wider">Select Predefined Avatar</label>
              <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800 scrollbar-thin">
                {PREDEFINED_AVATARS.map((avatar) => {
                  const isSelected = selectedAvatarId === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => {
                        setSelectedAvatarId(avatar.id);
                        audio.playClick();
                      }}
                      title={avatar.name}
                      className={`relative p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${
                        isSelected
                          ? "bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
                      }`}
                    >
                      <img src={avatar.url} alt={avatar.name} className="w-8 h-8 mx-auto rounded-md" />
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 text-[8px] bg-indigo-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student Nickname input */}
            <div className="mb-6">
              <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase font-mono tracking-wider">Student Identifier</label>
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
                placeholder="Student ID"
                maxLength={18}
                className="w-full text-center bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono transition text-sm font-bold animate-pulse-subtle"
              />
              <span className="text-[9px] text-gray-500 mt-1.5 block leading-normal">Letters, numbers, underscores. Min 3 characters.</span>
            </div>

            <div className="flex gap-2.5 justify-end">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-slate-800 transition text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={tempUsername.trim().length < 3}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition text-xs font-bold shadow disabled:opacity-50 cursor-pointer"
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
