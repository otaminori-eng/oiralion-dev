# oiralion-dev
このリポジトリはoiralionのプロフィールサイトのソースコードです。

## ディレクトリ構成

| パス        | 内容 |
|:----------|:---|
| frontend/ | 本体 |

※掲載コンテンツは非公開リポジトリで管理

## 技術スタック

* フロントエンド
  * TypeScript
  * React
* テスト
* インフラ
  * AWS
  * terraform
* CI/CD
  * Github Actions
* 開発ツール
  * [mise](https://mise.jdx.dev/)
  * [pnpm](https://pnpm.io/)
  * [biome](https://biomejs.dev/ja/)
  * [lefthook](https://lefthook.dev/)
  * [gitleaks](https://github.com/gitleaks/gitleaks)

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