import { expect, test } from "vitest";
import { sample } from "../src/sample";

test("渡された数字が足されること", () => {
	const result = sample(3, 6);
	expect(result).toBe(9);
});
