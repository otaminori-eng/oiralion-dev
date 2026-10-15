import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  test("存在しないパスはトップページへすぐ移動する", () => {
    render(<NotFound />);

    const refresh = document.querySelector('meta[http-equiv="refresh"]');
    expect(refresh).toHaveAttribute("content", "0;url=/");
  });
});
