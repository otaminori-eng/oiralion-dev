# oiralion-dev
このリポジトリはoiralionのプロフィールサイトのソースコードです。

## ディレクトリ構成

| パス         | 内容                         |
|:-----------|:---------------------------|
| frontend/  | 本体                         |
| infra/     | S3・CloudFront・ACM・Route 53 |
| bootstrap/ | GitHub Actions用のOIDCとロール   |
| e2e/       | E2Eテスト                     |

※掲載コンテンツは非公開リポジトリで管理

## 技術スタック

* フロントエンド
  * TypeScript
  * React
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

#### UT
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