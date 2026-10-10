import { fireEvent, render, screen, within } from "@testing-library/react";
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

  test("今いるページのリンクにだけ aria-current が付く", () => {
    vi.mocked(usePathname).mockReturnValue("/skills/");
    render(<Navigation />);
    expect(screen.getByRole("link", { name: "skills" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "about" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  describe("スマホ幅のメニュー", () => {
    const openButton = () =>
      screen.getByRole("button", { name: "メニューを開く" });
    const menu = () => screen.queryByRole("list", { name: "メニュー" });

    test("最初は閉じている", () => {
      vi.mocked(usePathname).mockReturnValue("/about/");
      render(<Navigation />);
      expect(openButton()).toHaveAttribute("aria-expanded", "false");
      expect(menu()).not.toBeInTheDocument();
    });

    test("ボタンを押すと開き、各ページへのリンクと説明が表示される", () => {
      vi.mocked(usePathname).mockReturnValue("/about/");
      render(<Navigation />);
      fireEvent.click(openButton());

      expect(
        screen.getByRole("button", { name: "メニューを閉じる" }),
      ).toHaveAttribute("aria-expanded", "true");
      const opened = within(menu() as HTMLElement);
      expect(opened.getByRole("link", { name: /^career/ })).toHaveAttribute(
        "href",
        "/career",
      );
      expect(opened.getByText("これまでの経歴")).toBeInTheDocument();
    });

    test("メニューでも今いるページのリンクにだけ aria-current が付く", () => {
      vi.mocked(usePathname).mockReturnValue("/skills/");
      render(<Navigation />);
      fireEvent.click(openButton());
      const opened = within(menu() as HTMLElement);
      expect(opened.getByRole("link", { name: /^skills/ })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(opened.getByRole("link", { name: /^about/ })).not.toHaveAttribute(
        "aria-current",
      );
    });

    test("もう一度押すと閉じる", () => {
      vi.mocked(usePathname).mockReturnValue("/about/");
      render(<Navigation />);
      fireEvent.click(openButton());
      fireEvent.click(screen.getByRole("button", { name: "メニューを閉じる" }));
      expect(menu()).not.toBeInTheDocument();
    });

    test("Escキーで閉じて、ボタンにフォーカスが戻る", () => {
      vi.mocked(usePathname).mockReturnValue("/about/");
      render(<Navigation />);
      fireEvent.click(openButton());
      fireEvent.keyDown(document, { key: "Escape" });
      expect(menu()).not.toBeInTheDocument();
      expect(openButton()).toHaveFocus();
    });

    test("ページを移動すると閉じる", () => {
      vi.mocked(usePathname).mockReturnValue("/about/");
      const { rerender } = render(<Navigation />);
      fireEvent.click(openButton());
      vi.mocked(usePathname).mockReturnValue("/career/");
      rerender(<Navigation />);
      expect(menu()).not.toBeInTheDocument();
    });
  });
});
