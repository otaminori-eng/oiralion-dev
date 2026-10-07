import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Footer from "@/components/Footer";

test("フッターにコピーライトが表示される", () => {
	render(<Footer />);
	expect(screen.getByRole("contentinfo")).toHaveTextContent("© 2026 otami");
});
