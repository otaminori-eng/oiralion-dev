import { describe, expect, test, vi } from "vitest";
import { getCareer, parseYearMonth } from "@/lib/career";
import { readContent } from "@/lib/readContent";

vi.mock("@/lib/readContent", () => ({ readContent: vi.fn() }));

describe("parseYearMonth", () => {
  test("yyyyMMをその月の1日の日付にする", () => {
    expect(parseYearMonth("202504")).toEqual(new Date(2025, 3, 1));
  });

  test.each(["2025年4月", "2025-04", "20254", "202513", "202500"])(
    "yyyyMM形式でない値（%s）はエラーになる",
    (value) => {
      expect(() => parseYearMonth(value)).toThrow();
    },
  );
});

describe("getCareer", () => {
  test("概要と、開始年月・終了年月を日付にした案件を返す", async () => {
    vi.mocked(readContent).mockResolvedValue({
      summary: "経歴の概要",
      projects: [
        {
          name: "案件A",
          summary: "バックエンド・PHP",
          startAt: "202504",
          endAt: "202603",
          team: "BE 5名",
          jobRole: "設計、開発",
          description: "説明",
          techStack: "PHP/Laravel",
        },
      ],
    });
    const career = await getCareer();
    expect(career.summary).toBe("経歴の概要");
    const [project] = career.projects;
    expect(project.name).toBe("案件A");
    expect(project.startAt).toEqual(new Date(2025, 3, 1));
    expect(project.endAt).toEqual(new Date(2026, 2, 1));
  });
});
