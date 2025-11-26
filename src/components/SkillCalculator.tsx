import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRankImage } from "@/lib/rank";
import {
  SKILLS,
  MAX_SKILL,
  MULTIPLIERS,
  calculateStatValue,
  calculateUniqueSkillUmaStar,
  INITIAL_SKILLS,
  INITIAL_UNIQUE_SKILL_UMA_STAR,
  calculateNextRank,
  calculateRating,
} from "@/lib/calc/stats";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SKILLS as SKILLS_SKILL } from "@/lib/constant/skills";
import { SearchCombobox } from "./combobox-skill";

export const SkillCalculator = () => {
  const [stats, setStats] = useState(INITIAL_SKILLS);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skillData = useMemo(() => {
    return SKILLS_SKILL.map((skill) => ({
      value: skill,
      label: skill,
    }));
  }, []);

  const [uniqueSkillUmaStar, setUniqueSkillUmaStar] = useState(
    INITIAL_UNIQUE_SKILL_UMA_STAR,
  );

  const calculatedSkills = useMemo(() => {
    return {
      spd: calculateStatValue(stats.spd),
      sta: calculateStatValue(stats.sta),
      pwr: calculateStatValue(stats.pwr),
      gut: calculateStatValue(stats.gut),
      wit: calculateStatValue(stats.wit),
      unique_skill: calculateUniqueSkillUmaStar(
        uniqueSkillUmaStar.uniqueSkill,
        uniqueSkillUmaStar.umaStar,
      ),
    };
  }, [stats, uniqueSkillUmaStar]);

  const total_stats = useMemo(() => {
    return Object.entries(calculatedSkills).reduce((sum, [key, value]) => {
      if (key !== "unique_skill") return sum + value;
      return sum;
    }, 0);
  }, [calculatedSkills]);

  const total_uma = useMemo(() => {
    return calculatedSkills.unique_skill;
  }, [calculatedSkills]);

  const total_overall = useMemo(() => {
    return total_stats + total_uma;
  }, [total_stats, total_uma]);

  const nextRank = useMemo(() => {
    const nextRank = calculateNextRank(total_overall);
    return nextRank;
  }, [total_overall]);

  const rankImage = useMemo(() => getRankImage(total_overall), [total_overall]);

  const rankName = useMemo(
    () => calculateRating(total_overall),
    [total_overall],
  );

  const handleSkillChange = (key: string, value: number) => {
    const clampedValue = Math.max(0, Math.min(MAX_SKILL, value));
    setStats((prev) => ({ ...prev, [key]: clampedValue }));
  };

  const handleSkillReset = () => {
    setStats(INITIAL_SKILLS);
    setUniqueSkillUmaStar(INITIAL_UNIQUE_SKILL_UMA_STAR);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-8 text-3xl font-bold text-foreground">
        Skill Calculator
      </h1>

      <div className="grid gap-6 md:grid-cols-[1fr,auto]">
        <Card className="border-border bg-card p-6">
          <Tabs defaultValue="tab-1">
            <TabsList className="h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground">
              <TabsTrigger value="tab-1">Stats</TabsTrigger>
              <TabsTrigger value="tab-2">Uma Level</TabsTrigger>
              <TabsTrigger value="tab-3">Skills</TabsTrigger>
            </TabsList>

            {/* Tab Stats */}
            <TabsContent value="tab-1">
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="p-2 text-left text-sm font-medium text-foreground">
                          Name
                        </th>
                        <th className="p-2 text-right text-sm font-medium text-foreground">
                          Value
                        </th>
                        <th className="p-2 text-right text-sm font-medium text-foreground">
                          Calculated
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SKILLS.map(({ key, name }) => (
                        <tr
                          key={key}
                          className="border-b border-border last:border-b-0"
                        >
                          <td className="p-2 text-sm text-muted-foreground">
                            {name}
                          </td>
                          <td className="p-2 text-right flex justify-end">
                            <Input
                              id={key}
                              type="number"
                              min="0"
                              max={MAX_SKILL}
                              value={stats[key as keyof typeof stats]}
                              onChange={(e) =>
                                handleSkillChange(
                                  key,
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="w-24 border-border bg-input text-right text-foreground"
                            />
                          </td>
                          <td className="p-2 text-right text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">
                              {
                                calculatedSkills[
                                  key as keyof typeof calculatedSkills
                                ]
                              }
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Tab Uma Unique Skill*/}
            <TabsContent value="tab-2">
              <div className="space-y-6 p-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="p-2 text-center text-sm font-medium text-foreground">
                          Name
                        </th>
                        <th className="p-2 text-center text-sm font-medium text-foreground">
                          Level
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b border-border last:border-b-0">
                        <td className="p-2 text-center text-sm text-muted-foreground">
                          Unique Skill
                        </td>
                        <td className="p-2 text-center flex justify-center">
                          <Select
                            value={uniqueSkillUmaStar.uniqueSkill.toString()}
                            onValueChange={(value) =>
                              setUniqueSkillUmaStar((prev) => ({
                                ...prev,
                                uniqueSkill: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-24 border-border bg-input text-center text-foreground">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(6)].map((_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                      <tr className="border-b border-border last:border-b-0">
                        <td className="p-2 text-center text-sm text-muted-foreground">
                          Uma Star
                        </td>
                        <td className="p-2 text-center flex justify-center">
                          <Select
                            value={uniqueSkillUmaStar.umaStar.toString()}
                            onValueChange={(value) =>
                              setUniqueSkillUmaStar((prev) => ({
                                ...prev,
                                umaStar: parseInt(value),
                              }))
                            }
                          >
                            <SelectTrigger className="w-24 border-border bg-input text-center text-foreground">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {[...Array(5)].map((_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan={2}
                          className="p-2 text-center text-sm font-medium text-foreground"
                        >
                          Total: {total_uma}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Tab Skills */}
            <TabsContent value="tab-3">
              <div className="space-y-6">
                <SearchCombobox
                  items={selectedSkills.map((skill) => skill.name)}
                  skills={SKILLS_SKILL}
                  onAdd={(skill) => {
                    setSelectedSkills([...selectedSkills, skill]);
                    console.log("Added skill:", skill, selectedSkills);
                  }}
                  onRemove={(skill) =>
                    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
                  }
                  onRemoveAll={() => setSelectedSkills([])}
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Rank image */}
        <Card className="flex flex-col items-center justify-center border-border bg-card p-6">
          <div className="flex h-full min-h-[400px] w-[300px] items-center justify-center">
            {total_overall > 0 ? (
              <div className="flex flex-col items-center">
                <img
                  src={rankImage}
                  alt="Rank"
                  className="max-h-full max-w-full object-contain"
                />
                <p>{rankName}</p>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                Adjust skills to see your rank
              </p>
            )}
          </div>
          <div className="mt-8 border-t border-border pt-4 w-full flex flex-col">
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-semibold text-foreground">
                Total :
              </span>
              <span className="text-2xl font-bold text-foreground">
                {total_overall}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-semibold text-foreground">
                Next Rank:
              </span>
              <span className="text-2xl font-bold text-foreground">
                {nextRank}
              </span>
            </div>
            <Button
              onClick={handleSkillReset}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors mt-4"
            >
              Reset Skills
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
