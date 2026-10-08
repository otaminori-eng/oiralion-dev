import { readContent } from "./readContent";

export type Profile = {
  location: string;
  workingConditions: string;
  availability: string;
  role: string;
  value: string;
};

export async function getProfile(): Promise<Profile> {
  return readContent<Profile>("profile.json");
}
