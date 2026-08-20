---
title: "x-bookmark-enricher"
icon: "bookmark"
order: 8
subtitle: "ブックマーク自動整理システム"
desc: "XのブックマークをAIで要約・タグ付け・スコアリングし、Obsidianへ取り込むツール。「あとで読む」を知識ベースに変えます。"
tags:
  - "TypeScript"
  - "Groq"
  - "Gemini"
  - "Playwright"
  - "Obsidian"
---

# x-bookmark-enricher — Xのブックマークを使える知識に変える

> Xでブックマークした記事を自動で取得し、本文やリンク先の記事まで読み込んでAIが要約とタグ付けを行います。その結果をObsidianに保存することで、埋もれがちなブックマークが検索できる知識ベースになります。

- **保存先**: Obsidian Vault の `04_bookmarks_x/` フォルダ

---

## 概要

このツールの一番の特徴は、処理結果をすべてObsidianに保存することです。Xでブックマークしただけでは情報が流れていってしまいますが、これを通すと要約・タグ・カテゴリのついたノートとして蓄積され、後から検索したり記事のネタに使えるようになります。

処理は3段階です。

```
1. 取得    Xの投稿本文とリンク先の記事を読み込む
2. AI付加  要約・タグ付け・カテゴリ分類・記事ネタ度のスコアリング
3. 保存    Obsidianに整理した形で書き込む
```

![実行ログ](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/enricher-cli.webp)

*3252件のブックマークを管理し、未処理のものだけを差分で処理する*

![生成されたノート](https://raw.githubusercontent.com/yuyayoshiok/resume/main/screenshots/enricher-note.webp)

*生成されるノート。frontmatterにカテゴリ、タグ、記事ネタ度が入り、本文に要約が続く*

---

## 主な機能

### 取り込みと整理

- 投稿本文、引用ツイート、リンク先記事の本文まで取得
- Xの長文記事は `04_bookmarks_x/記事/` へ自動で振り分け
- 同じ投稿の重複ノートは自動で削除

### AIによる情報の付加

ブックマーク1件ごとに、次の情報を生成して付与します。

- 1行サマリー / 200〜400字の詳細要約 / 重要ポイント
- タグ3〜5個とカテゴリ（AI・プログラミング・ビジネスなど13分類）
- **記事ネタ度（1〜10点）** — ブログ記事に発展させられそうかをAIが採点。高得点のものを後でまとめて記事にできます

出力されるノートのサンプルはこちらです: [x-bookmark-enricher-output.md](../samples/x-bookmark-enricher-output.md)

---

## 技術スタック

- **言語**: TypeScript / Node.js
- **AI**: Groq `llama-3.3-70b` をメインに、Gemini を予備として併用
- **投稿の取得**: FxTwitter API をメインに、Playwright でのブラウザ操作を予備手段として用意
- **Obsidian連携**: gray-matter で frontmatter を読み書きしてノートを生成

---

## アーキテクチャ

```
        Obsidian Vault（iCloud同期）
        ├─ 04_bookmarks_x/        ← ブックマークのノート
        │   └─ 記事/              ← Xの長文記事はここへ
        └─ 05_moc_bookmarks/      ← ダッシュボード
                ▲
                │ ノートを読み書き
        ┌───────┴────────────────────────────┐
        │  x-bookmark-enricher（Node.js）     │
        │  ① parser   既存ノートを読む        │
        │  ② scraper  X投稿・記事を取得       │
        │  ③ enricher AIで要約・タグ付け      │
        │  ④ writer   Obsidianへ書き戻す      │
        └───────┬───────────────┬─────────────┘
                ▼               ▼
          FxTwitter API   Groq / Gemini
          + Playwright
```

---

## 技術的な見どころ

- **大量処理に強い並列設計**: 取得は3件、AI要約は10件を同時に処理します。数千件のブックマークも現実的な時間でさばけて、利用上限に達したら自動で停止・再開します
- **AIの二段構え**: メインのGroqが使えなくなったらGeminiへ切り替え。どちらも失敗したらそのノートはスキップして処理全体は止めません
- **取得手段の多重化**: まず高速なAPIで試し、だめならPlaywrightでのブラウザ操作へ。リンク先の記事本文まで読み込んで要約の材料にします
- **記事ネタ度のスコアリング**: 保存するだけでなく、記事化できそうかをAIが点数化します。インプットからアウトプットへの橋渡しを自動化しました
