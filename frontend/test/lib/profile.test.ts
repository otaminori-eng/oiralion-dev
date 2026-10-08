import { describe, expect, test } from "vitest";
import { getProfile } from "@/lib/profile";

describe("getProfile", () => {
  test("プロフィールが取得できる", async () => {
    const profile = await getProfile();
    expect(profile).toEqual({
      location: "サンプル県",
      days: "週3日",
      startFrom: "9999年1月〜",
      role: "バックエンド・フロントエンド",
      value: "猫2匹と暮らしています",
    });
  });
});
