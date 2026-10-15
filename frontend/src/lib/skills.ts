import { readContent } from "./readContent";

export type SkillUsage = "frequent" | "regular";

type SkillItem = {
  name: string;
  usage?: SkillUsage;
};

type Skill = {
  category: string;
  items: SkillItem[];
};

export type Skills = Skill[];

export async function getSkills(): Promise<Skills> {
  return readContent<Skills>("skills.json");
}
