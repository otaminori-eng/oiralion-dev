import path from "node:path";
import {
	AfterScenario,
	AfterSuite,
	BeforeScenario,
	BeforeSuite,
	CustomScreenshotWriter,
} from "gauge-ts";
import {
	closeBrowser,
	closePage,
	launchBrowser,
	openNewPage,
	page,
} from "./support/browser";

export default class Hooks {
	@BeforeSuite() public async beforeSuite() {
		await launchBrowser();
	}
	@BeforeScenario() public async beforeScenario() {
		await openNewPage();
	}
	@AfterScenario() public async afterScenario() {
		await closePage();
	}
	@AfterSuite() public async afterSuite() {
		await closeBrowser();
	}

	// 失敗時に Gauge が呼ぶ。Playwright で撮った画像をレポートに載せる
	@CustomScreenshotWriter()
	public screenshot(): string {
		const file = path.join(
			process.env.gauge_screenshots_dir ?? ".",
			`screenshot-${Date.now()}.png`,
		);
		// gauge-ts は Promise も受け付けるが、型定義が string のみなので型を合わせている
		return page()
			.screenshot({ path: file, fullPage: true })
			.then(() => path.basename(file)) as unknown as string;
	}
}
