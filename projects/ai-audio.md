---
title: "ai-audio"
icon: "mic"
order: 5
subtitle: "音声入力デスクトップツール"
desc: "ホットキーで録音してAIが文字起こしと整形を行い、クリップボードへ。長い沈黙でも録音が止まらない、吃音フレンドリーな設計のデスクトップアプリ。"
tags:
  - "Python"
  - "Groq Whisper"
  - "Gemini"
  - "customtkinter"
  - "pynput"
---

# ai-audio — 音声入力からAI整形までのデスクトップツール

> キーをひとつ押すとマイク録音が始まり、Groq Whisperが文字起こし、Geminiが読みやすく整形して、貼り付けるだけの状態でクリップボードに入ります。話すだけで文章の下書きができる個人用ツールです。

- **バージョン**: 0.1.0
- **対応OS**: macOS / Windows

---

## 概要

```
グローバルホットキー → マイク録音 → Groq Whisper (whisper-large-v3-turbo)
                  → Gemini Flash-Lite で整形 → クリップボードへ自動コピー
```

このツールでこだわったのは、**長い沈黙が続いても録音を止めない**ことです。吃音があると言葉が出るまでに時間がかかることがあるので、途中で録音が切れない作りにしました。整形時のプロンプトにも「あ行で始まる言い換えを避ける」といった指示を追加できます。

---

## 主な機能

- **2つの整形モード**: `script` は読みやすさ優先で言い換えあり、`ai_input` は原文をできるだけ保持
- **GUIとCLIの両対応**: 録音・履歴・設定の3タブ画面（customtkinter）と、ターミナルから使えるCLI（typer）
- **ライブレベルメーター**: 録音中は小さなボーダーレスウィンドウに24本の音量バーをリアルタイム表示

---

## 技術スタック

- **言語**: Python 3.11+ / uv
- **文字起こし**: Groq Whisper。失敗時は待ち時間を延ばしながら自動リトライ
- **AI整形**: Gemini Flash-Lite。モデルが使えない場合は別バージョンへ自動で切り替え
- **音声録音**: sounddevice + numpy + scipy
- **デスクトップ統合**: pynput でグローバルホットキー、pyperclip でクリップボード、plyer でOS通知
- **GUI**: customtkinter
- **設定 / 認証**: keyring でAPIキーをOSのセキュア領域に保存、設定はTOML
- **品質管理**: Ruff / pytest

---

## アーキテクチャ

```
src/ai_audio/
├── __main__.py        CLIエントリ
├── config.py          設定管理（keyring + TOML）
├── controller.py      パイプラインの制御
├── audio/recorder.py  マイク録音（無音での自動停止なし）
├── hotkey/listener.py グローバルホットキー
├── stt/groq_client.py Groq Whisper
├── llm/
│   ├── gemini_client.py  Gemini フォーマッター
│   └── prompts.py        モード別の整形プロンプト
├── desktop/           clipboard / notifications / macos
├── gui/
│   ├── main_window.py    3タブのメインUI
│   └── compact_window.py 録音中の小ウィンドウ
└── storage/sessions.py   セッションの保存
```

### パイプライン

```
録音 → Groq Whisperで転写 → 生テキストを保存
     → Geminiで整形（失敗したら生テキストを使う）
     → クリップボードへコピー → セッション保存 → OS通知
```

---

## 技術的な見どころ

- **アクセシビリティへの配慮**: 無音での自動停止をあえて外し、整形プロンプトも調整できるようにしました。長く沈黙しても安心して話し続けられます
- **失敗に強いAPI統合**: Groqは待ち時間を延ばしながらリトライ、Geminiはモデルを切り替えて再試行。どちらが失敗しても生テキストは必ず残ります
- **固まらないGUI**: 画面の描画とAI処理を別スレッドで動かし、キュー経由で受け渡し。録音中も操作が止まりません
- **用途別の整形プロンプト**: 台本用とAI入力用で方針を切り替え、目的に合った出力にしています
