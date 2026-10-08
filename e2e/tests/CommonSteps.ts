import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { page } from "./support/browser";

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
    const expected = path.endsWith("/") ? path : `${path}/`;
    await expect.poll(() => new URL(page().url()).pathname).toBe(expected);
  }

  @Step("本文に<text>が表示されている")
  public async shouldShowTextInHeader(text: string) {
    await expect(page().getByRole("main").getByText(text)).toBeVisible();
  }
}
