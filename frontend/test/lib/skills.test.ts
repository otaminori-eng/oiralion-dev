import { describe, expect, test } from "vitest";
import { getSkills } from "@/lib/skills";

describe("getSkills", () => {
  test("スキルがカテゴリごとに取得できる", async () => {
    const [first] = await getSkills();
    expect(first.category).toBe("バックエンド");
    expect(first.items).toContainEqual({ name: "PHP" });
  });
});
