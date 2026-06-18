# Tuber

`Tuber` は、AichiroFunakoshi の個人用 PNGTuber アプリです。
AITuber OnAir の PNGTuber テンプレートを土台にし、macOS/iOS Safari で
PWAとして使うことを初期方針にします。

## 開発

CIと合わせるため、Node 20を使います。

```sh
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm install
npm run tuber:dev
```

## ビルド

```sh
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm run tuber:build
```

## 初期仕様

- アバター方式: PNGTuber
- 配布方針: PWA
- 対象: macOS Safari / iOS Safari
- 設定保存: localStorage
- 秘密情報: リポジトリには保存しない
