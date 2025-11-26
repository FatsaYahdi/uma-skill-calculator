import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  calculateStatValue,
  calculateUniqueSkillUmaStar,
  MAX_SKILL,
} from "@/lib/calc/stats";
import { OPTIONS } from "@/lib/constant/options";
import type { RANK, UMA, UMA_TEMPLATE } from "@/lib/uma";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { UMA_APTITUDE_TEMPLATE } from "@/lib/constant/uma-aptitude";
import { cn } from "@/lib/utils";
import { SKILLS } from "@/lib/constant/skills";
import { calculateSkillScore, type SkillDefinition } from "@/lib/calc/total";
import { COLORS, TEXT_COLORS } from "@/lib/constant/colors";
import { Badge } from "@/components/ui/badge";
import { getRankImage } from "@/lib/rank";

export default function Skills() {
  const [uma, setUma] = useState<UMA>({
    stats: {
      speed: {
        score: 0,
        stat: 0,
      },
      stamina: {
        score: 0,
        stat: 0,
      },
      power: {
        score: 0,
        stat: 0,
      },
      guts: {
        score: 0,
        stat: 0,
      },
      witness: {
        score: 0,
        stat: 0,
      },
    },
    aptitudes: {
      dirt: "G",
      turf: "G",
      sprint: "G",
      mile: "G",
      medium: "G",
      long: "G",
      front: "G",
      pace: "G",
      late: "G",
      end: "G",
    },
    unique_skills: {
      skill_level: 1,
      star_level: 1,
      score: 0,
    },
  });
  const { stats } = uma;
  const [selectedTemplate, setSelectedTemplate] = useState<UMA_TEMPLATE>();
  const [selectedTemplateChar, setSelectedTemplateChar] = useState<string>();

  const [selectedSkills, setSelectedSkills] = useState<SkillDefinition[]>([]);

  const handleSkillChange = (key: string, value: number) => {
    const clampedValue = Math.max(0, Math.min(MAX_SKILL, value));
    setUma((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [key]: {
          ...prev.stats[key as keyof typeof prev.stats],
          stat: clampedValue,
          score: calculateStatValue(clampedValue),
        },
      },
    }));
  };

  const calc = useMemo(() => {
    return {
      uniqueSkillUmaStar: calculateUniqueSkillUmaStar(
        uma.unique_skills.skill_level,
        uma.unique_skills.star_level,
      ),
      totalOverall:
        uma.stats.power.score +
        uma.stats.witness.score +
        uma.stats.speed.score +
        uma.stats.stamina.score +
        uma.stats.guts.score,
      totalSkill: selectedSkills.reduce(
        (acc, skill) =>
          acc +
          (skill.hasAptitudeTie
            ? calculateSkillScore(
                skill,
                uma.aptitudes[skill.aptitude.toLowerCase()],
              )
            : (skill.defaultScore ?? skill.fixedScore)),
        0,
      ),
    };
  }, [uma, selectedSkills]);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-foreground">
          Skill Calculator
        </h1>

        <div className="grid gap-6 md:grid-cols-[1fr,auto]">
          <div className="grid grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  Stats
                  <Button
                    onClick={() => {
                      setUma((prev) => ({
                        ...prev,
                        stats: {
                          speed: { score: 0, stat: 0 },
                          stamina: { score: 0, stat: 0 },
                          power: { score: 0, stat: 0 },
                          guts: { score: 0, stat: 0 },
                          witness: { score: 0, stat: 0 },
                        },
                      }));
                    }}
                  >
                    Reset
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="min-w-full table-auto border-collapse">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-28 text-left text-xs font-semibold uppercase p-3 border-r">
                        {/* Metric */}
                      </TableHead>
                      {Object.entries(stats).map(([key]) => (
                        <TableHead
                          key={key}
                          className="font-semibold py-3 px-4 uppercase text-sm border-r last:border-r-0"
                          style={{ minWidth: "100px" }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-b transition-colors">
                      <TableHead className="font-medium text-left p-3 border-r">
                        Stat points
                      </TableHead>

                      {Object.entries(stats).map(([key, value]) => (
                        <TableCell
                          key={key}
                          className="p-1 text-center border-r last:border-r-0"
                        >
                          <Input
                            id={key}
                            type="number"
                            min="0"
                            max={MAX_SKILL}
                            value={value.stat}
                            onChange={(e) =>
                              handleSkillChange(
                                key,
                                parseInt(e.target.value, 10) || 0,
                              )
                            }
                            aria-label={`${key.charAt(0).toUpperCase() + key.slice(1)} Stat points`}
                            className="w-full h-10 text-center text-lg font-mono border rounded-md transition-colors"
                          />
                        </TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <TableHead className="font-medium text-left p-3 border-r">
                        Score
                      </TableHead>

                      {Object.entries(stats).map(([key, value]) => (
                        <TableCell
                          key={key}
                          className="p-3 text-center text-lg font-mono"
                        >
                          {value.score}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unique Skill</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="skill-level"
                        className="text-sm font-medium w-[200px]"
                      >
                        Skill Level
                      </label>
                      <Select
                        value={uma.unique_skills.skill_level.toString()}
                        onValueChange={(value) => {
                          setUma((prev) => ({
                            ...prev,
                            unique_skills: {
                              ...prev.unique_skills,
                              skill_level: parseInt(value, 10) as
                                | 1
                                | 2
                                | 3
                                | 4
                                | 5
                                | 6,
                            },
                          }));
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="star-level"
                        className="text-sm font-medium w-[200px]"
                      >
                        Star Level
                      </label>
                      <Select
                        value={uma.unique_skills.star_level.toString()}
                        onValueChange={(value) => {
                          setUma((prev) => ({
                            ...prev,
                            unique_skills: {
                              ...prev.unique_skills,
                              star_level: parseInt(value, 10) as
                                | 1
                                | 2
                                | 3
                                | 4
                                | 5,
                            },
                          }));
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-2">
                      Total: <b>{calc.uniqueSkillUmaStar}</b>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Aptitudes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 grid-rows-5 gap-2">
                <div className="w-full col-span-4 grid grid-cols-4 gap-2">
                  <div className="flex justify-center items-center border">
                    Turf
                  </div>
                  <div className="flex justify-center items-center border">
                    <Select
                      defaultValue={uma.aptitudes.turf}
                      value={uma.aptitudes.turf}
                      onValueChange={(value) =>
                        setUma({
                          ...uma,
                          aptitudes: { ...uma.aptitudes, turf: value as RANK },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-center items-center border">
                    Dirt
                  </div>
                  <div className="flex justify-center items-center border">
                    <Select
                      defaultValue={uma.aptitudes.dirt}
                      value={uma.aptitudes.dirt}
                      onValueChange={(value) => {
                        setUma((prev) => ({
                          ...prev,
                          aptitudes: {
                            ...prev.aptitudes,
                            dirt: value as RANK,
                          },
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-center items-center border">
                  Aptitudes Templates
                </div>
                <div className="flex justify-center items-center border">
                  Sprint
                </div>
                <div className="flex justify-center items-center border">
                  Mile
                </div>
                <div className="flex justify-center items-center border">
                  Medium
                </div>
                <div className="flex justify-center items-center border">
                  Long
                </div>
                {/*template aptitude*/}
                <div className="row-span-4 flex items-center justify-center border">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-[200px] justify-between"
                      >
                        {selectedTemplate
                          ? selectedTemplate.name
                          : "Select template..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandInput
                          placeholder="Search template..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No template found.</CommandEmpty>
                          <CommandGroup>
                            {Object.entries(UMA_APTITUDE_TEMPLATE).map(
                              ([key, template]) => (
                                <CommandItem
                                  key={key}
                                  value={template.name}
                                  onSelect={() => {
                                    setSelectedTemplate(template);

                                    setUma((prevUma) => ({
                                      ...prevUma,
                                      aptitudes: template.aptitudes,
                                    }));
                                    setSelectedTemplateChar(key);
                                  }}
                                >
                                  {template.name}
                                  <Check
                                    className={cn(
                                      "ml-auto size-4",
                                      selectedTemplateChar === key
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ),
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                {/*end template*/}
                <div className="flex justify-center items-center border">
                  <Select
                    defaultValue={uma.aptitudes.sprint}
                    value={uma.aptitudes.sprint}
                    onValueChange={(value) => {
                      setUma((prev) => ({
                        ...prev,
                        aptitudes: {
                          ...prev.aptitudes,
                          sprint: value as RANK,
                        },
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center border">
                  <Select
                    defaultValue={uma.aptitudes.mile}
                    value={uma.aptitudes.mile}
                    onValueChange={(value) => {
                      setUma((prev) => ({
                        ...prev,
                        aptitudes: {
                          ...prev.aptitudes,
                          mile: value as RANK,
                        },
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center border">
                  <Select
                    defaultValue={uma.aptitudes.medium}
                    value={uma.aptitudes.medium}
                    onValueChange={(value) => {
                      setUma((prev) => ({
                        ...prev,
                        aptitudes: {
                          ...prev.aptitudes,
                          medium: value as RANK,
                        },
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center border">
                  <Select
                    defaultValue={uma.aptitudes.long}
                    value={uma.aptitudes.long}
                    onValueChange={(value) => {
                      setUma((prev) => ({
                        ...prev,
                        aptitudes: {
                          ...prev.aptitudes,
                          long: value as RANK,
                        },
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="text-center"
                        placeholder="Select"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center row-start-4 border">
                  Front
                </div>
                <div className="flex justify-center items-center row-start-4 border">
                  Pace
                </div>
                <div className="flex justify-center items-center row-start-4 border">
                  Late
                </div>
                <div className="flex justify-center items-center row-start-4 border">
                  End
                </div>
                <div className="flex justify-center items-center row-start-5 border">
                  <Select
                    defaultValue={uma.aptitudes.front}
                    value={uma.aptitudes.front}
                    onValueChange={(value) =>
                      setUma({
                        ...uma,
                        aptitudes: { ...uma.aptitudes, front: value as RANK },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center row-start-5 border">
                  <Select
                    defaultValue={uma.aptitudes.pace}
                    value={uma.aptitudes.pace}
                    onValueChange={(value) =>
                      setUma({
                        ...uma,
                        aptitudes: { ...uma.aptitudes, pace: value as RANK },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center row-start-5 border">
                  <Select
                    defaultValue={uma.aptitudes.late}
                    value={uma.aptitudes.late}
                    onValueChange={(value) =>
                      setUma({
                        ...uma,
                        aptitudes: { ...uma.aptitudes, late: value as RANK },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center row-start-5 border">
                  <Select
                    defaultValue={uma.aptitudes.end}
                    value={uma.aptitudes.end}
                    onValueChange={(value) =>
                      setUma({
                        ...uma,
                        aptitudes: { ...uma.aptitudes, end: value as RANK },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                Skills
                <Button onClick={() => setSelectedSkills([])}>Reset</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-[200px] justify-between"
                  >
                    Select skill...
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search skill..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No skill found.</CommandEmpty>
                      <CommandGroup>
                        {SKILLS.map((skill) => (
                          <CommandItem
                            key={skill.name}
                            value={skill.name}
                            onSelect={(currentValue) => {
                              setSelectedSkills(
                                currentValue ===
                                  selectedSkills.find(
                                    (s) => s.name === currentValue,
                                  )?.name
                                  ? selectedSkills.filter(
                                      (s) => s.name !== currentValue,
                                    )
                                  : [...selectedSkills, skill],
                              );
                            }}
                          >
                            {skill.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                selectedSkills.some(
                                  (s) => s.name === skill.name,
                                )
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div>
                {/*skills:*/}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Skill Name</TableHead>
                      <TableHead>Point</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSkills.map((skill) => (
                      <TableRow key={skill.name}>
                        <TableCell>
                          <Badge
                            className="capitalize"
                            style={{
                              backgroundColor: COLORS[skill.type],
                              color: TEXT_COLORS[skill.type],
                              textTransform: "capitalize",
                            }}
                          >
                            {skill.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{skill.name}</TableCell>
                        <TableCell>
                          {skill.hasAptitudeTie
                            ? calculateSkillScore(
                                skill,
                                uma.aptitudes[skill.aptitude.toLowerCase()],
                              )
                            : (skill.defaultScore ?? skill.fixedScore)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setSelectedSkills(
                                selectedSkills.filter(
                                  (s) => s.name !== skill.name,
                                ),
                              );
                            }}
                          >
                            <X />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total: </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <div>
                {/*uma*/}
                <br />
                {/*{JSON.stringify(uma.aptitudes)}*/}
                {/*<pre>{JSON.stringify(uma, null, 2)}</pre>
                <br />
                {selectedSkills.map((skill) => {
                  return (
                    <div key={skill.name}>
                      {skill.hasAptitudeTie
                        ? calculateSkillScore(
                            skill,
                            uma.aptitudes[skill.aptitude.toLowerCase()],
                          )
                        : (skill.defaultScore ?? skill.fixedScore)}
                      {
                        // uma.aptitudes.
                      }
                    </div>
                  );
                })}*/}
                {/*// return <div>apti {skill.hasAptitudeTie ? calculateSkillScore(skill, )  }</div>;*/}
                {/*aptitutde : {uma.aptitudes.mile}*/}
                {/*{calculateSkillScore(selectedSkills[0])}*/}
              </div>
            </CardContent>
          </Card>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <>Total:</>
                <span>
                  {calc.totalOverall +
                    calc.uniqueSkillUmaStar +
                    calc.totalSkill}
                </span>
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full flex justify-end items-center">
                <img
                  src={getRankImage(
                    calc.totalOverall +
                      calc.uniqueSkillUmaStar +
                      calc.totalSkill,
                  )}
                  alt="Rank Images"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
