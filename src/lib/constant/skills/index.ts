import type { SKILL_TYPE, SkillDefinition } from "../../calc/total";
import { BLUE_SKILLS } from "./blue";
import { GOLD_SKILLS } from "./gold";
import { GREEN_SKILLS } from "./green";
import { INHERIT_SKILLS } from "./inherit";
import { PURPLE_SKILLS } from "./purple";
import { RED_SKILLS } from "./red";
import { YELLOW_SKILLS } from "./yellow";

export const SKILLS: SkillDefinition[] = [
  ...INHERIT_SKILLS.map((skill) => ({
    ...skill,
    type: "INHERIT" as SKILL_TYPE,
  })),
  ...PURPLE_SKILLS.map((skill) => ({ ...skill, type: "PURPLE" as SKILL_TYPE })),
  ...GREEN_SKILLS.map((skill) => ({ ...skill, type: "GREEN" as SKILL_TYPE })),
  ...RED_SKILLS.map((skill) => ({ ...skill, type: "RED" as SKILL_TYPE })),
  ...YELLOW_SKILLS.map((skill) => ({ ...skill, type: "YELLOW" as SKILL_TYPE })),
  ...BLUE_SKILLS.map((skill) => ({ ...skill, type: "BLUE" as SKILL_TYPE })),
  ...GOLD_SKILLS.map((skill) => ({ ...skill, type: "GOLD" as SKILL_TYPE })),
];
