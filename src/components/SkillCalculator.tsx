import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const SKILLS = [
  { key: "spd", label: "SPD", name: "Speed" },
  { key: "sta", label: "STA", name: "Stamina" },
  { key: "pwr", label: "PWR", name: "Power" },
  { key: "gut", label: "GUT", name: "Guts" },
  { key: "wit", label: "WIT", name: "Wits" },
] as const;

const MAX_SKILL = 1200;

const getRankImage = (total: number): string => {
  if (total < 300) return "https://ucarecdn.com/5ebd9b54-6861-451f-81e4-d927c0f93871/G.png";
  if (total < 600) return "https://ucarecdn.com/5a33b751-4fde-4d02-af73-08c6b7c2eb16/G.png";
  if (total < 900) return "https://ucarecdn.com/d5314f9d-5258-4541-afcd-9a73180d26a8/F.png";
  if (total < 1300) return "https://ucarecdn.com/7172c064-5696-4331-ab0c-d91fda76fff6/F.png";
  if (total < 1800) return "https://ucarecdn.com/ff2aad3a-1a0e-4ee3-a139-df3bca013bb4/E.png";
  if (total < 2300) return "https://ucarecdn.com/2d98094f-0980-4c86-84f7-12feff970e11/E.png";
  if (total < 2900) return "https://ucarecdn.com/510464a1-4bbe-449f-9ef3-353df9fa9287/D.png";
  if (total < 3500) return "https://ucarecdn.com/20806fc3-a266-4a24-85fc-83f2e72e3e6f/D.png";
  if (total < 4900) return "https://ucarecdn.com/c24c1d96-c814-475e-b96c-e269b26dd4a3/C.png";
  if (total < 6500) return "https://ucarecdn.com/ca5724b8-0274-431e-a0ea-72a809cc9051/C.png";
  if (total < 8200) return "https://ucarecdn.com/77340b52-f3e0-4bbf-991e-cb6c093a47fe/B.png";
  if (total < 10000) return "https://ucarecdn.com/74ae2bd7-df98-4c4b-9c0c-9a95e2a068a7/B.png";
  if (total < 12100) return "https://ucarecdn.com/bc198b34-d0d5-4526-9f12-e4e20d2fd06c/A.png";
  if (total < 14500) return "https://ucarecdn.com/d6e22ea0-5e90-4f9e-8e7f-0446b1cd8b35/A.png";
  if (total < 15900) return "https://ucarecdn.com/fe47a6cf-39fd-4f43-bd65-8de0bcdd5125/S.png";
  if (total < 17500) return "https://ucarecdn.com/1d62b8ec-99f0-46ee-ae08-0ea3e9d07fdd/S.png";
  if (total < 19200) return "https://ucarecdn.com/902b5f72-f9e3-4727-b8a3-6a859e3c395c/SS.png";
  if (total < 19600) return "https://ucarecdn.com/350624dc-889b-41d1-8dd5-ea23b66113a0/SS.png";
  if (total < 20000) return "https://ucarecdn.com/6cf688d0-d852-418d-bb2d-5e695dd5a36e/UG.png";
  if (total < 20400) return "https://ucarecdn.com/d60b208e-c6b8-4d0f-b6e6-9dc110ca4e0c/UG1.png";
  if (total < 20800) return "https://ucarecdn.com/25ca9dc6-fa97-4440-842e-0715b066be42/UG2.png";
  if (total < 21200) return "https://ucarecdn.com/ada20e59-4fd7-4468-a583-0985b3277629/UG3.png";
  if (total < 21600) return "https://ucarecdn.com/c10300ca-84d4-4340-814e-89ad0feae078/UG4.png";
  if (total < 22100) return "https://ucarecdn.com/d0970ada-c050-49a5-bbd4-80e62f825675/UG5.png";
  return "https://ucarecdn.com/532c5060-0a96-4652-ab4e-cb9d445d4d8f/UG6.png";
};

export const SkillCalculator = () => {
  const [skills, setSkills] = useState({
    spd: 0,
    sta: 0,
    pwr: 0,
    gut: 0,
    wit: 0,
  });

  const total = useMemo(() => {
    return Object.values(skills).reduce((sum, value) => sum + value, 0);
  }, [skills]);

  const rankImage = useMemo(() => getRankImage(total), [total]);

  const handleSkillChange = (key: string, value: number) => {
    const clampedValue = Math.max(0, Math.min(MAX_SKILL, value));
    setSkills((prev) => ({ ...prev, [key]: clampedValue }));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Skill Calculator</h1>
        
        <div className="grid gap-6 md:grid-cols-[1fr,auto]">
          <Card className="border-border bg-card p-6">
            <div className="space-y-6">
              {SKILLS.map(({ key, label, name }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={key} className="text-sm font-medium text-foreground">
                      {label} ({name})
                    </Label>
                    <Input
                      id={key}
                      type="number"
                      min="0"
                      max={MAX_SKILL}
                      value={skills[key as keyof typeof skills]}
                      onChange={(e) => handleSkillChange(key, parseInt(e.target.value) || 0)}
                      className="w-20 border-border bg-input text-right text-foreground"
                    />
                  </div>
                  <Slider
                    value={[skills[key as keyof typeof skills]]}
                    onValueChange={([value]) => handleSkillChange(key, value)}
                    max={MAX_SKILL}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>{MAX_SKILL}</span>
                  </div>
                </div>
              ))}

              <div className="mt-8 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">Total:</span>
                  <span className="text-2xl font-bold text-foreground">{total}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="flex items-center justify-center border-border bg-card p-6">
            <div className="flex h-full min-h-[400px] w-[300px] items-center justify-center">
              {total > 0 ? (
                <img
                  src={rankImage}
                  alt="Rank"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <p className="text-center text-muted-foreground">
                  Adjust skills to see your rank
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
