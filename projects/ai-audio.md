# ai-audio — 音声入力 → AI整形 デスクトップツール

> ホットキーひとつでマイク録音し、Groq Whisper で文字起こし、Gemini で整形してクリップボードへ——「話してドラフトを作る」ワークフローを実現する個人向けデスクトップアプリ。**吃音フレンドリー**な設計が特徴。

- **リポジトリ**: `ai-audio`
- **バージョン**: 0.1.0
- **対応OS**: macOS / Windows

---

## 概要

```
グローバルホットキー → マイク録音 → Groq Whisper (whisper-large-v3-turbo)
                  → Gemini Flash-Lite で整形 → クリップボード自動コピー
```

**長い沈黙でも録音が止まらない**ようにしている。
これは吃音のある話者が安心して話せるようにという配慮で、整形プロンプトにも「あ行で始まる言い換えを避ける」といったカスタム指示を組み込める。

---

## 主な機能

- **2つの整形モード**: `script`（台本用・読みやすさ優先で言い換え可）/ `ai_input`（AI入力用・原文を最大限保持）
- **GUI ＋ CLI**: customtkinter による3タブUI（録音 / 履歴 / 設定）と、typer によるCLI
- **ライブレベルメーター**: 録音中に小さなボーダーレスウィンドウ（Superwhisper風）で24本のリアルタイム音量バーを表示
---

## 技術スタック

- **言語**: Python 3.11+ / uv（パッケージ管理）
- **文字起こし**: Groq Whisper（失敗時は自動リトライし、待ち時間を段階的に延ばして再試行）
- **AI整形**: Gemini Flash-Lite（モデルが使えない場合は別バージョンに自動切替）
- **音声録音**: sounddevice + numpy + scipy
- **デスクトップ統合**: pynput（どのアプリを使っていても効くホットキー）/ pyperclip（クリップボード操作）/ plyer（OS通知）
- **GUI**: customtkinter（モダンな見た目のデスクトップUI）
- **設定/認証**: keyring（APIキーをOSのセキュアな領域に保存）+ TOML設定ファイル
- **品質管理**: Ruff（コード品質チェック）/ pytest（テスト）

---

## アーキテクチャ

```
src/ai_audio/
├── __main__.py        CLI エントリ（typer）
├── config.py          設定管理（keyring + TOML）
├── controller.py      パイプラインのオーケストレーション
├── audio/recorder.py  マイク録音（VADなし・current_levelでメーター）
├── hotkey/listener.py グローバルホットキー（pynput）
├── stt/groq_client.py Groq Whisper transcriber
├── llm/
│   ├── gemini_client.py  Gemini フォーマッター
│   └── prompts.py        モード別の日本語整形プロンプト
├── desktop/           clipboard / notifications / macos
├── gui/
│   ├── main_window.py    3タブメインUI（Tkメイン＋ワーカースレッド＋キュー通信）
│   └── compact_window.py 録音中の小ウィンドウ（24本レベルメーター）
└── storage/sessions.py   セッション永続化
```

### パイプライン
```
録音 → Groq Whisper転写 → 生テキスト保存（Gemini失敗時の逃げ道）
     → Gemini整形（失敗時は生テキストにfallback）
     → クリップボードコピー → セッション保存 → OS通知
```

---

## 技術的な見どころ

- **アクセシビリティへの配慮**: VAD排除＋言い換え回避指示で、吃音のある話者が長く沈黙しても止まらない録音体験を実現
- **失敗に強いAPI統合**: Groqは失敗時に自動リトライ（待ち時間を段階的に延ばす）、Geminiはモデルを切り替えて再試行。どちらが失敗しても生テキストは必ず残す
- **固まらないGUI設計**: 画面の描画とAI処理を別スレッドで並行実行し、キュー通信で安全に橋渡し。録音中も画面がサクサク動く
- **用途別の整形プロンプト**: 台本用とAI入力用で整形方針を切り替え、用途に応じた出力品質を担保
