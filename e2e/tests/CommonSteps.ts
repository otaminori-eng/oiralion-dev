import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { page } from "./support/browser";
import { expectPath } from "./support/navigation";

export default class CommonSteps {
  @Step("<path>を開く")
  public async gotoPage(path: string) {
    await page().goto(path);
  }

  @Step("metaタグの<name>に<content>が指定されている")
  public async shouldHaveMetaContent(name: string, content: string) {
    await expect(page().locator(`meta[name="${name}"]`)).toHaveAttribute(
      "content",
      content,
    );
  }

  @Step("<link>をクリックすると<path>に遷移する")
  public async goToPathWithLink(link: string, path: string) {
    await page().getByRole("link", { name: link }).click();
    await expectPath(path);
  }

  @Step("本文に<text>が表示されている")
  public async shouldShowTextInHeader(text: string) {
    await expect(page().getByRole("main").getByText(text)).toBeVisible();
  }
}
