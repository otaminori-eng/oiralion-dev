import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Tag from "@/components/ui/Tag";

describe("Tag", () => {
  test("使用頻度の指定がないときは基本のタグになる", () => {
    render(<Tag>Kotlin</Tag>);
    expect(screen.getByText("Kotlin")).toHaveClass("tag", { exact: true });
  });

  test.each(["frequent", "regular"] as const)(
    "使用頻度が%sのときは使用頻度のクラスが付く",
    (usage) => {
      render(<Tag usage={usage}>Kotlin</Tag>);
      expect(screen.getByText("Kotlin")).toHaveClass(`tag tag-${usage}`, {
        exact: true,
      });
    },
  );
});
