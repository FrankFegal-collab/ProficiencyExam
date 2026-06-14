import { Achievement } from "../types";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_victory",
    title: "First Victory",
    description: "Complete any quiz session with an accuracy of at least 5%!",
    icon: "Trophy",
    requirementType: "total_correct",
    requirementValue: 1
  },
  {
    id: "streak_10",
    title: "Unstoppable Coder",
    description: "Get a streak of 10 correct answers in a single play session!",
    icon: "Flame",
    requirementType: "streak",
    requirementValue: 10
  },
  {
    id: "level_10",
    title: "Code Apprentice",
    description: "Reach level 10 and unlock your first professional rank!",
    icon: "ShieldAlert",
    requirementType: "level",
    requirementValue: 10
  },
  {
    id: "level_30",
    title: "Database Strategist",
    description: "Reach level 30 and demonstrate core relational mastery!",
    icon: "Coins",
    requirementType: "level",
    requirementValue: 30
  },
  {
    id: "level_50",
    title: "BSIT Grandmaster",
    description: "Reach the ultimate Level 50 milestone and sit on the master board!",
    icon: "Crown",
    requirementType: "level",
    requirementValue: 50
  },
  {
    id: "dsa_master",
    title: "DSA Sentinel",
    description: "Achieve a perfect score (25/25) in any single Subject Mode session!",
    icon: "Sparkles",
    requirementType: "subject_mastery",
    requirementValue: 25
  },
  {
    id: "completed_exam",
    title: "Exam Conqueror",
    description: "Conquer the daunting Exam Simulation Mode (175 Questions) in a sitting!",
    icon: "BookOpenCheck",
    requirementType: "exam",
    requirementValue: 1
  },
  {
    id: "daily_champion",
    title: "Daily Committed",
    description: "Complete a Daily Challenge session and earn the daily bonus!",
    icon: "CalendarCheck",
    requirementType: "daily",
    requirementValue: 1
  },
  {
    id: "hundred_club",
    title: "Centurion Scholar",
    description: "Answer a lifetime total of 100 correct answers across all modes!",
    icon: "Zap",
    requirementType: "total_correct",
    requirementValue: 100
  }
];
