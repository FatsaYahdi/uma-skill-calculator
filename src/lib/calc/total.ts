const MULTIPLIERS_LOW = [
  0.5, 0.8, 1, 1.3, 1.6, 1.8, 2.1, 2.4, 2.6, 2.8, 2.9, 3, 3.1, 3.3, 3.4, 3.5,
  3.9, 4.1, 4.2, 4.3, 5.2, 5.5, 6.6, 6.8, 6.9,
];

const MULTIPLIERS_HIGH = [
  7.888, 8, 8.1, 8.3, 8.4, 8.5, 8.6, 8.8, 8.9, 9, 9.2, 9.3, 9.4, 9.6, 9.7, 9.8,
  10, 10.1, 10.2, 10.3, 10.5, 10.6, 10.7, 10.9, 11, 11.1, 11.3, 11.4, 11.5,
  11.7, 11.8, 11.9, 12.1, 12.2, 12.3, 12.4, 12.6, 12.7, 12.8, 13, 13.1, 13.2,
  13.4, 13.5, 13.6, 13.8, 13.9, 14, 14.1, 14.3, 14.4, 14.5, 14.7, 14.8, 14.9,
  15.1, 15.2, 15.3, 15.5, 15.6, 15.7, 15.9, 16, 16.1, 16.2, 16.4, 16.5, 16.6,
  16.8, 16.9, 17, 17.2, 17.3, 17.4, 17.6, 17.7, 17.8, 17.9, 18.1, 18.2, 18.3,
];

const EXCEPTIONS = [
  [1643, 8587],
  [1865, 11931],
];

function calculateStatScore(stat: number): number {
  // Check for exceptions first
  for (const [exceptionStat, exceptionScore] of EXCEPTIONS) {
    if (stat === exceptionStat) return exceptionScore;
  }

  // --- ZONE 1: Low Values (<= 1200) ---
  if (stat <= 1200) {
    stat += 1;
    let score = 0;

    for (let i = 0; i < MULTIPLIERS_LOW.length; i++) {
      if (MULTIPLIERS_LOW[i] === 0) return 0; // Error case

      if (stat > 50) {
        score += 50 * MULTIPLIERS_LOW[i];
        stat -= 50;
        continue;
      }

      score += stat * MULTIPLIERS_LOW[i];
      break;
    }

    return Math.floor(score);
  }

  // --- ZONE 2: Middle Values (1201 - 1209) ---
  else if (stat > 1200 && stat <= 1209) {
    return Math.ceil((stat - 1200) * MULTIPLIERS_HIGH[0] + 3841);
  }

  // --- ZONE 3: High Values (>= 1210) ---
  else if (stat > 1209 && stat <= 2000) {
    stat = stat - 1210 + 1;
    let score = 0;

    for (let i = 1; i < MULTIPLIERS_HIGH.length; i++) {
      if (MULTIPLIERS_HIGH[i] === 0) return 0; // Error case

      if (stat > 10) {
        score += Math.ceil(10 * MULTIPLIERS_HIGH[i]);
        stat -= 10;
        continue;
      }

      score += Math.ceil(stat * MULTIPLIERS_HIGH[i]);
      break;
    }

    return score + 3912;
  }

  // Default case (shouldn't happen with current ranges)
  return 0;
}

/**
 * TYPES AND INTERFACES (Reused from previous step)
 */
export type AptitudeRank =
  | "S"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "S-A"
  | "B-C"
  | "D-E-F"
  | "SA"
  | "BC"
  | "DEF";

export type SKILL_TYPE =
  | "INHERIT"
  | "PURPLE"
  | "GREEN"
  | "RED"
  | "YELLOW"
  | "BLUE"
  | "GOLD";

export interface SkillDefinition {
  name: string;
  hasAptitudeTie: boolean;
  aptitudeScores?: {
    tier_SA: number;
    tier_BC: number;
    tier_DEF: number;
    tier_G: number;
  };
  aptitude?:
    | "FRONT"
    | "PACE"
    | "LATE"
    | "END"
    | "SPRINT"
    | "MILE"
    | "MEDIUM"
    | "LONG"
    | "DIRT"
    | "TURF";
  fixedScore?: number;
  defaultScore?: number;
  type?: SKILL_TYPE;
}

/**
 * CONSTANTS
 */
const CURRENT_INHERIT_SCORE = 180;
// const FUTURE_INHERIT_SCORE = 198;

/**
 * CORE LOGIC
 */
function calculateSkillScore(
  skill: SkillDefinition,
  currentAptitudeRank?: AptitudeRank,
): number {
  if (!skill.hasAptitudeTie) {
    return skill.fixedScore ?? 0;
  }

  if (skill.hasAptitudeTie && currentAptitudeRank && skill.aptitudeScores) {
    switch (currentAptitudeRank) {
      case "S":
      case "A":
      case "SA":
      case "S-A":
        return skill.aptitudeScores.tier_SA;
      case "B":
      case "C":
      case "B-C":
        return skill.aptitudeScores.tier_BC;
      case "D":
      case "E":
      case "F":
      case "D-E-F":
        return skill.aptitudeScores.tier_DEF;
      case "G":
        return skill.aptitudeScores.tier_G;
      default:
        return 0;
    }
  }
  return 0;
}

/**
 * Inherited Unique Skills
 */
const DB_SKILLS: Record<string, SkillDefinition> = {
  // --- INHERITED UNIQUE SKILLS ---
  // All currently set to 180 points
  "Pure Heart": {
    name: "Pure Heart",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Shooting Star": {
    name: "Shooting Star",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "The View from the Lead Is Mine!": {
    name: "The View from the Lead Is Mine!",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Sky-High Teio Step": {
    name: "Sky-High Teio Step",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Triumphant Pulse": {
    name: "Triumphant Pulse",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Anchors Aweigh!": {
    name: "Anchors Aweigh!",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Resplendent Red Ace": {
    name: "Resplendent Red Ace",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Victoria por plancha": {
    name: "Victoria por plancha",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "This Dance Is for Vittoria!": {
    name: "This Dance Is for Vittoria!",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Emperor's Divine Might": {
    name: "Emperor's Divine Might",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "G00 1st. F∞;": {
    name: "G00 1st. F∞;",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  }, // Mihono Bourbon
  "Blue Rose Closer": {
    name: "Blue Rose Closer",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Genius x Bakushin = Victory": {
    name: "Genius x Bakushin = Victory",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  Nemesis: {
    name: "Nemesis",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  }, // Narita Taishin
  "Shadow Break": {
    name: "Shadow Break",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  }, // Narita Brian
  "Angling and Scheming": {
    name: "Angling and Scheming",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  }, // Seiun Sky
  "U=ma2": {
    name: "U=ma2",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  }, // Agnes Tachyon
  "Schwarzes Schwert": {
    name: "Schwarzes Schwert",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  }, // Eishin Flash
  "Flower Maneuver": {
    name: "Flowery Maneuver",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "Condor's Fury": {
    name: "Condor's Fury",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
  "I Never Goof Up!": {
    name: "I Never Goof Up!",
    hasAptitudeTie: false,
    fixedScore: CURRENT_INHERIT_SCORE,
  },
};

// // Test 1: Inherited Unique (Special Week)
// const inheritScore1 = calculateSkillScore(DB_SKILLS["Shooting Star"]);
// console.log(`Inherited 'Shooting Star': ${inheritScore1} (Expected: 180)`);

// // Test 2: Inherited Unique (Seiun Sky)
// const inheritScore2 = calculateSkillScore(DB_SKILLS["Angling and Scheming"]);
// console.log(
//   `Inherited 'Angling and Scheming': ${inheritScore2} (Expected: 180)`,
// );

// // Test 3: Mixed Validation (Standard Skill)
// const standardScore = calculateSkillScore(DB_SKILLS["Mystifying Murmur"], "S");
// console.log(
//   `Standard 'Mystifying Murmur' (Rank S): ${standardScore} (Expected: 559)`,
// );
export { calculateStatScore, DB_SKILLS, calculateSkillScore };
