# Local Development

この文書は、AichiroFunakoshi のフォークを複数Macで安全に動かすための
ローカル開発メモです。

## 現在確認した環境

- 確認日: 2026-06-17
- Mac: MacBook Air
- メモリ: 8 GB
- ローカルパス: `/Users/inaminetetsuo/Tuber/aituber-onair`
- Node: `v25.9.0`
- npm: `11.12.1`

上流の `AGENTS.md` ではCIが Node 20 で動く前提になっています。実装検証では、
可能なら Node 20 LTS を使います。Node 25 での失敗は、コードの問題ではなく
ランタイム差分の可能性があります。

## MacBook Airでの負荷対策

このMacは8GBメモリのため、全workspacesの `install`、`build`、`test` を連続で
走らせるとCodex/ChatGPTアプリが固まる、またはmacOSから終了される可能性があります。

作業時は次を優先します。

- 重いコマンドは1つずつ実行する。
- `npm install` と `npm run build --workspaces` を並列実行しない。
- まず対象パッケージや対象サンプルだけを検証する。
- ブラウザ確認は、開いている不要なアプリを減らしてから行う。
- 空きディスクが少ない時は、`node_modules` やビルド成果物が増える前に確認する。

## 初期セットアップ候補

ルート全体を触る前に、まずPNGTubeサンプルだけで起動確認します。

```sh
cd /Users/inaminetetsuo/Tuber/aituber-onair/packages/core/examples/react-pngtuber-app
npm install
npm run dev
```

動作確認後、必要に応じてルートで依存関係と全体検証を行います。

```sh
cd /Users/inaminetetsuo/Tuber/aituber-onair
npm install
npm run fmt
npm run lint
npm run test
npm run build
```

## 環境変数

APIキーや個人設定はGitに入れません。必要になったら、サンプルごとに
`.env.local` を作成します。

想定する値:

```sh
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
OPENAI_TTS_API_KEY=
```

実際に必要なキーは、選ぶLLM/TTSプロバイダに合わせて最小限にします。

## 検証記録

まだ依存インストール、ビルド、テストは実行していません。理由は、先に
MacBook Air上でCodex/ChatGPTアプリの強制終了・ハング傾向を確認したためです。
初回の重い検証は、対象サンプルを絞って実行します。

