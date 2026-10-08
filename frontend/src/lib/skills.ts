import { readContent } from "./readContent";

type SkillItem = {
  name: string;
};

type Skill = {
  category: string;
  items: SkillItem[];
};

export type Skills = Skill[];

export async function getSkills(): Promise<Skills> {
  return readContent<Skills>("skills.json");
}
