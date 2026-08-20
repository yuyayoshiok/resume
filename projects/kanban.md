---
title: "Kanban"
icon: "board"
order: 1
subtitle: "ダッシュボード / カンバンWebアプリ"
desc: "Google Tasksと同期するカンバンボードに、複数のAIへ同じ問いを投げて回答をマージする「ディベートモード」を組み合わせた自分用のダッシュボード。"
tags:
  - "React"
  - "TypeScript"
  - "Vite"
  - "Node.js"
  - "Cloudflare"
  - "Gemini"
  - "Grok"
  - "GLM"
---

# Kanban — 毎日の起点になるダッシュボード

> タスク管理、複数AIとのチャット、支出管理、ラジオ再生、カレンダー連携をひとつにまとめた自分専用のWebアプリ。朝これを開けば一日が始まる、という状態を目指して作りました。

---

## 概要

タスクを「未着手・今日・明日・今週・完了」の列で管理するカンバンを中心に、日々の生活に必要な機能をまとめたダッシュボードです。

特徴は2つあります。

ひとつは Google Tasks と双方向に同期すること。もうひとつは、複数のAIに同じ質問を投げて回答を比べられる「ディベートモード」を持っていることです。

![ホーム画面](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/kanban-home.webp)

*ホーム画面。時計、検索、今日の名言、よく使うリンクをまとめている*

![カンバンボード](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/kanban-board.webp)

*タスク管理画面。期限切れ・今日・明日・7日以内・完了済みの列で管理し、ドラッグで移動できる*

---

## 主な機能

### カンバンボード

- Google Tasks と双方向同期。このアプリで作ったタスクはGoogle側にも反映され、その逆も反映される
- カードをドラッグして列を移動
- 開発タスクは GitHub Issues と連携

### AIチャット

- Gemini / Grok / GLM-4 の3種類に対応。画像を添付しての質問にも対応
- **ディベートモード**: 2つのAIへ同時に質問して回答を左右に並べ、良いと思った部分を選ぶと、3つ目のAIがそれらを統合して最終的な答えをまとめる

### その他

- **支出管理**: 家計データを月別・週別・カテゴリ別にグラフ表示
- **ラジオ再生**: x-yuya Radio で自動生成したポッドキャストを再生
- **カレンダー / 日記 / 天気 / RSS / Obsidianメモの閲覧**
- **季節の演出**: 桜・新緑・紅葉・雪のアニメーション
- **朝のあいさつ**: 毎朝7〜9時にモチベーションメッセージを表示

![ラジオ再生機能](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/radio-player.webp)

*x-yuya Radio で自動生成したポッドキャストを、このアプリ内のプレイヤーで再生する*

---

## 技術スタック

**フロントエンド**

- React 19 + TypeScript + Vite
- ドラッグ＆ドロップに dnd-kit、グラフに Recharts、地図に Leaflet

**バックエンド**

- Node.js + TypeScript / Express
- Cloudflare Workers（Hono）へ段階的に移行中

**インフラ**

- **Cloudflare Pages**: フロントエンドの配信
- **Vercel**: APIサーバー。Node.jsのライブラリが使いやすいため、複雑な処理はこちらに残している
- **Cloudflare R2**: 音声ファイルの保管
- **Cloudflare KV**: 設定と習慣データの保存

**連携サービス**: Google Tasks / Calendar / Gemini、OpenRouter、Zhipu AI、GitHub、Slack、Open-Meteo、Firebase

---

## アーキテクチャ

```
ユーザー
  │
  ▼
Cloudflare Pages（React）
  │  /api/* のリクエスト
  ▼
Vercel（APIサーバー・28エンドポイント）
  ├─ auth        Googleログイン認証
  ├─ kanban      Google Tasks 同期
  ├─ chat/debate/merge  複数AIチャット
  ├─ expenses/steps/badges  支出・歩数
  └─ calendar/obsidian/radio ...
        │
        ├─ Cloudflare Workers（移行中の機能）
        ├─ Cloudflare R2（音声）
        └─ Cloudflare KV（設定・習慣）
```

Vercel と Cloudflare を併用しているのは、Vercelはライブラリが豊富で複雑な処理を書きやすく、Cloudflareはエッジで動くぶん速くて安いからです。両方の利点を取りつつ、処理を少しずつ Cloudflare へ寄せています。

---

## 技術的な見どころ

- **フルスタックTypeScript**: フロントエンドからサーバー、インフラ設定まで一貫して開発
- **複数AIの並列制御**: 3つのAIを同時に呼び出して回答を比較・統合するディベート機能を実装
- **段階的なインフラ移行**: 処理を Vercel から Cloudflare のエッジへ順に移し、速度とコストを改善
- **自動化**: 家計の日次集計、型チェックからビルド・配信までの自動デプロイ
- **コスト最適化**: 各クラウドの無料枠を組み合わせ、ほぼ無料で運用

個人の生産性を上げるための身近なツールですが、認証・エッジコンピューティング・複数AIの統合など、規模の大きなサービスでも使う技術パターンを一通り実装しています。
