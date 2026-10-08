import { readContent } from "./readContent";

export type Profile = {
  name: string;
  location: string;
  days: string;
  startFrom: string;
  role: string;
  value: string;
};

export async function getProfile(): Promise<Profile> {
  return readContent<Profile>("profile.json");
}
