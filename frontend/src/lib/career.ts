import { readContent } from "./readContent";

type Project = {
  name: string;
  summary: string;
  startAt: string;
  endAt: string;
  team: string;
  jobRole: string;
  description: string;
  techStack: string;
};

export type Career = Project[];

export async function getCareer(): Promise<Career> {
  return readContent<Career>("career.json");
}
