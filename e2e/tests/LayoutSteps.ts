import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { page } from "./support/browser";

export default class LayoutSteps {
  @Step("ヘッダーに<text>が表示されている")
  public async shouldShowTextInHeader(text: string) {
    await expect(page().getByRole("banner").getByText(text)).toBeVisible();
  }

  @Step("フッターに<text>が表示されている")
  public async shouldShowTextInFooter(text: string) {
    await expect(page().getByRole("contentinfo").getByText(text)).toBeVisible();
  }
}
