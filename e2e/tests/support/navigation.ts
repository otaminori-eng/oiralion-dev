import { expect } from "@playwright/test";
import { page } from "./browser";

// trailingSlash: true のため、遷移先は "/career/" のように末尾に / が付く
export async function expectPath(path: string): Promise<void> {
  const expected = path.endsWith("/") ? path : `${path}/`;
  await expect.poll(() => new URL(page().url()).pathname).toBe(expected);
}
