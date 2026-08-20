---
title: "MyDigitalButler"
icon: "bot"
order: 2
subtitle: "個人AIアシスタント基盤"
desc: "20以上の機能を持つ個人用AIアシスタント。毎朝の挨拶、RSS要約、ブックマーク整理、健康データ同期などをSlack Bot経由で自律的に実行。"
tags:
  - "Go"
  - "Python"
  - "TypeScript"
  - "GCP"
  - "Cloudflare Workers"
  - "Terraform"
  - "Gemini"
  - "Groq"
---

# MyDigitalButler — 個人用AIアシスタント

> Google Cloud と Cloudflare で動く個人用のAIシステム。Obsidianと統合し、複数のAIを束ねて毎日自動で動き続けています。

- **稼働状況**: 2025年11月〜／継続運用中
- **主インターフェース**: Slack Bot

---

## 概要

毎朝の挨拶、RSS要約、ブックマーク整理、健康データ同期、AIとの対話。日常を支える機能を **20以上の独立した小さなサービス** に分けて実装し、決まった時刻に自動で走らせています。

設計の軸は3つあります。

1. **機能ごとに独立したサーバーレス構成** — 各機能を小さなサービスに分割し、定期ジョブはGo、AI処理や画像解析はPythonと使い分けています
2. **複数AIの統一窓口** — Groq と Gemini を束ね、ひとつが止まっても別のAIへ自動で切り替わります
3. **Obsidianとの循環** — Obsidian ⇄ GitHub ⇄ ストレージ ⇄ データベースの多層同期で、生活ログと知識を残しています

---

## 主な機能

### 毎日動くもの

| 機能 | 時刻 | 内容 |
|------|------|------|
| デイリーチェックイン | 07:30 | 天気・カレンダー・前日の振り返りを朝イチでSlackへ通知 |
| 気圧アラート | 毎時 | 気圧の低下を検知して頭痛予防の通知 |
| 過去の今日 | 08:00 | 同じ日付の過去日記をリマインド |
| RSS処理 | 8:00 / 12:30 / 18:30 | 技術ブログを巡回して要約し、Slack と Obsidian へ |
| 日次振り返り | 22:00 | Slackの会話ログをMarkdownの日記に変換して保存 |

![RSS要約のSlack通知](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/butler-rss.webp)

*巡回した技術ブログをAIが要約し、重要度を10段階でスコアリングしてSlackへ通知する*

### AIによる自律処理

- **ナレッジグラフ生成**: Obsidianのノートを分析してタグとサマリーを新たに自動付与
- **ブックマーク整理**: Xのブックマークを要約・分類し、カテゴリ別のインデックスを自動生成
![Slackでの対話](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/butler-slack.webp)

*Slackから話しかけると、その日の記録を整理して返す。用途に応じてモードが切り替わる*

### ヘルスケア・運用

- Apple Watch / Oura Ring のデータ同期（歩数・睡眠・心拍）
- Cloud Run サービスの死活監視とSlackアラート
- Obsidian vault の GitHub ミラーリング（毎晩23:00）

---

## 技術スタック

**実行環境**

- Cloud Run（Go / Python）
- Cloudflare Workers（TypeScript）へ段階的に移行中

**LLM / AI**

- Groq `llama-3.1-8b-instant` — メイン。高速で無料枠が大きい
- Gemini `3.1-flash-lite` / `pro` — RSS要約、RAG、画像解析
- Cloudflare AI Gateway で複数AIをまとめ、障害時に自動で切り替え

**ストレージ**

- Cloud Storage — Obsidianのファイル、画像、ログ
- Firestore — チャット履歴、既読管理、セッション。Cloudflare D1 へ移行を検証中
- BigQuery — クラウド課金データの集計
- Cloudflare R2 — 移行先のファイル保管

**IaC / 運用**

- Terraform でインフラをコード管理
- GitHub Actions で定期実行とCI/CD
- Wrangler で Cloudflare へデプロイ

**外部連携**: Slack Events API / Google Calendar API / GitHub API / SerpAPI / Secret Manager

---

## アーキテクチャ

```
functions/                 GCP Cloud Run マイクロサービス群
├── slack_event_handler/   [Python] メインSlack Bot・RAG
├── daily_checkin_go/      [Go] 朝の挨拶
├── daily_reflection_go/   [Go] 日次振り返り
├── process_rss_go/        [Go] RSS処理
├── knowledge_graph_builder/  [Python] ナレッジグラフ生成
├── bookmark_enricher/     [Python] ブックマーク要約
└── ...（計20以上）

cloudflare/                Cloudflare Workers 移行版
├── scheduler-worker/      cron で全ジョブの時刻を統合管理
├── daily-checkin/ daily-reflection/ weekly-report/ process-rss/ ...
└── MIGRATION_ROADMAP.md   移行計画

IaC/                       Terraform 定義
agents/                    Claude Code 開発支援エージェント設定
scripts/                   運用・デプロイ用スクリプト
```

### 朝のデータフロー

```
スケジューラ → daily-checkin
  ├─ Google Calendar API（祝日・予定）
  ├─ GCS（前日の日記要約）
  ├─ Firestore（健康サマリー）
  └─ Gemini（挨拶メッセージ生成）
        → Slack通知
  08:00 → 過去の今日 / RSS朝版 を順次配信
```

---

## 技術的な見どころ

- **GCPからCloudflareへの段階的な移行**: 定期実行ジョブの上限とコストを改善するため、Cloudflare Workers へ順に移行。
- **AIが止まらない仕組み**: 複数のAIプロバイダを直列に繋ぎ、障害が起きても次のAIが引き継ぐ構成
- **運用コスト**: 全機能を月 **$2〜6** で運用。各クラウドの無料枠を組み合わせています
