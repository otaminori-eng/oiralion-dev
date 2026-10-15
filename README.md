# oiralion-dev
このリポジトリはoiralionのプロフィールサイト（[oiralion.dev](https://oiralion.dev)）のソースコードです。

## ディレクトリ構成

| パス                      | 内容                              |
|:------------------------|:--------------------------------|
| frontend/               | 本体                              |
| frontend/content-sample/ | サンプルコンテンツ                       |
| infra/                  | S3・CloudFront・ACM・Route 53      |
| infra/functions/        | CloudFront Functions            |
| bootstrap/              | GitHubActions用のOIDCとロール         |
| e2e/                    | E2Eテスト                          |

※掲載コンテンツは非公開リポジトリで管理

## 技術スタック

* フロントエンド
  * TypeScript
  * React
  * Next.js
  * Tailwind CSS
* テスト
  * Vitest
  * Gauge + Playwright
* インフラ
  * AWS
  * Terraform
* CI/CD
  * GitHub Actions
* 開発ツール
  * [mise](https://mise.jdx.dev/)
  * [pnpm](https://pnpm.io/)
  * [biome](https://biomejs.dev/ja/)
  * [lefthook](https://lefthook.dev/)
  * [gitleaks](https://github.com/gitleaks/gitleaks)
  * [actionlint](https://github.com/rhysd/actionlint)
  * [Trivy](https://trivy.dev/)

## セットアップ

1. miseで管理しているツールをインストールする
    ```shell
    mise install
    ```
2. 依存ライブラリをインストールする
    ```shell
    pnpm install
    ```
3. Git hooksを登録する
    ```shell
    lefthook install
    ```

## ローカル起動

```shell
pnpm --filter frontend dev
```

http://localhost:3000 で確認できる。

### コンテンツ

表示するコンテンツは環境変数で切り替える。

| 環境変数 | 内容 |
|:--|:--|
| CONTENT_DIR | コンテンツのディレクトリ。未指定の場合は `frontend/content-sample` を読む |
| APP_ENV | `prd` のときは CONTENT_DIR の指定が必須（サンプルのまま公開しないため） |

実際のコンテンツで確認する場合は、非公開リポジトリのパスを指定して起動する。

```shell
CONTENT_DIR=<コンテンツのパス> pnpm --filter frontend dev
```

## テスト

UTはVitest、E2EはGauge + Playwrightで実施している。
ローカル環境で実施する場合はfrontendを起動した状態で実行する。 結果は `e2e/reports/html-report/index.html` に出力される。

### テスト環境

E2E実行のためにGaugeプラグインとPlaywrightのブラウザをインストールする。

```shell
cd e2e && gauge install
pnpm --filter e2e exec playwright install chromium
```

### テスト実行

#### 静的解析・型チェック
```shell
pnpm check
pnpm --filter frontend typecheck
```

#### UT
frontend と infra（CloudFront Functions）のUTをまとめて実行する。
```shell
pnpm test
```

#### E2E
```shell
pnpm e2e
```
E2Eの接続先やブラウザは `e2e/env/default/default.properties` に定義している。

| 項目 | 内容 | 初期値 |
|:--|:--|:--|
| BASE_URL | テスト対象のURL | http://localhost:3000 |
| BROWSER | chromium / firefox / webkit（Safari系） | chromium |
| HEADLESS | true にするとブラウザ画面を表示せずに実行 | false |

ブラウザをwebkit, firefoxで実施する場合は別途ブラウザのインストールが必要。

## デプロイ

リポジトリのルートで実行する。

1. インフラを反映する
    ```shell
    terraform -chdir=infra plan -out=tfplan
    terraform -chdir=infra apply tfplan
    ```
2. 実際のコンテンツでビルドする（`frontend/out` に出力される）
    ```shell
    CONTENT_DIR=<コンテンツのパス> APP_ENV=prd pnpm --filter frontend build
    ```
3. S3に配置し、CloudFrontのキャッシュを削除する
    ```shell
    aws s3 sync frontend/out "s3://$(terraform -chdir=infra output -raw site_bucket_name)" --delete
    aws cloudfront create-invalidation \
      --distribution-id "$(terraform -chdir=infra output -raw cloudfront_distribution_id)" \
      --paths "/*"
    ```
