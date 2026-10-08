import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readContent<T>(fileName: string): Promise<T> {
  const contentDir = path.resolve(
    process.cwd(),
    process.env.CONTENT_DIR ?? "content-sample",
  );
  const file = path.join(contentDir, fileName);
  return JSON.parse(await readFile(file, "utf-8"));
}
