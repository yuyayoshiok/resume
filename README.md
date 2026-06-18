# Y.Yuya

**LLM統合・業務自動化が得意なPythonバックエンドエンジニア**

業務自動化・生成AI活用を軸に3年以上の開発経験。
BPO企業で月20万件のVoC分析を自動化し、個人開発では20以上の機能を持つAIアシスタント基盤を設計・本番運用中。

> ポートフォリオサイト: [yuyayoshiok.github.io/resume](https://yuyayoshiok.github.io/resume/)

「自分が直面する課題をテクノロジーで解決する」を原動力に、複数のLLM（Claude / Gemini / Groq）を役割分担させた自律型エージェント基盤を設計・本番運用しています。

AWSやGCPのサーバーレスインフラを Terraform でコード管理し、バックエンド開発からコンテナ化（Docker）、CI/CD（GitHub Actions）の構築、フロントエンド（React/Next.js）までを一人で一貫して構築。

「作って終わり」にせず、開発したシステムを日々実稼働させて継続的にアップデートし続ける自走力が強みです。


---

## 基本情報

| | |
|---|---|
| 居住地 | 島根県|
| GitHub | [github.com/yuyayoshiok](https://github.com/yuyayoshiok) |

---

## 強みの2本柱

### 1. AIエージェント運用設計
「作って終わり」ではなく、**定時で自律稼働して人間がレビューする仕組み**まで設計・運用できます。

- 複数LLMの役割分担オーケストレーション（Claude / Gemini / Groq / Codex）
- GitHub Actions による定時エージェント稼働
- Slack / LINE をインターフェースとした通知・対話フロー

### 2. クラウド本番運用（GCP中心）
個人プロダクトをGCPサーバーレスで本番運用。
- AWS: Lambda / S3 / CloudWatch / EventBridge
- GCP: Cloud Run / Cloud Functions / Cloud Scheduler / Firestore / GCS / BigQuery
- Cloudflare: Workers / R2 / D1 / AI Gateway
- IaC: Terraform
- CI/CD: GitHub Actions
- コンテナ: Docker(orbstack)
- バックエンド: Python（FastAPI / Flask）・Go
- フロントエンド: Next.js / React / TypeScript

---

## 代表プロジェクト

### [MyDigitalButler](projects/my-digital-butler.md) — 個人AIアシスタント基盤
> GCP上に構築した、自分専用のAIプラットフォーム

- Slackをインターフェースに、日次レビュー・RSS要約・ヘルスデータ監視・コスト集計などを自動化
- Python + Go のマイクロサービス十数個を Cloud Run / Cloud Scheduler で束ねる構成（現在CloudFlareに移管中）
- Terraform でインフラをコード管理。378ファイル・145コミットの継続運用中プロダクト
- **技術**: GCP / Terraform / Python / Go / Slack Bot / Gemini / Groq / Firestore / Docker / Cloudflare

---

### [kabuself](projects/kabuself.md) — AIエージェント意思決定監査システム
> Claude Codeが自律的にペーパートレードする実験システム

- AIの売買判断を**DB強制記録**することで、意思決定をブラックボックスにしない設計
- FastAPI バックエンド + Next.js ダッシュボードで判断ログを可視化
- launchd で自動稼働、decision_today.json を毎日更新して継続稼働中
- **技術**: Python / SQLite / Next.js / yfinance / Claude Code

---

### [ai-audio](projects/ai-audio.md) — 音声入力デスクトップツール（実使用中）
> ホットキー押下で録音→Whisper文字起こし→Gemini整形→クリップボードに流す

- 吃音配慮のプロンプト設計。
- **技術**: Python / Groq Whisper / Gemini
- 参考：https://pody.jp/player/ngpcDWPy6otqtyr7XYmx/gdfr60bU6m6Jtpq2jyQv
---

## その他のプロジェクト（抜粋）

| プロジェクト | 概要 | 技術 |
|---|---|---|
| [x-yuya Radio](projects/x-yuya-radio.md) | Codex/AivisSpeechが毎朝ラジオ音声を自動生成 | Codex / AivisSpeech / Cloudflare |
| [Kanban](projects/kanban.md) | Google Tasks連携・LLMチャット搭載の自分専用ダッシュボード | React / TypeScript / Cloudflare |
| [youtube-importer](projects/youtube-importer.md) | YouTubeを監視し新着を文字起こし→要約→Obsidianへ自動保存 | Python / GitHub Actions / Groq Whisper |
| [x-bookmark-enricher](projects/x-bookmark-enricher.md) | XブックマークをAIで要約・タグ付けしObsidian Vaultへインポート | TypeScript / Groq / Playwright |

---

## スキルセット

| カテゴリ | 技術 |
|---|---|
| **言語** | Python / Go / TypeScript |
| **AI / LLM** | Claude / Gemini / Groq / Whisper |
| **クラウド** | AWS / GCP / Cloudflare |
| **IaC / CI** | Terraform / GitHub Actions / Docker |
| **バックエンド** | FastAPI / Flask / Node.js |
| **フロントエンド** | Next.js / React / TypeScript |
| **DB** | SQLite / Firestore |
| **資格** | AWS認定クラウドプラクティショナー（2025年）/ JDLA G検定（2025年）|

### 経験年数
| 領域 | 年数 |
|---|---|
| 業務自動化・社内DX | 3年以上 |
| 生成AI / LLM活用 | 3年程度 |
| Python | 2年以上 |
| GAS / VBA | 3年以上 |
| GCP / Cloudflare | 1〜2年 |
| TypeScript / React | 1年以上 |

※ 実務では業務自動化・生成AI活用、個人開発ではAIエージェント基盤・クラウド運用を中心に継続しています。

---

## 職務経歴

### BPO企業（会社員）+ J-AI（個人事業主・フリーランス） 2023年9月〜現在（業務委託先は2025年10月で契約終了）
**社内自動化・AI化支援エンジニア**

BPO企業での短時間勤務と並行して、個人事業主（屋号：J-AI）としてのフリーランス活動を開始。会社員として社内AI化を推進しながら、業務委託先でも開発実績を積む。

2025年10月からは業務委託先を終了し、会社員としてフルコミット。VoC分析ツールの開発などを行った。

**BPO企業での実績（社内向け）**

| ツール名 | 技術 | 概要・成果 |
|---|---|---|
| 在庫管理検索ツール | Power Automate | 検索・参照フローを自動化。手作業の検索時間を大幅短縮 |
| シフト表自動作成ツール | GAS | スタッフの希望条件から自動生成。シフト作成時間を月2時間→10分に短縮 |
| 工数管理チェックツール | GAS | 作業ログの入力漏れ・異常値を自動検出。検出率95%以上、チェック時間を1/5に削減 |
| [VoC分析ツール](site/src/content/projects/voc-analyzer.md) | VBA + Azure OpenAI | 月20万件の顧客の声を生成AIで自動分析。約200人月→1-2名運用に圧縮、8-9台の並列分散処理 |


- AI（Claude Code / ChatGPT / Gemini）を用いたシステム開発フローの構築・整備
- 制限された環境の中での業務改善提案によるチーム全体の効率向上

**J-AI（フリーランス）での実績（業務委託）**

| ツール名 | 技術 | 概要・成果 |
|---|---|---|
| 営業事務管理ツール | GAS + Firebase | 散在していた業務データを一元化。整合性チェックの自動化で入力ミスを削減 |
| メール配信ツール | GAS | Google Alerts/プレスリリースのRSSを自動取得・蓄積し、選択した記事をテンプレート差し込みで一括メール配信。送信フォームUI付き |
| 12タイプ別資質診断 | GAS | 生年月日から運命数を算出し12タイプ別の性格診断を表示するWebアプリ。外部サイトへのiframe埋め込みに対応 |
| テキスト差分検出ツール | Python | ドキュメントの変更箇所を自動抽出。人手で数時間かかっていたチェック業務を数分に短縮 |
| 社内申請ツール | Python (Flask) | 申請→承認フローを可視化し、Chatwork連携で関係者へ即時通知。承認プロセスの所要時間を約50%短縮 |
| ECサイト改修 | PHP | 既存ECサイトの機能改修・保守対応 |

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

吃音があり、口頭コミュニケーションよりもテキストで力を発揮するタイプです。

この特性がデータ入力→VBA自動化→AI活用というキャリアの一貫した方向性を生みました。

電話対応が苦手な分、正確さとスピードで誰よりも貢献しようとする中で、「この作業、自動化できるのでは？」という視点が芽生え、独学でプログラミングを習得。

「自分が楽になるために作る」という動機は今も変わらず、その延長線上に個人プロダクト（AIアシスタント / 株式分析システム / 音声入力ツール）が生まれています。

自分が課題の当事者であるため、実用性へのこだわりが強く、作ったものを日常的に使い続けるのが特徴です。たとえば、自作のAIアシスタントは、日々の出来事をSlack経由で整理してObsidianへ自動蓄積する「ジャーナリングの仕組み」として完全に生活の一部になっています。

**AIを「使う」ではなく「運用設計する」**

生成AI登場時にいち早く業務活用を探求し、ChatGPT・Gemini・Claude Code・Groqなど複数のLLMを使い分けてきました。

現在は「作って終わり」ではなく、**複数のAIエージェントを役割分担させ、定時で自律稼働し、人間がレビューする仕組み**を設計・運用しています。

エージェントを安定稼働させるため、最近ではエラー検知した際にAI（Codex）が自動修復を試みる自己修復ループの実装にも取り組んでいます。

また、エージェントのプロンプト設計では、機械的な対話ではなく「タメ口（親しみやすい口調）」を指定することで、より柔軟で自然なアウトプットを引き出す工夫を凝らしています。

単なるAPIラッパーではない、実用的なエージェント運用基盤を一人で設計・本番運用しています。

**制約を突破する実装力と、コストをシビアに見据える自走力**

資格（AWS / G検定）取得にとどまらず、GCP・Terraform・Docker・CI/CDを個人プロダクトで実際に運用。「まず動くものを作って、現場に持ち込む」サイクルを繰り返してきました。

この「手元にある手段でやり切る執念」は実務でも活きています。

たとえばBPO企業では、PythonやGoなどの並行処理が使えない制限されたローカル環境の中、生成AIと壁打ちしながらVBAで排他処理などを力技で実装し、月20万件の顧客の声（VoC）を分析するツールを完成させました。

また、個人開発のインフラを安価で運用するためにGCPからCloudflare（Workers / R2 / D1 / AI Gateway）へ移行を進めるなど、コストと運用性をシビアに見極めた技術選定ができるのも強みです。

---

## 希望条件

| | |
|---|---|
| 働き方 | フルリモート（可能であればフルフレックス） |
| 稼働 | 週3~5日 |
| 単価 | 応相談 |
| 得意領域 | AI/LLM活用 / Python バックエンド |
| 興味ある案件 | LLMエージェント開発 / データパイプライン / サーバーレスアーキテクチャ |
