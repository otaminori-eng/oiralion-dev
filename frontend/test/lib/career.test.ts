import { describe, expect, test } from "vitest";
import { getCareer } from "@/lib/career";

describe("getCareer", () => {
  test("経歴の案件が取得できる", async () => {
    const [first] = await getCareer();
    expect(first.name).toBe("ECサイトリニューアルプロジェクト");
    expect(first.jobRole).toContain("要件定義");
  });
});
