import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AboutPage from "@/app/about/page";
import { getProfile } from "@/lib/profile";

vi.mock("@/lib/profile", () => ({ getProfile: vi.fn() }));

describe("AboutPage", () => {
  test("プロフィールの各項目が見出しと対応して表示される", async () => {
    vi.mocked(getProfile).mockResolvedValue({
      location: "拠点の値",
      workingConditions: "稼働条件の値",
      availability: "開始時期の値",
      role: "担当業務の値",
      value: "ひとことの値",
    });
    render(await AboutPage());

    expect(screen.getAllByRole("row").map((row) => row.textContent)).toEqual([
      "拠点拠点の値",
      "稼働条件稼働条件の値",
      "開始時期開始時期の値",
      "担当業務担当業務の値",
      "ひとことひとことの値",
    ]);
  });
});
