import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import CareerPage from "@/app/career/page";
import { type Career, getCareer } from "@/lib/career";

vi.mock("@/lib/career", () => ({ getCareer: vi.fn() }));

const project: Career[number] = {
  name: "案件A",
  summary: "バックエンド・PHP",
  startAt: "2025年4月",
  endAt: "2026年3月",
  team: "BE 5名",
  jobRole: "設計、開発",
  description: "1行目\n2行目",
  techStack: "PHP/Laravel",
};

describe("CareerPage", () => {
  test("経歴がないときは作成中と表示される", async () => {
    vi.mocked(getCareer).mockResolvedValue([]);
    render(await CareerPage());
    expect(screen.getByText("作成中")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("案件ごとに期間・名前・概要が表示され、詳細は閉じている", async () => {
    vi.mocked(getCareer).mockResolvedValue([
      project,
      { ...project, name: "案件B", startAt: "2024年1月", endAt: "2025年3月" },
    ]);
    render(await CareerPage());

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "案件A" })).toBeInTheDocument();
    expect(screen.getByText("2024年1月〜2025年3月")).toBeInTheDocument();
    for (const details of screen.getAllByRole("group")) {
      expect(details).not.toHaveAttribute("open");
    }
  });

  test("詳細にチーム・担当業務・説明・使った技術が含まれる", async () => {
    vi.mocked(getCareer).mockResolvedValue([project]);
    render(await CareerPage());
    const details = screen.getByRole("group");
    expect(details).toHaveTextContent("BE 5名");
    expect(details).toHaveTextContent("設計、開発");
    expect(details).toHaveTextContent("1行目");
    expect(details).toHaveTextContent("PHP/Laravel");
  });
});
