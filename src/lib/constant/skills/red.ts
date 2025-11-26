import { SkillDefinition } from "@/lib/calc/total";

export const RED_SKILLS: SkillDefinition[] = [
  {
    name: "Hesitant Front Runners",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Hesitant Pace Chasers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Hesitant Late Surgers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Hesitant End Closers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },

  {
    name: "Frenzied Front Runners",
    fixedScore: 174,
    hasAptitudeTie: false,
  },
  {
    name: "Frenzied Pace Chasers",
    fixedScore: 174,
    hasAptitudeTie: false,
  },
  {
    name: "Frenzied Late Surgers",
    fixedScore: 174,
    hasAptitudeTie: false,
  },
  {
    name: "Frenzied End Closers",
    fixedScore: 174,
    hasAptitudeTie: false,
  },
  {
    name: "Trick (Front)",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Trick (Rear)",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Subdued Front Runners",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Flustered Front Runners",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Subdued Pace Chasers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Flustered Pace Chasers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Subdued Late Surgers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Flustered Late Surgers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Subdued End Closers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },
  {
    name: "Flustered End Closers",
    fixedScore: 217,
    hasAptitudeTie: false,
  },

  // changing depends on aptitude
  // {
  //   name: "Front Runner Savvy ◎",
  //   hasAptitudeTie: true,
  //   aptitude: "FRONT",
  //   aptitudeScores: {
  //     tier_SA: 239,
  //     tier_BC: 195,
  //     tier_DEF: 174,
  //     tier_G: 152,
  //   },
  //   defaultScore: 195,
  // },
  {
    name: "Intimidate",
    hasAptitudeTie: true,
    aptitude: "SPRINT",
    aptitudeScores: {
      tier_SA: 210,
      tier_BC: 288,
      tier_DEF: 236,
      tier_G: 210,
    },
    defaultScore: 183,
  },
  {
    name: "Speed Eater",
    hasAptitudeTie: true,
    aptitude: "MILE",
    aptitudeScores: {
      tier_SA: 239,
      tier_BC: 239,
      tier_DEF: 195,
      tier_G: 174,
    },
    defaultScore: 152,
  },
  {
    name: "Tether",
    hasAptitudeTie: true,
    aptitude: "MEDIUM",
    aptitudeScores: {
      tier_SA: 239,
      tier_BC: 239,
      tier_DEF: 195,
      tier_G: 174,
    },
    defaultScore: 152,
  },
  {
    name: "Intense Gaze",
    hasAptitudeTie: true,
    aptitude: "END",
    aptitudeScores: {
      tier_SA: 195,
      tier_BC: 239,
      tier_DEF: 195,
      tier_G: 174,
    },
    defaultScore: 152,
  },
  {
    name: "Opening Gambit",
    hasAptitudeTie: true,
    aptitude: "MILE",
    aptitudeScores: {
      tier_SA: 239,
      tier_BC: 239,
      tier_DEF: 195,
      tier_G: 174,
    },
    defaultScore: 152,
  },
  {
    name: "Restart",
    hasAptitudeTie: true,
    aptitude: "FRONT",
    aptitudeScores: {
      tier_SA: 152,
      tier_BC: 239,
      tier_DEF: 195,
      tier_G: 174,
    },
    defaultScore: 152,
  },
  {
    name: "Stop Right There!",
    hasAptitudeTie: true,
    aptitude: "SPRINT",
    aptitudeScores: {
      tier_SA: 210,
      tier_BC: 288,
      tier_DEF: 236,
      tier_G: 210,
    },
    defaultScore: 183,
  },
  {
    name: "Murmur",
    hasAptitudeTie: true,
    aptitude: "MEDIUM",
    aptitudeScores: {
      tier_SA: 239,
      tier_BC: 239,
      tier_DEF: 195,
      tier_G: 174,
    },
    defaultScore: 152,
  },
  {
    name: "Stamina Eater",
    hasAptitudeTie: true,
    aptitude: "LONG",
    aptitudeScores: {
      tier_SA: 152,
      tier_BC: 239,
      tier_DEF: 195,
      tier_G: 174,
    },
    defaultScore: 152,
  },
  {
    name: "Sharp Gaze",
    hasAptitudeTie: true,
    aptitude: "LATE",
    aptitudeScores: {
      tier_SA: 239,
      tier_BC: 239,
      tier_DEF: 195,
      tier_G: 174,
    },
    defaultScore: 152,
  },
  {
    name: "Smoke Screen",
    hasAptitudeTie: true,
    aptitude: "LONG",
    aptitudeScores: {
      tier_SA: 90,
      tier_BC: 142,
      tier_DEF: 116,
      tier_G: 103,
    },
    defaultScore: 90,
  },
  {
    name: "Disorient",
    hasAptitudeTie: true,
    aptitude: "PACE",
    aptitudeScores: {
      tier_SA: 94,
      tier_BC: 94,
      tier_DEF: 77,
      tier_G: 68,
    },
    defaultScore: 60,
  },
];
