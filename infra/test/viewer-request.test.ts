import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

type QueryString = Record<
  string,
  { value: string; multiValue?: { value: string }[] }
>;

type Request = {
  uri: string;
  headers: { host?: { value: string } };
  querystring: QueryString;
};

type Response = {
  statusCode: number;
  headers: { location: { value: string } };
};

// CloudFront Functions は export できないので、ファイルを読んで handler を取り出す
const code = readFileSync(
  path.join(import.meta.dirname, "../functions/viewer-request.js"),
  "utf-8",
);
const handler = new Function(`${code}\nreturn handler;`)() as (event: {
  request: Request;
}) => Request | Response;

const run = (uri: string, host = "oiralion.dev", querystring = {}) =>
  handler({
    request: { uri, headers: { host: { value: host } }, querystring },
  });

describe("viewer-request", () => {
  test("wwwはapexドメインへ301でリダイレクトする（パスとクエリは引き継ぐ）", () => {
    const response = run("/about/", "www.oiralion.dev", {
      ref: { value: "agent" },
    }) as Response;
    expect(response.statusCode).toBe(301);
    expect(response.headers.location.value).toBe(
      "https://oiralion.dev/about/?ref=agent",
    );
  });

  test("末尾が/のパスはindex.htmlを読む", () => {
    expect((run("/about/") as Request).uri).toBe("/about/index.html");
    expect((run("/") as Request).uri).toBe("/index.html");
  });

  test("拡張子のないパスは末尾に/を付けたパスへ301でリダイレクトする", () => {
    const response = run("/about") as Response;
    expect(response.statusCode).toBe(301);
    expect(response.headers.location.value).toBe("/about/");
  });

  test("リダイレクトでクエリを引き継ぐ", () => {
    const response = run("/about", "oiralion.dev", {
      ref: { value: "agent" },
    }) as Response;
    expect(response.headers.location.value).toBe("/about/?ref=agent");
  });

  test("拡張子のあるパスはそのまま読む", () => {
    expect((run("/_next/static/chunks/main.js") as Request).uri).toBe(
      "/_next/static/chunks/main.js",
    );
    expect((run("/404.html") as Request).uri).toBe("/404.html");
  });
});
