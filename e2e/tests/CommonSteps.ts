import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { page } from "./support/browser";

export default class LayoutSteps {
  @Step("<path>を開く")
  public async gotoTopPage(path: string) {
    await page().goto(path);
  }

  @Step("metaタグの<name>に<content>が指定されている")
  public async shouldHaveMetaContent(name: string, content: string) {
    await expect(page().locator(`meta[name="${name}"]`)).toHaveAttribute(
      "content",
      content,
    );
  }
}
