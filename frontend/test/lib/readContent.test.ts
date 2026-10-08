import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { readContent } from "@/lib/readContent";

describe("readContent", () => {
  let root: string;

  beforeEach(async () => {
    root = await mkdtemp(path.join(tmpdir(), "read-content-"));
    vi.stubEnv("CONTENT_DIR", root);
  });

  afterEach(async () => {
    vi.unstubAllEnvs();
    await rm(root, { recursive: true, force: true });
  });

  test("CONTENT_DIRにある指定したJSONファイルを読んで返す", async () => {
    await writeFile(
      path.join(root, "test.json"),
      JSON.stringify({ name: "テスト", items: [1, 2] }),
    );
    expect(await readContent("test.json")).toEqual({
      name: "テスト",
      items: [1, 2],
    });
  });

  test("ファイルがないときはエラーになる", async () => {
    await expect(readContent("missing.json")).rejects.toThrow();
  });
});
