import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SkillsPage from "@/app/skills/page";
import { getSkills } from "@/lib/skills";

vi.mock("@/lib/skills", () => ({ getSkills: vi.fn() }));

describe("SkillsPage", () => {
  test("スキルがないときは作成中と表示される", async () => {
    vi.mocked(getSkills).mockResolvedValue([]);
    render(await SkillsPage());
    expect(screen.getByText("作成中")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("カテゴリごとに見出しとスキルが表示される", async () => {
    vi.mocked(getSkills).mockResolvedValue([
      {
        category: "カテゴリA",
        items: [{ name: "スキル1" }, { name: "スキル2" }],
      },
      { category: "カテゴリB", items: [{ name: "スキル3" }] },
    ]);
    render(await SkillsPage());

    expect(screen.queryByText("作成中")).not.toBeInTheDocument();
    const sectionOf = (category: string) => {
      const section = screen
        .getByRole("heading", { name: category })
        .closest("section");
      if (!section) throw new Error(`${category} のsectionがない`);
      return within(section);
    };
    expect(
      sectionOf("カテゴリA")
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(["スキル1", "スキル2"]);
    expect(
      sectionOf("カテゴリB")
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(["スキル3"]);
  });
});
