import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Header from "@/components/Header";

test("ヘッダーにサイト名が表示される", () => {
  render(<Header />);
  expect(screen.getByRole("banner")).toHaveTextContent("otami");
});
