import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { expect, test, vi } from "vitest";
import Header from "@/components/Header";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

test("ヘッダーにサイト名が表示される", () => {
  vi.mocked(usePathname).mockReturnValue("/");
  render(<Header />);
  expect(screen.getByRole("banner")).toHaveTextContent("otami");
});
