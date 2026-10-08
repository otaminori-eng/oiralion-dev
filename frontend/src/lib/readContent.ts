import { readFile } from "node:fs/promises";
import path from "node:path";

function resolveContentDir(): string {
  const contentDir = process.env.CONTENT_DIR;
  if (contentDir) {
    return contentDir;
  }
  if (process.env.APP_ENV === "prd") {
    throw new Error("CONTENT_DIRがない");
  }
  return "content-sample";
}

export async function readContent<T>(fileName: string): Promise<T> {
  const file = path.join(
    path.resolve(process.cwd(), resolveContentDir()),
    fileName,
  );
  return JSON.parse(await readFile(file, "utf-8"));
}
