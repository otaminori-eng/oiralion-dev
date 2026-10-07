import {
	type Browser,
	type BrowserContext,
	chromium,
	firefox,
	type Page,
	webkit,
} from "@playwright/test";

const browserTypes = { chromium, firefox, webkit };
let browser: Browser | undefined;
let context: BrowserContext | undefined;
let current: Page | undefined;

export async function launchBrowser(): Promise<void> {
	const name = (process.env.BROWSER ?? "chromium") as keyof typeof browserTypes;
	browser = await browserTypes[name].launch({
		headless: process.env.HEADLESS !== "false",
	});
}

export async function openNewPage(): Promise<void> {
	if (!browser) throw new Error("ブラウザが起動していません");
	// シナリオごとに新しい context＝Cookie・localStorage が空の状態から始める
	context = await browser.newContext({ baseURL: process.env.BASE_URL });
	current = await context.newPage();
}

export async function closePage(): Promise<void> {
	await context?.close();
}

export async function closeBrowser(): Promise<void> {
	await browser?.close();
}

export function page(): Page {
	if (!current) throw new Error("ページが開かれていません");
	return current;
}
