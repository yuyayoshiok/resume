# Y.Yuya

**AIエージェントを実務で運用設計できるフルスタックエンジニア**

複数のLLM（Claude / Gemini / Groq）を役割分担させたエージェント基盤を設計・本番運用。  
GCPサーバーレス + Terraform でクラウドインフラを自分で組み、個人プロダクトを継続稼働させています。

---

## 基本情報

| | |
|---|---|
| 居住地 | 島根県|
| 稼働 | 週3~5日 |
| 連絡先 | yuyayoshiok@gmail.com |
| GitHub | [github.com/yuyayoshiok](https://github.com/yuyayoshiok) |

---

## 強みの2本柱

### 1. AIエージェント運用設計
「作って終わり」ではなく、**定時で自律稼働して人間がレビューする仕組み**まで設計・運用できます。

- 複数LLMの役割分担オーケストレーション（Claude / Gemini / Groq / Codex）
- GitHub Actions による定時エージェント稼働
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
| **AI / LLM** | Claude / Gemini / Groq / Whisper |
| **クラウド** | AWS / GCP |
| **IaC / CI** | Terraform / GitHub Actions / Docker |
| **バックエンド** | FastAPI / Flask / Node.js |
| **フロントエンド** | Next.js / React / TypeScript |
| **DB** | PostgreSQL / SQLite / Firestore |
| **自動化** | cron / Playwright / AppleScript |
| **資格** | AWS認定クラウドプラクティショナー（2025年）/ JDLA G検定（2025年）|

---

## 職務経歴

### BPO企業（契約社員）+ J-AI（個人事業主・フリーランス） 2023年9月〜現在
**社内自動化・AI化支援エンジニア**

BPO企業での短時間勤務と並行して、個人事業主（屋号：J-AI）としてのフリーランス活動を開始。契約社員として社内AI化を推進しながら、業務委託先でも開発実績を積む。

**BPO企業での実績（社内向け）**

| ツール名 | 技術 | 概要・成果 |
|---|---|---|
| 在庫管理検索ツール | Power Automate | 検索・参照フローを自動化。検索時間を大幅短縮 |
| シフト表自動作成ツール | GAS | 複雑な条件考慮のシフト組みを自動化 |
| 工数管理チェックツール | GAS | CSVから不正値・異常値を自動検出 |
| VoC分析ツール | Python | 顧客の声を自動分析・集計するツールを設計・実装 |

- 生成AI（Claude Code / ChatGPT / Gemini）を用いたシステム開発フローの構築・整備

**J-AI（フリーランス）での実績（業務委託）**

| ツール名 | 技術 | 概要・成果 |
|---|---|---|
| 営業事務管理ツール | GAS + Firebase | 業務データを一元管理。整合性確保と随時更新を実現 |
| テキスト差分検出ツール | Python | ドキュメント変更箇所を自動抽出。チェック業務を大幅効率化 |
| 社内申請ツール | Python | 申請処理ロジック実装・承認フローの通知自動化（Chatwork連携） |

### IT企業（派遣） 2022年3月〜2022年12月
**一般事務・業務処理**

- VBAマクロを用いた定型業務の自動化による工数削減
- 業務改善提案によるチーム全体の効率向上
- 手順に沿った正確なオペレーションとマニュアル整備

### BPO企業（アルバイト→正社員） 2015年4月〜2021年5月
**データ入力・処理**

- アルバイトから能力を評価され正社員に登用
- 正確かつ高速な入力スキルによりチームの生産性向上に貢献
- 入力業務の効率化提案を継続的に実施

---

## 自己PR

**「自分が困るから作る」が原動力**

吃音というハンディキャップを抱えながら、データ入力オペレーターとして社会人キャリアをスタートしました。電話対応が苦手な分、正確さとスピードで誰よりも貢献しようとする中で、「この作業、自動化できるのでは？」という視点が芽生え、独学でプログラミングを習得。

「自分が楽になるために作る」という動機は今も変わらず、その延長線上に個人プロダクト（AIアシスタント / 株式分析システム / 音声入力ツール）が生まれています。自分が課題の当事者であるため、実用性へのこだわりが強く、作ったものを実際に日常・業務で使い続けるのが特徴です。

**AIを「使う」ではなく「運用設計する」**

生成AI登場時にいち早く業務活用を探求し、ChatGPT・Gemini・Claude Code・Groqなど複数のLLMを使い分けてきました。現在は「作って終わり」ではなく、**複数のAIエージェントを役割分担させ、定時で自律稼働し、人間がレビューする仕組み**を設計・運用しています。

たとえば、毎朝自動でラジオ音声を生成するエージェント、AIが株の売買判断をしてそのロジックをDBに強制記録するシステム、Slackから天気・予定・ヘルスデータを統合通知する個人AIアシスタントなど、単なるAPIラッパーではない実用的なエージェント基盤を自分で設計・本番運用しています。

**独学→実務→フリーランスの自走力**

資格（AWS / G検定）取得にとどまらず、GCP・Terraform・Docker・CI/CDを個人プロダクトで実際に運用。「まず動くものを作って、現場に持ち込む」サイクルを繰り返すことで、新技術を素早く実戦投入できる適応力を培ってきました。

契約社員として組織内でAI化を推進しながら、フリーランス（J-AI）として並行して業務委託案件にも対応。組織の中でも外でも自走できるエンジニアです。

---

## 希望条件

| | |
|---|---|
| 働き方 | フルリモート |
| 単価 | 応相談 |
| 得意領域 | AI/LLM活用・Python バックエンド・GCP クラウド |
| 興味ある案件 | LLMエージェント開発 / データパイプライン / サーバーレスアーキテクチャ |
