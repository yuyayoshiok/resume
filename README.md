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

### apple-health-mcp-server — OSSコントリビュート
> Apple Health データをLLMから自然言語で照会できるMCPサーバー

- DuckDB / Elasticsearch / ClickHouse のマルチDBバックエンド対応
- [glama.io](https://glama.io) に掲載済み。Docker / CI / ドキュメント完備でOSS水準のコード品質
- **技術**: Python / FastMCP / DuckDB / Elasticsearch / Docker / GitHub Actions

---

### ai-audio — 音声入力デスクトップツール（実使用中）
> ホットキー押下で録音→Whisper文字起こし→Gemini整形→クリップボードに流す

- 吃音配慮の「長押し不要」設計。macOSのtray常駐アプリとして日常使用中
- **技術**: Python / Groq Whisper / Gemini / sounddevice / pynput / pystray / keyring

---

## その他のプロジェクト（抜粋）

| プロジェクト | 概要 | 技術 |
|---|---|---|
| x-yuya | Claude/Geminiエージェントが毎朝X記事＋ラジオ音声を自動生成 | Claude / Gemini / VOICEBOX / Cloudflare |
| Kanban | マルチLLMディベートチャット + Google Tasks 連携カンバン | React / TypeScript / Vercel / Cloudflare |
| youtube-importer | YouTubeを監視し新着を文字起こし→要約→Obsidianへ自動保存 | Python / GitHub Actions / Groq Whisper |
| ios-meishi（つながり） | 名刺撮影→Gemini OCRで構造化、人脈の「温度」管理iOSアプリ | Swift / SwiftUI / CloudKit / Gemini |
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
| **資格** | G検定 / AWS Cloud Practitioner |

---

## 職務経歴

### J-AI（個人事業主） 2023年8月〜現在
業務委託でPython / GAS / VBAによる業務自動化ツールを開発。  
VoC（顧客の声）分析ツールをゼロから設計・実装し、分析工数を大幅削減。

### BPO企業（契約社員） 2023年9月〜現在
業務支援エンジニアとして社内自動化を担当。ChatGPTを用いた業務改善のPoCを主導。

### IT企業（派遣） 2022年4月〜2022年12月
運用保守チームのプロジェクト進行補助。システム開発環境の整備補助。

---

## 希望条件

| | |
|---|---|
| 働き方 | フルリモート |
| 単価 | 月50万〜（応相談） |
| 得意領域 | AI/LLM活用・Python バックエンド・GCP クラウド |
| 興味ある案件 | LLMエージェント開発 / データパイプライン / サーバーレスアーキテクチャ |
