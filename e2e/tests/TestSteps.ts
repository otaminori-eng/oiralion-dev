import { expect } from "@playwright/test";
import { Step } from "gauge-ts";
import { page } from "./support/browser";

export default class TestSteps {
	@Step("トップページを開く")
	public async gotoTopPage() {
		await page().goto("/");
	}

	@Step("<text>が表示されている")
	public async shouldBeVisible(text: string) {
		await expect(page().getByText(text)).toBeVisible();
	}
}
