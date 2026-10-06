---
title: "AIバーチャルオフィス"
icon: "bot"
order: 1.5
subtitle: "AI社員が部署として働く司令室（Kanbanのオフィスタブ）"
desc: "秘書部・編集部・開発部などのAI社員が働く様子を3Dのオフィスで見ながら、依頼と最終的な承認は人間が行うエージェント基盤。Cloudflare の Durable Object と手元PCの runner で動かしています。"
tags:
  - "React"
  - "TypeScript"
  - "Vite"
  - "Cloudflare"
  - "Durable Objects"
  - "WebSocket"
  - "Codex"
---

# AIバーチャルオフィス — 仕事はAI社員に任せて、決めるところは自分で決める

> Kanban の「オフィス」タブとして作っているAIエージェントの司令室です（2026年10月時点で開発中）。

---

## 概要

秘書部、編集部、デザイン部、開発部などの部署をAIエージェントとして動かし、稼働状況をオフィスの画面で見られるようにしています。自分は「社長」の立場で、チャットから部署に仕事を頼み、上がってきた提案や成果物を確認して決めます。

方針は「提案はAI、決裁は人間」です。外部への公開、送信、マージ、課金は、必ず人間の承認を通します。

![3Dオフィスの全景](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/ai-office-overview.webp)

*3Dテーマの全景。部署ごとの席があり、作業中・待機中・退勤中などの状態がキャラクターの動きと吹き出しで分かる。画面はダミーデータで動く開発用プレビュー*

オフィスの見た目は、ピクセル、室内、3Dから選べます。描画は Canvas で自作しています。

---

## 主な機能

### 判断待ちの一覧

巡回の提案、計画の確認待ち、質問への回答待ち、PRの確認待ちを「あなたの判断待ち」にまとめて表示します。件数は社長の机にも出ます。

![判断待ちの一覧と社長の机の件数](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/ai-office-approval.webp)

*判断待ちが4件ある状態。AIの提案や計画は、ここで人間が確認してから次の工程に進む*

### 社内チャット

チャンネル、スレッド、リアクション、ピン、検索を備えた社内チャットです。`@部署名` を付けて仕事を依頼できます。AIがチャンネルの新設を提案し、「作る」「いらない」で人間が決める流れも入れています。

![社内チャット](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/ai-office-chat.webp)

*チャンネル一覧と、AIによるチャンネル新設の提案。AIが作ったチャンネルには「AI」の表示が付く*

### 部署の仕事

- 編集部・X運用部・Instagram運用部は、Skill を読んで文章や画像を作ります。成果物はホワイトボード（週カレンダー）で、採用・却下・投稿済みなどの状態を管理します。投稿は人が行います
- 編集部とX運用部の最終成果物は、[yomiyasu](https://github.com/nanaism/yomiyasu) の原則で推敲してから保存します
- 開発部は、リポジトリの巡回、改善提案、計画の確認、実装、PR作成までを担当します

---

## 設計で気をつけたこと

- **外から届いた文章は「資料」であって「命令」ではない**: メールや投稿を読む社員には、行動の権限を与えません
- **暴走させない**: 部署ごとに1日の実行回数に上限があり、夜間は自動では動きません。同じ部署の仕事は同時に1つまでで、10分たっても返事のない仕事は失敗として扱います
- **手元PCが止まっても仕事を止めない**: runner が切断されたときは、Codex cloud に切り替えます
- **認証を1本にまとめる**: ブラウザは hub の認証トークンを持たず、API 側（requireAuth）を経由します
- **読める範囲を許可リストで絞る**: Vault を読む仕事は、許可したフォルダの中だけです
- **Skill とモデルを差し替えられる**: 部署が使う Skill は設定の名前を変えるだけで入れ替えられ、コードは変えません

---

## アーキテクチャ

```
ブラウザ（React・5秒ごとにポーリング）
  │
  ▼
Cloudflare Pages ── /api ──▶ Vercel（Express・認証）
                                │  hub のトークンを付けて中継
                                ▼
                    DevHub（Cloudflare Durable Object + SQLite）
                      タスク・案件・成果物を保存
                         ▲                       │ 手元PCが止まっているとき
          外向きの WebSocket                      ▼
                         │                  Codex cloud
              手元PCの runner
                └─ Codex App Server が作業を実行
```

手元PCからは hub へ外向きに WebSocket を張るだけなので、PC側でポートを開ける必要はありません。ブラウザへの配信をポーリングにしているのは、Cloudflare Pages の `/api` プロキシが WebSocket の接続を通せないためです。

---

## 技術スタック

- **画面**: React 19 + TypeScript + Vite、Canvas による自作の描画（ピクセル・室内・3D）
- **hub**: Cloudflare Workers の Durable Object と SQLite
- **runner**: 手元PCで動く Node.js（TypeScript）。Codex App Server で作業を実行
- **API**: Vercel 上の Express。認証を1か所にまとめている
- **開発の進め方**: 要件定義、実装計画、引き継ぎ資料を `docs` に書いてから作る。hub と runner にはテストを書いている。ログイン不要でダミーデータの画面を確認できる開発用プレビューを用意している

個人のダッシュボードの一部として作り始めましたが、「AIにどこまで任せ、どこで人間が止めるか」を設計する題材として、日々使いながら改善しています。
