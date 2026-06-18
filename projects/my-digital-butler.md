# MyDigitalButler — 個人用AIアシスタント / デジタル執事システム

> Google Cloud × Cloudflare で動く、生活・学習・健康・業務を能動的にサポートする個人用AIシステム。Obsidian（メモ帳アプリ）と深く統合し、複数のAIを束ねて毎日自動で動き続ける。

- **リポジトリ**: `MyDigitalButler_GCP`
- **稼働状況**: 2025年11月〜／本番稼働中
- **主インターフェース**: Slack Bot

---

## 概要

毎朝の挨拶からRSS（ニュースの自動購読）要約、ブックマーク整理、健康データ同期、支出レポート、そしてAIとの対話まで——日常を支える機能を**20以上の独立した小さなサービス**として実装し、決まった時刻に自律的に走らせている個人向けAIシステム。

設計の軸は3つ:

1. **機能ごとに独立したサーバーレス構成** — 各機能を小さな独立サービスに分割し、Go（定期ジョブ）とPython（AI・画像解析）を適材適所で使い分け
2. **複数AIの統一窓口** — Groq / Cerebras / Gemini を束ね、1つが止まっても別のAIへ自動で切り替えてサービスを止めない
3. **Obsidianメモ帳との循環** — Obsidian ⇄ GitHub ⇄ クラウドストレージ ⇄ データベースの多層同期で、生活ログと知識を永続化・再利用

---

## 主な機能

### 毎日動く（定期実行）
| 機能 | 時刻 | 内容 |
|------|------|------|
| デイリーチェックイン | 07:30 | 天気・カレンダー（祝日/給料日/月末判定）・前日振り返りを朝イチでSlack通知 |
| 気圧アラート | 毎時 | 気圧低下を検知し頭痛予防の通知 |
| 過去の今日 | 08:00 | 同じ日付の過去日記をリマインド |
| RSS処理 | 8:00 / 12:30 / 18:30 | 技術ブログを巡回→Gemini/Groqで要約→トップ記事をSlack＆Obsidianへ |
| GCPコスト報告 | 09:00 | BigQueryから前日のクラウド利用料を集計し通知 |
| 日次振り返り | 22:00 | Slackの会話ログをMarkdown日記に変換しObsidian/GitHubへ保存 |
| 支出レポート | 週次 | CSV支出データから予算管理＆アドバイス |

### AI自律機能
- **ナレッジグラフビルダー**（02:00）: Obsidianノートを分析しタグ・サマリーを自動付与
- **ブックマーク豊富化**（03:00）: Xブックマークを要約・分類、カテゴリ別MOC（Map of Contents）とnoteネタ帳を自動生成
- **ネタ収集**（05:00）: SerpAPI + Groq でAI/Web開発/スタートアップの話題を収集
- **シンセシス提案**: 新着ノートの関連性をCodex（Gemini）で検出し、GitHub Issueを自動起票

### ヘルスケア・運用
- Apple Watch / Oura Ring のデータ同期（歩数・睡眠・心拍）
- Cloud Run サービスの死活監視＆Slackアラート
- Obsidian vault の GitHub ミラーリング（毎晩23:00）

---

## 技術スタック

**コンピュート**
- Cloud Run（Go 1.21+ / Python 3.11+）
- Cloudflare Workers（TypeScript）← GCPから段階的に移行中

**LLM / AI**
- Groq `llama-3.1-8b-instant`（メイン・高速・無料枠大）
- Cerebras（レート制限時フォールバック）
- Gemini `3.1-flash-lite` / `pro`（RSS要約・RAG・画像解析）
- Cloudflare AI Gateway（複数AIをまとめる窓口）で、1つが止まっても別AIへ自動切替

**ストレージ**
- Cloud Storage（Obsidian Markdown / 画像 / ログ）
- Firestore（チャット履歴・既読管理・セッション）→ Cloudflare D1（SQLite）へ移行検証中
- BigQuery（GCP課金データ）
- Cloudflare R2（オブジェクトストレージ・移行先）

**IaC / 運用**
- Terraform（Cloud Run / GCS / Firestore / IAM をコード管理）
- GitHub Actions（定期実行・CI/CD）
- Wrangler（Cloudflare デプロイ）

**外部連携**: Slack Events API / Google Calendar API / GitHub API / SerpAPI / Secret Manager

---

## アーキテクチャ

```
functions/                 GCP Cloud Run マイクロサービス群
├── slack_event_handler/   [Python] メインSlack Bot・RAG
├── daily_checkin_go/      [Go] 朝の挨拶（カレンダー統合）
├── daily_reflection_go/   [Go] 日次振り返り（Slack→Markdown→GitHub）
├── process_rss_go/        [Go] RSS処理
├── knowledge_graph_builder/  [Python] ナレッジグラフ自動生成
├── bookmark_enricher/     [Python] Xブックマーク要約＆MOC生成
└── ...（計20以上）

cloudflare/                Cloudflare Workers 移行版（多くが本番稼働）
├── scheduler-worker/      per-minute cron で全ジョブの時刻を統合管理
├── daily-checkin/ daily-reflection/ weekly-report/ process-rss/ ...
└── MIGRATION_ROADMAP.md   GCP→CF 移行計画

IaC/                       Terraform 定義
agents/                    Claude Code 開発支援エージェント設定
scripts/                   運用・デプロイ・バックフィルスクリプト
```

### データフロー例（朝のフロー）
```
スケジューラ → daily-checkin
  ├─ Google Calendar API（祝日・予定）
  ├─ GCS（前日の日記要約）
  ├─ Firestore（健康サマリー）
  └─ Gemini（朝挨拶メッセージ生成）
        → Slack通知
  08:00 → 過去の今日 / RSS朝版 を順次配信
```

---

## 技術的な見どころ

- **GCPからCloudflareへ段階的に移行**: GCPの制限（定期実行ジョブ5個まで）とコストを改善するため、Cloudflare Workersへ少しずつ移行。データベースやストレージも「両方に書き込んで安全に検証」してから切り替える慎重な進め方
- **AIが止まらない仕組み**: 複数のAIプロバイダを直列に繋ぎ、1つが障害を起こしても次のAIが自動で引き継ぐ構成
- **運用コスト**: 全機能を月 **$2-6**（Cloudflare移行後はさらに削減見込み）で運用。各クラウドの無料枠を徹底活用
