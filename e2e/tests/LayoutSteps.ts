import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { page } from "./support/browser";
import { expectPath } from "./support/navigation";

export default class LayoutSteps {
  @Step("ヘッダーに<text>が表示されている")
  public async shouldShowTextInHeader(text: string) {
    await expect(page().getByRole("banner").getByText(text)).toBeVisible();
  }

  @Step("フッターに<text>が表示されている")
  public async shouldShowTextInFooter(text: string) {
    await expect(page().getByRole("contentinfo").getByText(text)).toBeVisible();
  }

  // getByRole は非表示の要素を対象にしないので、CSS で隠している場合も 0 件になる
  @Step("ナビゲーションが表示されない")
  public async shouldNotShowNavigation() {
    await expect(page().getByRole("navigation")).toHaveCount(0);
  }

  @Step("ナビゲーションから<link>をクリックすると<path>に遷移する")
  public async goToPathWithNavigation(link: string, path: string) {
    await page()
      .getByRole("navigation")
      .getByRole("link", { name: link, exact: true })
      .click();
    await expectPath(path);
  }
}
