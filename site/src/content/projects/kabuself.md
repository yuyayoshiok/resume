---
title: "kabuself"
emoji: "📈"
order: 3
desc: "AIが自律的に株式投資できるかを検証するペーパートレード実験基盤。判断の論拠を先に記録しないと発注できないAPI制約で意思決定を可視化。"
subtitle: "仮想資金100万円。売買より「なぜそう判断したか」を記録・観察することが主役。"
tags: ["FastAPI", "Python", "Next.js", "React", "SQLite", "yfinance"]
---

# kabuself — AIが自律的に株式投資する実験基盤

> 「Claude Code は自律的に株式投資できるか？」を検証する**ペーパートレード・シミュレータ**。仮想資金100万円で、AIが銘柄選定から発注まで完結させる。売買そのものより、**「なぜそう判断したのか」を記録・観察する**ことを主役に据えた設計。

- **性格**: リアルマネー一切なし。学習・実験専用の前向きN=1エクスペリメント

---

## 概要

このプロジェクトの核は `/trades`（売買）ではなく `/decisions`（判断）テーブル。

> **論拠（thesis）を先に記録しないと、APIが発注を受け付けない（HTTP 422）。**

という制約を技術的に強制することで、衝動的な売買を防ぎ、後から「あのとき何を見て決めたのか」を完全に再現できる。判断時点の市場データ（株価・為替・企業業績）をまるごと保存し、AIが過去の失敗から学べる仕組みを持つ。

---

## 主な機能

### 株価データ取得・監視
- **yfinance**: 日本株・米株・為替レートを取得。4日以上古いデータは「古すぎる」として取引を自動拒否
- **J-Quants**: 日本株の企業業績・過去の株価・決算カレンダーを取得（判断の数値的な裏取りに使用）
- **Google Sheets 連携**: 「株監視リスト」をGoogle Sheetsで管理し自動読み込み。Sheetsに接続できない場合はCSVで代用

### 売買判断・発注フロー
1. **Decision記録（必須・先行）**: thesis（Markdown）、市場スナップショット、意図したアクション、確信度（1-5）、タグを保存。有効期限10分
2. **Trade執行（decision_id必須）**: 「Decisionが10分以内に作られたか」「stale価格でないか」「現金/保有数は足りるか」を検証して約定
3. **ポートフォリオ更新**: 現金・ポジション・実現損益をJPY建てで記録

### ポートフォリオ計算
- 日本株（JPY native）と米株（USD native）を同一ビューで統一、USDJPYで自動換算
- 時価評価でコスト・現在の価値・含み損益・組入比率を算出
- 毎日のスナップショット（同日に何度実行しても結果が同じ安全設計）で損益カーブを描画

### 判断ログのRAG検索
`/decisions?search=...&tag=...&ticker=...` で過去の同銘柄・同テクニカル判断を抽出。AIが学習ループを回す基盤。

---

## 技術スタック

**Backend**（〜3,500行 Python）
- FastAPI + uvicorn / SQLAlchemy 2.0 / SQLite
- yfinance・J-Quants CLI・gog CLI 統合
- `services/trading.py`（約定）, `services/portfolio.py`（JPY換算）, `services/snapshots.py`（エクイティカーブ）

**Frontend**（41 .tsx）
- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 + React Compiler
- recharts（エクイティカーブ）, react-markdown（thesis表示）
- 型安全なAPIクライアント（`lib/api.ts`）

**自動化**: macOSの定期実行（launchd）で「監視リスト同期（毎日7:00）」「日次スナップショット（毎日6:00）」を自動処理

**Claude Code Skill**: `.claude/skills/trader/SKILL.md` にトレーダーAIの役割・ハードルール（1銘柄最大20%、最大10銘柄、現金5%以上保持、stale銘柄禁止、thesisに嘘禁止）を定義

---

## アーキテクチャ

```
Claude Code (/trader Skill)          Next.js Dashboard
   │ decision + thesis                  (read-only UI)
   │ trade + decision_id                http://127.0.0.1:3000
   ▼                                          │
┌────────────────────────────────────────────▼──┐
│  FastAPI Backend (127.0.0.1:8000)              │
│  POST /decisions, /trades                      │
│  GET /portfolio, /watchlist, /prices, /equity  │
└───────────┬───────────────┬────────────────────┘
            ▼               ▼            ▼
       SQLite DB        yfinance      J-Quants CLI
       kabuself.db      (OHLCV/FX)    (財務)
                                          │
                                    gog → Google Sheets
                                    (監視リスト)
```

**主要テーブル**: Portfolio / Watchlist / Position / Decision / Trade / EquitySnapshot

---

## 技術的な見どころ

- **API層での「判断→発注」強制**: `decision_id NOT NULL` ＋ 10分有効期限を HTTP 422 で実装。投資AIの信頼性を「予測精度」ではなく「判断の透明性」で測るという思想をコードで表現
- **複通貨ポートフォリオ**: 日本株/米株を同一ビューで扱い、USDJPYスポットを自動取得・スナップショット保存。Position/Tradeに native/JPY 両方を記録し後から監査可能
- **stale価格の自動検出**: 市場が閉じている時間帯や信頼できないquoteでの約定を構造的に遮断
- **どこかが失敗しても止まらない**: Google Sheets失敗→CSVに切替、yfinance失敗→取引拒否で安全に停止、J-Quants失敗→エラーを返しつつ他は正常動作
- **完全ローカル隔離**: 自分のPC内だけで動く構成。個人実験環境として安全
