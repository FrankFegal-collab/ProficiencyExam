export interface Question {
  id: number;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  choices: string[];
  correctAnswer: number; // index 0-3
  explanation: string;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalAnswered: number;
  totalCorrect: number;
  totalWrong: number;
  subjectProgress: {
    [subject: string]: {
      answered: number;
      correct: number;
      highScore: number;
    }
  };
  unlockedBadges: string[];
  dailyChallengeDoneDate?: string; // YYYY-MM-DD
  survivalHighScore: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirementType: "total_correct" | "streak" | "subject_mastery" | "exam" | "daily" | "level";
  requirementValue: number;
  subject?: string;
}

export interface LeaderboardEntry {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  score?: number;
  isCurrentUser?: boolean;
}

export type GameMode = "LOBBY" | "SUBJECT" | "QUICK" | "SURVIVAL" | "EXAM" | "DAILY" | "REVIEW_STUDY" | "ADMIN" | "RESULTS";

export interface GameSession {
  mode: GameMode;
  subjectId?: string;
  questions: Question[];
  currentIndex: number;
  selectedAnswers: { [qId: number]: number };
  timeTaken: number; // in seconds
  score: number;
  lives?: number; // for survival
  streak: number; // for survival/combos
  maxStreak: number;
  incorrectQuestions: number[]; // question IDs which were answered incorrectly
}
