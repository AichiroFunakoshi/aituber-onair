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

### 2026-06-17: PNGTuberサンプルの最小検証

実行方針:

- 全workspaces一括ではなく、PNGTuberサンプルに必要な範囲だけ検証。
- npmの共有キャッシュ `~/.npm` は権限問題があったため使わない。
- 専用キャッシュ `/private/tmp/tuber-npm-cache` を使う。
- 重い処理は並列化しない。

最初に以下を実行したところ、`~/.npm` 配下のroot-ownedファイルにより失敗しました。

```sh
cd packages/core/examples/react-pngtuber-app
npm ci --no-audit --no-fund
```

再実行では専用キャッシュを指定し、依存インストールに成功しました。

```sh
npm ci --cache /private/tmp/tuber-npm-cache --no-audit --no-fund
```

PNGTuberサンプル単体のbuildは、ローカルworkspaceパッケージの `dist` が未作成だったため
一度失敗しました。必要パッケージのみ順番にbuildしてから再実行し、成功しました。

```sh
cd /Users/inaminetetsuo/Tuber/aituber-onair
npm run build --workspace @aituber-onair/chat
npm run build --workspace @aituber-onair/voice
npm run build --workspace @aituber-onair/manneri
npm run build --workspace @aituber-onair/comment-intelligence
npm run build --workspace @aituber-onair/core

cd packages/core/examples/react-pngtuber-app
npm run build
```

開発サーバーも短時間だけ起動し、HTTP応答を確認しました。

```sh
npm run dev -- --host 127.0.0.1
curl -I http://127.0.0.1:5173/
```

結果:

- `npm ci` 成功。
- 必要workspaceパッケージのbuild成功。
- `react-pngtuber-app` のproduction build成功。
- Vite dev server は `http://127.0.0.1:5173/` で起動。
- `curl -I` で `HTTP/1.1 200 OK` を確認。
- ブラウザ実機確認は未実行。

補足:

- `/usr/bin/time -l` は、このサンドボックスでは `sysctl kern.clockrate: Operation not permitted`
  により終了コード1になることがあるため、npmコマンド自体の成否とは分けて扱う。
- `node_modules` と `dist` はignore対象で、リポジトリにはコミットしない。

### 2026-06-17: 全workspaces検証

ユーザー指示により、全workspacesの標準検証を実行しました。

```sh
npm run fmt
npm run lint
npm run test
npm run build
```

初回の `npm run test` では、Node 25 / npm 11 環境で次のテストが失敗しました。

- `@aituber-onair/noise`: `LocalStorageNoiseMemoryStore` のテストがランタイム提供の
  `globalThis.localStorage` 形状に依存していた。
- `@aituber-onair/voice`: `OpenAiEngine` のテストが `Response.blob().arrayBuffer()` の
  実装差分に依存していた。

対応:

- `packages/noise/tests/memoryStores.test.ts` で、明示的なStorage fakeを渡すようにした。
- `packages/voice/tests/OpenAiEngine.test.ts` で、テスト対象が必要とする
  `blob().arrayBuffer()` だけを持つfetch response mockにした。

再実行結果:

- `npm run fmt`: 成功。
- `npm run lint`: 成功。
- `npm run test`: 成功。
- `npm run build`: 成功。
