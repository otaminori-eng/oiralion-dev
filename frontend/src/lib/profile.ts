import { readContent } from "./readContent";

export type Profile = {
  name: string;
  location: string;
  workingConditions: string;
  availability: string;
  role: string;
  value: string;
};

export async function getProfile(): Promise<Profile> {
  return readContent<Profile>("profile.json");
}
