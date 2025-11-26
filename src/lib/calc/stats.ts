import { calculateStatScore } from "./total";

const INITIAL_SKILLS = {
  spd: 1200,
  sta: 1200,
  pwr: 1200,
  gut: 1200,
  wit: 1200,
};

const INITIAL_UNIQUE_SKILL_UMA_STAR = {
  uniqueSkill: 1,
  umaStar: 1,
};

const SKILLS = [
  { key: "spd", label: "SPD", name: "Speed" },
  { key: "sta", label: "STA", name: "Stamina" },
  { key: "pwr", label: "PWR", name: "Power" },
  { key: "gut", label: "GUT", name: "Guts" },
  { key: "wit", label: "WIT", name: "Wits" },
] as const;

const MAX_SKILL = 1200;

const MULTIPLIERS = [
  0.5, 0.8, 1, 1.3, 1.6, 1.8, 2.1, 2.4, 2.6, 2.8, 2.9, 3, 3.1, 3.3, 3.4, 3.5,
  3.9, 4.1, 4.2, 4.3, 5.2, 5.5, 6.6, 6.8, 6.9,
];

const calculateStatValue = (x: number): number => {
  return calculateStatScore(x);
  // if (x < 0) return 0;
  // if (x > 1200) return 3841;

  // const blockSize = 50;
  // const blocks = Math.floor(x / blockSize);

  // // Calculate block_sum
  // let blockSum = 0;
  // for (let i = 0; i < blocks && i < MULTIPLIERS.length; i++) {
  //   blockSum += MULTIPLIERS[i] * 50;
  // }

  // // Calculate remainder_sum
  // const remainder = x % blockSize;
  // const remainderSum =
  //   blocks < MULTIPLIERS.length ? MULTIPLIERS[blocks] * (remainder + 1) : 0;

  // return Math.floor(blockSum + remainderSum);
};

const calculateUniqueSkillUmaStar = (
  skillValue: number,
  starRating: number,
): number => {
  if (starRating === 1 || starRating === 2) {
    return skillValue * 120;
  } else if (starRating === 3 || starRating === 4 || starRating === 5) {
    return skillValue * 170;
  }
  return 0;
};

const calculateNextRank = (total: number): number | string => {
  if (total < 300) return 300 - total;
  if (total < 600) return 600 - total;
  if (total < 900) return 900 - total;
  if (total < 1300) return 1300 - total;
  if (total < 1800) return 1800 - total;
  if (total < 2300) return 2300 - total;
  if (total < 2900) return 2900 - total;
  if (total < 3500) return 3500 - total;
  if (total < 4900) return 4900 - total;
  if (total < 6500) return 6500 - total;
  if (total < 8200) return 8200 - total;
  if (total < 10000) return 10000 - total;
  if (total < 12100) return 12100 - total;
  if (total < 14500) return 14500 - total;
  if (total < 15900) return 15900 - total;
  if (total < 17500) return 17500 - total;
  if (total < 19600) return 19600 - total;
  if (total < 20000) return 20000 - total;
  if (total < 20400) return 20400 - total;
  if (total < 20800) return 20800 - total;
  if (total < 21200) return 21200 - total;
  if (total < 21600) return 21600 - total;
  if (total < 22100) return 22100 - total;
  if (total >= 22100) return "Ug⁶ Rank";
  return 0;
};

const calculateRating = (total: number): string => {
  if (total < 300) return "G Rank";
  if (total < 600) return "G+ Rank";
  if (total < 900) return "F Rank";
  if (total < 1300) return "F+ Rank";
  if (total < 1800) return "E Rank";
  if (total < 2300) return "E+ Rank";
  if (total < 2900) return "D Rank";
  if (total < 3500) return "D+ Rank";
  if (total < 4900) return "C Rank";
  if (total < 6500) return "C+ Rank";
  if (total < 8200) return "B Rank";
  if (total < 10000) return "B+ Rank";
  if (total < 12100) return "A Rank";
  if (total < 14500) return "A+ Rank";
  if (total < 15900) return "S Rank";
  if (total < 17500) return "S+ Rank";
  if (total < 19200) return "SS Rank";
  if (total < 19600) return "SS+ Rank";
  if (total < 20000) return "Ug⁰ Rank";
  if (total < 20400) return "Ug¹ Rank";
  if (total < 20800) return "Ug² Rank";
  if (total < 21200) return "Ug³ Rank";
  if (total < 21600) return "Ug⁴ Rank";
  if (total < 22100) return "Ug⁵ Rank";
  if (total >= 22100) return "Ug⁶ Rank";
  return "G Rank";
};

export {
  SKILLS,
  MAX_SKILL,
  MULTIPLIERS,
  INITIAL_SKILLS,
  INITIAL_UNIQUE_SKILL_UMA_STAR,
  calculateStatValue,
  calculateUniqueSkillUmaStar,
  calculateNextRank,
  calculateRating,
};
