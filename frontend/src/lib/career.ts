import { readContent } from "./readContent";

type ProjectResponse = {
  name: string;
  summary: string;
  startAt: string;
  endAt: string;
  team: string;
  jobRole: string;
  description: string;
  techStack: string;
};

export type Project = Omit<ProjectResponse, "startAt" | "endAt"> & {
  startAt: Date;
  endAt: Date;
};

export type Career = Project[];

export function parseYearMonth(value: string): Date {
  const match = value.match(/^(\d{4})(\d{2})$/);
  const month = Number(match?.[2]);
  if (!match || month < 1 || month > 12) {
    throw new Error(`年月はyyyyMM形式で指定してください: ${value}`);
  }
  return new Date(Number(match[1]), month - 1, 1);
}

export async function getCareer(): Promise<Career> {
  const response = await readContent<ProjectResponse[]>("career.json");
  return response.map((project) => ({
    ...project,
    startAt: parseYearMonth(project.startAt),
    endAt: parseYearMonth(project.endAt),
  }));
}
