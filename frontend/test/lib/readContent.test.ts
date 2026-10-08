import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
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
    vi.restoreAllMocks();
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

  test("本番でCONTENT_DIRがないときはエラーになる", async () => {
    vi.stubEnv("APP_ENV", "prd");
    vi.stubEnv("CONTENT_DIR", undefined);
    await expect(readContent("test.json")).rejects.toThrow("CONTENT_DIR");
  });

  test("本番以外でCONTENT_DIRがないときはcontent-sampleを読む", async () => {
    vi.stubEnv("CONTENT_DIR", undefined);
    vi.spyOn(process, "cwd").mockReturnValue(root);
    await mkdir(path.join(root, "content-sample"));
    await writeFile(
      path.join(root, "content-sample", "test.json"),
      JSON.stringify({ name: "サンプル" }),
    );
    expect(await readContent("test.json")).toEqual({ name: "サンプル" });
  });
});
