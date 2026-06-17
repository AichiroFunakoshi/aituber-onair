# My App Workflow

このフォークは、`shinshin86/aituber-onair` を土台にして、
AichiroFunakoshi の macOS/iOS 向けAITuberアプリとして育てるための作業場所です。
最新の正本は常に GitHub 上の `AichiroFunakoshi/aituber-onair` に置きます。

## リポジトリ

- 自分のフォーク: <https://github.com/AichiroFunakoshi/aituber-onair>
- 上流: <https://github.com/shinshin86/aituber-onair>
- ローカル作業場所: `/Users/inaminetetsuo/Tuber/aituber-onair`
- `origin`: 自分のフォーク
- `upstream`: 上流リポジトリ

`upstream` は参照と取り込み用です。直接pushしません。

## 目標

1. 上流のAITuber基盤を保ちながら、自分用のアプリ境界を作る。
2. macOSとiOSでは、まずWeb/PWAとして使える状態を目指す。
3. 必要になった時点で、Capacitorなどによるアプリ包装を検討する。
4. 複数Macでは、GitHub上の `origin/main` を唯一の正本として扱う。

## 作業開始手順

各Macで作業を始める前に、必ず最新の `main` に合わせます。

```sh
cd /Users/inaminetetsuo/Tuber/aituber-onair
git switch main
git pull --ff-only origin main
git fetch upstream
git status --short --branch
```

新しい作業は短命ブランチで行います。

```sh
git switch -c codex/<task-name>
```

## 作業終了手順

影響範囲に応じて検証してから、変更をGitHubに送ります。

```sh
npm run fmt
npm run lint
npm run test
npm run build
git status --short
git add <changed-files>
git commit -m "<type>: <summary>"
git push origin codex/<task-name>
```

軽微な文書変更だけの場合は、コード検証を省略してよいです。その場合は最終報告に
「文書変更のみのためテスト未実行」と明記します。

## 上流追従

上流の変更を取り込む時は、先に自分の `main` を最新にします。

```sh
git switch main
git pull --ff-only origin main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
```

`--ff-only` で止まった場合は、履歴が分岐しています。原因を確認し、通常マージか
リベースを選びます。自動で `git reset --hard` は使いません。

## 自分のアプリとして分ける範囲

最初は共有パッケージを大きく書き換えません。まず自分用のアプリ境界を小さく作ります。

- アプリ名、キャラクター設定、LLM/TTSプロバイダを文書化する。
- APIキーや個人設定は `.env` に置き、Gitには入れない。
- 独自UIや設定は、専用の app/example 領域に集める。
- 上流パッケージの変更が必要な場合は、先に理由と影響範囲を明記する。

## macOS/iOS方針

初期方針はPWAです。理由は、上流のWeb/TypeScript資産を活かしやすく、
SafariでmacOS/iOS両方の挙動を早く確認できるためです。

初期検証では、以下を確認します。

- Safariで起動できる。
- マイク入力が使える。
- 音声再生がユーザー操作後に動く。
- LLM/TTS API通信が環境変数経由で動く。
- iOSでホーム画面追加またはWebアプリ化した時の表示が崩れない。

ネイティブ包装は、PWAでは足りない権限、配布、ファイル連携が必要になった時点で判断します。

## 差分確認

未コミット差分:

```sh
git status --short
git diff --stat
git diff
```

自分の作業ブランチと `origin/main` の差分:

```sh
git diff --stat origin/main...HEAD
git diff --name-only origin/main...HEAD
```

上流との差分:

```sh
git fetch upstream
git diff --stat upstream/main...HEAD
git diff --name-only upstream/main...HEAD
```

## 判断が必要な未決事項

- 最終アプリ名。
- 初期アバター方式: PNGTuber、VRM、Live2D。
- 初期LLMプロバイダ。
- 初期TTSプロバイダ。
- PWAだけで進めるか、Capacitor包装まで行うか。

