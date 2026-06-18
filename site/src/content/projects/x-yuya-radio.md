---
title: "x-yuya Radio"
emoji: ""
order: 4
desc: "Obsidian Vaultの思考ログを素材に、AIが台本を書き、音声合成エンジンが2人の話者で読み上げる全自動ポッドキャスト生成システム。"
subtitle: "BGM（トレンド型）と価値観ラヂオ（内省型）の2チャンネルを毎日自動配信。"
tags: ["Python", "Codex", "AivisSpeech", "Cloudflare R2", "GitHub Actions"]
---

# x-yuya（ラジオ機能）— AIパーソナリティ2人のポッドキャスト自動生成

> Obsidian Vault を素材に、LLMが台本を書き、AivisSpeechが2人の話者で読み上げ、Cloudflare R2に配信する——**完全自動のポッドキャスト生成システム**。x-yuya の中核機能であるラジオ部分にフォーカスした記録。


---

## 概要

毎日決まった時刻にLLMエージェントが起動し、2話者トーク型のポッドキャスト音声を自動生成・配信する。チャンネルは2系統:

| チャンネル | タイプ | 実行 | 尺 | 特徴 |
|-----------|--------|------|----|------|
| **BGM** | トレンド型ニュース | 毎日00:00 JST（GitHub Actions） | 約8-10分 | Web検索ON・最新の話題を取り上げる |
| **価値観ラヂオ** | 内省・深掘り型 | 手動／連続生成（ローカル） | 約10分（2part） | Vault精読・エピソード番号制・重複除外 |

### 処理の流れ
```
入力: Obsidian Vault（思考ログ・ブックマーク・日記）＋ Web検索（BGMのみ）
  ↓ Codex headless で2話者トーク型JSON原稿を生成（part1/part2、計4000-5000字）
  ↓ AivisSpeech で行単位にTTS → WAV連結 → loudnorm → MP3化
  ↓ Cloudflare R2 へアップロード（bgm/ value/ プレフィックス）
出力: index.json に履歴追加 → Kanbanリポジトリへgit push（Vercel自動デプロイ）
```

---

## 技術スタック

- **原稿生成**: Codex（OpenAIの自動生成AI）をCLIから起動。代替としてClaude（Anthropic）も同一スクリプトで切替可能
- **音声合成**: AivisSpeech（日本語テキスト→音声変換。オープンソース・無料・無制限に利用可能）。話者は環境変数で選択可能
- **言語/実行**: Python 3.11 / Bash
- **インフラ**: Cloudflare R2（音声ファイルの保管庫）+ Workers / GitHub Actions（毎日の自動実行）
- **音声処理**: ffmpeg（複数の音声ファイルの結合・音量調整・MP3変換）

### 履歴・永続化
- `data/radio-bgm-history.json` — BGM履歴（テーマ重複防止）
- `data/radio-value-history.json` — 価値観ラヂオ履歴（エピソード番号管理）
- `drafts/pending/` — 生成中間物（日付ごとのJSON原稿）

---

## 主要ファイル

```
scripts/
├── generate-codex.py     ★原稿生成メイン（Codex版）
│   ├── VaultCollector     Vaultから思考ログ・ブックマーク・日記を抽出
│   ├── DuplicateChecker   履歴JSONから使用済みノート・テーマを回避
│   └── build_prompt_*()   チャンネル別プロンプト組み立て
├── tts-aivis.py          ★AivisSpeech TTS変換
│   ├── split_by_speaker() "Speaker1:"/"Speaker2:" で話者分解
│   ├── aivis_synth()      /audio_query → /synthesis で行単位合成
│   └── update_index()     index.json に新エピソード追加
└── sync-codex-auth.sh    ★Codex auth.json を GitHub Secret に定期同期（launchd 1日4回）

bin/
├── x-yuya-radio-bgm      BGM生成エントリ
├── x-yuya-radio-value    価値観ラヂオ生成エントリ（連続生成モード対応）
└── x-yuya-radio-tts-once TTS再実行（修復用）

.github/workflows/radio.yml  毎日00:00 JST 自動実行
```

---

## 技術的な見どころ

- **複数AIを切り替えて使える設計**: Codex / Claude / Gemini を同じスクリプトから切替可能。旧システムからの段階移行も実現
- **重複排除・エピソード管理**: 履歴JSONに使用済みノート・テーマカテゴリを記録し、Vault素材と二重チェック。価値観ラヂオは連番エピソード＆複数本並行生成に対応
- **履歴喪失バグの回避**: R2の `index.json` を「既存DL → 新規append → 再UL」の手順で更新し、毎実行での上書きを防止
- **ローカル/クラウド並行運用**: 環境変数（`TTS_ENGINE` / `VAULT_PATH` / `CODEX_HOME`）で、同じスクリプトをローカル実行とCI実行の両方でサポート
- **認証トークンの自動更新**: 数日で失効するChatGPT auth.jsonを launchd（1日4回）でGitHub Secretへ同期し、CI停止を予防
- **CI最適化**: AivisSpeechのボイスモデルを `actions/cache` で保持し、初回5-10分のダウンロードを再利用
- **クラウドに頼らない音声合成**: AivisSpeech（オープンソース）を使うことでクラウドTTSの利用上限から解放され、ローカルPCで1日100本規模の生成も可能
