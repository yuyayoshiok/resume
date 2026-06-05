# 吉岡 裕也 — Yuya Yoshioka

**AIエージェントを実務で運用設計できるフルスタックエンジニア**

複数のLLM（Claude / Gemini / Groq）を役割分担させたエージェント基盤を設計・本番運用。  
GCPサーバーレス + Terraform でクラウドインフラを自分で組み、個人プロダクトを継続稼働させています。

---

## 基本情報

| | |
|---|---|
| 居住地 | 島根県（フルリモート希望） |
| 稼働 | 週5日・フルタイム |
| 連絡先 | yuyayoshiok@gmail.com |
| GitHub | [github.com/yuyayoshiok](https://github.com/yuyayoshiok) |

---

## 強みの2本柱

### 1. AIエージェント運用設計
「作って終わり」ではなく、**定時で自律稼働して人間がレビューする仕組み**まで設計・運用できます。

- 複数LLMの役割分担オーケストレーション（Claude / Gemini / Groq / Codex）
- launchd / GitHub Actions による定時エージェント稼働
- 意思決定ログのDB強制記録（ブラックボックス化しないAI設計）
- Slack / LINE をインターフェースとした通知・対話フロー

### 2. クラウド本番運用（GCP中心）
個人プロダクトをGCPサーバーレスで本番運用。インフラをコードで管理し、障害対応の経験もあります。

- GCP: Cloud Run / Cloud Functions / Cloud Scheduler / Firestore / GCS / BigQuery
- IaC: Terraform
- CI/CD: GitHub Actions
- コンテナ: Docker
- バックエンド: Python（FastAPI / Flask）・Go
- フロントエンド: Next.js / React / TypeScript

---

## 代表プロジェクト

### MyDigitalButler — 個人AIアシスタント基盤
> GCP上に構築した、自分専用のAIプラットフォーム

- Slackをインターフェースに、日次レビュー・RSS要約・ヘルスデータ監視・コスト集計などを自動化
- Python + Go のマイクロサービス十数個を Cloud Run / Cloud Scheduler で束ねる構成
- Terraform でインフラをコード管理。378ファイル・145コミットの継続運用中プロダクト
- **技術**: GCP / Terraform / Python / Go / Slack Bot / Gemini / Groq / Firestore / Docker

---

### kabuself — AIエージェント意思決定監査システム
> Claude Codeが自律的にペーパートレードする実験システム

- AIの売買判断を**DB強制記録**することで、意思決定をブラックボックスにしない設計
- FastAPI バックエンド + Next.js ダッシュボードで判断ログを可視化
- launchd で自動稼働、decision_today.json を毎日更新して継続稼働中
- **技術**: Python / FastAPI / SQLAlchemy / SQLite / Next.js / yfinance / launchd

---

### ai-audio — 音声入力デスクトップツール（実使用中）
> ホットキー押下で録音→Whisper文字起こし→Gemini整形→クリップボードに流す

- 吃音配慮のプロンプト設計。macOSのtray常駐アプリとして日常使用中
- **技術**: Python / Groq Whisper / Gemini / sounddevice / pynput / pystray / keyring

---

## その他のプロジェクト（抜粋）

| プロジェクト | 概要 | 技術 |
|---|---|---|
| x-yuya | Claude/Geminiエージェントが毎朝X記事＋ラジオ音声を自動生成 | Claude / Gemini / VOICEBOX / Cloudflare |
| Kanban | Google Tasks連携・LLMチャット搭載の自分専用ダッシュボード | React / TypeScript / Vercel / Cloudflare |
| youtube-importer | YouTubeを監視し新着を文字起こし→要約→Obsidianへ自動保存 | Python / GitHub Actions / Groq Whisper |
| obsidian-slack-sync | SlackメッセージをObsidianに自動同期するOSSプラグイン | JavaScript / Obsidian Plugin API |
| eufy-autoexport | 体組成計の非公式APIをリバースエンジニアリングして自動エクスポート | Python / GitHub Actions |

---

## スキルセット

| カテゴリ | 技術 |
|---|---|
| **言語** | Python ★★★ / TypeScript ★★ / Go ★ / Swift ★ |
| **AI / LLM** | Claude / Gemini / Groq / Whisper / MCP / エージェント設計 |
| **クラウド** | GCP（Cloud Run / Functions / Scheduler / Firestore / GCS）|
| **IaC / CI** | Terraform / GitHub Actions / Docker |
| **バックエンド** | FastAPI / Flask / Node.js / Express |
| **フロントエンド** | Next.js / React / Vite / TypeScript |
| **DB** | PostgreSQL / SQLite / Firestore / DuckDB / Elasticsearch |
| **自動化** | launchd / cron / Playwright / AppleScript |
| **資格** | AWS認定クラウドプラクティショナー（2025年）/ JDLA G検定（2025年）|

---

## 職務経歴

### SCSKサービスウェア株式会社（契約社員） 2023年9月〜現在
社内自動化・AI化支援エンジニアとして、業務プロセスの見直しと自動化ツールの企画・開発を担当。
- GAS + Firebase を連携させた営業事務管理ツールを構築
- テキスト差分検出ツールの開発によりチェック業務を大幅効率化
- 生成AIの社内導入支援・活用レクチャーを主導
- GitHubを用いたシステム開発フローの構築・整備

### 株式会社パソナ（派遣：株式会社テクノプロジェクト） 2022年3月〜2022年12月
一般事務・VBAマクロによる定型業務自動化。業務改善提案でチーム全体の効率を向上。

### 株式会社コプロシステム 2015年4月〜2021年5月
データ入力・処理。アルバイトから能力を評価され正社員に登用。

---

## 希望条件

| | |
|---|---|
| 働き方 | フルリモート |
| 単価 | 月50万〜（応相談） |
| 得意領域 | AI/LLM活用・Python バックエンド・GCP クラウド |
| 興味ある案件 | LLMエージェント開発 / データパイプライン / サーバーレスアーキテクチャ |
