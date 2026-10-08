import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { describe, expect, test, vi } from "vitest";
import Navigation from "@/components/Navigation";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

describe("Navigation", () => {
  test("トップページでは表示されない", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(<Navigation />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  test("トップページ以外では各ページへのリンクが表示される", () => {
    vi.mocked(usePathname).mockReturnValue("/about/");
    render(<Navigation />);
    const navigation = screen.getByRole("navigation");
    expect(navigation).toContainElement(
      screen.getByRole("link", { name: "skills" }),
    );
    expect(screen.getByRole("link", { name: "career" })).toHaveAttribute(
      "href",
      "/career",
    );
  });
});
