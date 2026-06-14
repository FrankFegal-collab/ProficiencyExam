import { UserStats, LeaderboardEntry, Question } from "../types";
import { ACHIEVEMENTS } from "../data/achievements";
import { audio } from "./audio";

// Calculate XP thresholds progressively
// Level 1 needs 200 XP, Level 2 needs 400 XP, etc.
export function getXPNeededForLevel(level: number): number {
  return level * 300;
}

export function getRankTitle(level: number): string {
  if (level < 10) return "Freshman Explorer";
  if (level < 20) return "Code Apprentice";
  if (level < 30) return "Algorithm Warrior";
  if (level < 40) return "Database Strategist";
  if (level < 50) return "Network Architect";
  return "BSIT Grandmaster";
}

export function getInitialStats(): UserStats {
  const local = localStorage.getItem("pit_bsit_user_stats");
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error("Failed parsing stats, fallback to default", e);
    }
  }

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

  localStorage.setItem("pit_bsit_user_stats", JSON.stringify(defaultStats));
  return defaultStats;
}

export function saveUserStats(stats: UserStats) {
  localStorage.setItem("pit_bsit_user_stats", JSON.stringify(stats));
}

// Add XP points, returns updated stats block with potential level indicators
export function addXP(stats: UserStats, points: number): { stats: UserStats; leveledUp: boolean } {
  let newXP = stats.xp + points;
  let currentLevel = stats.level;
  let leveledUp = false;

  while (newXP >= getXPNeededForLevel(currentLevel) && currentLevel < 50) {
    newXP -= getXPNeededForLevel(currentLevel);
    currentLevel += 1;
    leveledUp = true;
  }

  if (leveledUp) {
    audio.playLevelUp();
  }

  const updated: UserStats = {
    ...stats,
    xp: newXP,
    level: currentLevel
  };

  saveUserStats(updated);
  return { stats: updated, leveledUp };
}

// Check and trigger new achievements
export function checkAchievements(stats: UserStats, scoreCombo: number, lastSubjectName?: string, isExam?: boolean, isDaily?: boolean): { stats: UserStats; newlyUnlocked: string[] } {
  const newlyUnlocked: string[] = [];
  const currentUnlocked = [...stats.unlockedBadges];

  ACHIEVEMENTS.forEach((ach) => {
    if (currentUnlocked.includes(ach.id)) return; // already unlocked

    let meets = false;
    if (ach.requirementType === "total_correct" && stats.totalCorrect >= ach.requirementValue) {
      meets = true;
    } else if (ach.requirementType === "level" && stats.level >= ach.requirementValue) {
      meets = true;
    } else if (ach.requirementType === "streak" && scoreCombo >= ach.requirementValue) {
      meets = true;
    } else if (ach.requirementType === "exam" && isExam && stats.totalCorrect > 0) {
      meets = true;
    } else if (ach.requirementType === "daily" && isDaily && stats.totalCorrect > 0) {
      meets = true;
    } else if (ach.requirementType === "subject_mastery" && lastSubjectName && stats.subjectProgress[lastSubjectName]?.highScore >= ach.requirementValue) {
      meets = true;
    }

    if (meets) {
      currentUnlocked.push(ach.id);
      newlyUnlocked.push(ach.title);
    }
  });

  if (newlyUnlocked.length > 0) {
    audio.playAchievement();
  }

  const updated: UserStats = {
    ...stats,
    unlockedBadges: currentUnlocked
  };

  saveUserStats(updated);
  return { stats: updated, newlyUnlocked };
}

export function getAvatarUrl(username: string): string {
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(username)}`;
}

// Generate alive competitive leaderboard lists populated with friendly classmates
export function getLeaderboard(userStats: UserStats, type: "global" | "subject" | "daily" | "survival", currentUsername: string = "ninofegal101"): LeaderboardEntry[] {
  const classmates = [
    { username: "BinaryBoss_PIT", avatar: getAvatarUrl("BinaryBoss_PIT"), level: 44, xp: 14200, score: 24, survivalHighScore: 48 },
    { username: "Grace_Ada_Albay", avatar: getAvatarUrl("Grace_Ada_Albay"), level: 38, xp: 11100, score: 22, survivalHighScore: 25 },
    { username: "PhpTabacoExpert", avatar: getAvatarUrl("PhpTabacoExpert"), level: 32, xp: 9500, score: 25, survivalHighScore: 30 },
    { username: "QueryQueen_Panal", avatar: getAvatarUrl("QueryQueen_Panal"), level: 27, xp: 7800, score: 21, survivalHighScore: 18 },
    { username: "NetWarrior_2026", avatar: getAvatarUrl("NetWarrior_2026"), level: 21, xp: 5800, score: 18, survivalHighScore: 15 },
    { username: "Linus_Panal", avatar: getAvatarUrl("Linus_Panal"), level: 16, xp: 4200, score: 19, survivalHighScore: 13 },
    { username: "WebDevWizard", avatar: getAvatarUrl("WebDevWizard"), level: 11, xp: 2600, score: 17, survivalHighScore: 10 },
    { username: "FreshmanFox", avatar: getAvatarUrl("FreshmanFox"), level: 5, xp: 900, score: 12, survivalHighScore: 6 },
    { username: "NullPointer_Tab", avatar: getAvatarUrl("NullPointer_Tab"), level: 3, xp: 450, score: 8, survivalHighScore: 4 }
  ];

  // Calculate user total XP (including level offsets)
  let userTotalXP = userStats.xp;
  for (let i = 1; i < userStats.level; i++) {
    userTotalXP += getXPNeededForLevel(i);
  }

  // Add the user to the board
  const userEntry: LeaderboardEntry = {
    username: currentUsername || "You",
    avatar: getAvatarUrl(currentUsername || "You"),
    level: userStats.level,
    xp: userTotalXP,
    isCurrentUser: true
  };

  if (type === "global") {
    const list = [userEntry, ...classmates.map(c => ({ username: c.username, avatar: c.avatar, level: c.level, xp: c.xp }))];
    return list.sort((a, b) => b.xp - a.xp);
  }

  if (type === "daily") {
    // Generate daily scores randomly but save user daily results
    const userDailyScore = userStats.dailyChallengeDoneDate === new Date().toISOString().split("T")[0] ? 8 : 0;
    const list = [
      { ...userEntry, score: userDailyScore },
      ...classmates.map(c => ({
        ...c,
        score: Math.floor(Math.sin(c.xp) * 4) + 6 // deterministic daily range [2-10]
      }))
    ];
    return (list as LeaderboardEntry[]).sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  if (type === "survival") {
    const list = [
      { ...userEntry, score: userStats.survivalHighScore },
      ...classmates.map(c => ({
        ...c,
        score: c.survivalHighScore
      }))
    ];
    return (list as LeaderboardEntry[]).sort((a, b) => (b.score || 0) - (a.score || 0));
  }

  // Subject board specific (using max high scores scored by user)
  const list = [
    { ...userEntry, score: 15 }, // default display
    ...classmates.map(c => ({
      ...c,
      score: c.score
    }))
  ];
  return (list as LeaderboardEntry[]).sort((a, b) => (b.score || 0) - (a.score || 0));
}

// Generate Weakness Analysis & Advice based on user diagnostics
export function generateWeaknessAnalysis(stats: UserStats): { lowSubject: string; count: number; text: string; recommendation: string } {
  let lowestPercent = 100;
  let lowestSubject = "None";
  let lowCorrect = 0;
  let totalTracked = 0;

  Object.entries(stats.subjectProgress).forEach(([subject, data]) => {
    if (data.answered > 0) {
      totalTracked += 1;
      const acc = (data.correct / data.answered) * 100;
      if (acc < lowestPercent) {
        lowestPercent = acc;
        lowestSubject = subject;
        lowCorrect = data.correct;
      }
    }
  });

  if (lowestSubject === "None" || totalTracked === 0) {
    return {
      lowSubject: "All Clear!",
      count: 0,
      text: "You haven't completed any topic reviews yet. Select a topic above to begin analyzing your performance profile.",
      recommendation: "Jump into 'Data Structures and Algorithms' under Subject Mode to start your diagnostic metrics."
    };
  }

  let text = `You currently hold a ${Math.round(lowestPercent)}% accuracy in ${lowestSubject}. `;
  let recommendation = "";

  if (lowestSubject.includes("Data Structures")) {
    recommendation = "Practice Stacks, AVL trees, and search algorithms (binary search mid-calculation formulas). Focus on O(log n) trees vs skewed O(n) sequences.";
    text += "You frequently struggle with tree-structures height balance factors and stack overflow thresholds.";
  } else if (lowestSubject.includes("Object-Oriented")) {
    recommendation = "Review 'final' class restrictions blocking subclass inheritance, and Method Overloading (compile-time) vs Overriding (runtime).";
    text += "Keyword parameters and constructor chaining mechanics pose challenges.";
  } else if (lowestSubject.includes("Web Systems")) {
    recommendation = "Commit the clockwise CSS shorthand rules (Top-Right-Bottom-Left) to memory, along with semantic element definitions (<nav> and <aside> layouts).";
    text += "Centering coordinates, box models, and CSS specificity weights require review.";
  } else if (lowestSubject.includes("Information Management")) {
    recommendation = "Review 2NF (eliminating partial key dependencies) and 3NF (transitive relationship removals), along with SQL LEFT vs INNER join specifications.";
    text += "Relational Normalization and SELECT sorting commands are weak spots.";
  } else if (lowestSubject.includes("Graphics")) {
    recommendation = "Remember screen origins sit top-left (0,0), and vertical upward movements decrease Y value. Practice PNG lossless transparency properties.";
    text += "Canvas geometry and RGB color model limitations are causing confusion.";
  } else if (lowestSubject.includes("PHP")) {
    recommendation = "Remember variables require the $ dollar prefix and statements terminate via semicolon (;). Study == standard coercion vs === strict matching.";
    text += "The count(), isset(), and empty() state evaluations need review.";
  } else if (lowestSubject.includes("Networking")) {
    recommendation = "Study OSI Layer 3 (logical packet routing and routers) vs Layer 2 switches, IPv4 32-bit dotted-decimal standards, and dynamic DHCP handshakes.";
    text += "Network protocol handshakes and topolgy cabling equations (n(n-1)/2) require attention.";
  }

  return {
    lowSubject: lowestSubject,
    count: stats.subjectProgress[lowestSubject]?.answered || 0,
    text,
    recommendation
  };
}
