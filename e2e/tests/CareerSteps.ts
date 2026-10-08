import { expect, type Locator } from "@playwright/test";
import { Step } from "gauge-ts";
import { page } from "./support/browser";

function projectDetails(project: string): Locator {
  return page()
    .getByRole("main")
    .locator("details")
    .filter({ has: page().locator("summary", { hasText: project }) });
}

export default class CareerSteps {
  @Step("経歴の一覧が表示されている")
  public async shouldShowCareer() {
    await expect(
      page().getByRole("main").locator("details").first(),
    ).toBeVisible();
  }

  @Step("経歴<project>の詳細が表示されていない")
  public async shouldNotShowProjectDetail(project: string) {
    await expect(projectDetails(project)).toHaveJSProperty("open", false);
  }

  @Step("経歴<project>の詳細が表示されている")
  public async shouldShowProjectDetail(project: string) {
    await expect(projectDetails(project)).toHaveJSProperty("open", true);
  }

  @Step("経歴<project>をクリックする")
  public async clickProject(project: string) {
    await projectDetails(project).locator("summary").click();
  }
}
