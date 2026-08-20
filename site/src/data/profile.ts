// Single source of truth for the site copy.
// Keep this in sync with the repository README.md when the resume is updated.

export const profile = {
  name: "Y.Yuya",
  greeting: "ポートフォリオ",
  bio: [
    "AIエージェントを開発の相棒に、",
    "一人でプロダクトを作り切るエンジニアです。",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/yuyayoshiok", icon: "github" },
    { label: "X", href: "https://x.com/yuyaainocode", icon: "x" },
    { label: "note", href: "https://note.com/yuyaainocode", icon: "note" },
  ],
} as const;

export const story = {
  number: "01",
  title: "ストーリー",
  paragraphs: [
    "吃音があり、口頭よりもテキストで力を発揮するタイプです。書いて伝えることを早くから鍛えてきたため、非同期・テキスト中心のコミュニケーションを得意としています。",
    "データ入力の仕事から始まり、「この作業、自動化できるのでは？」という視点で独学でプログラミングを習得しました。一般事務の立場でExcel VBAを使い、担当業務の約半分を自動化したのがキャリアの出発点です。",
    "いまは生成AIを業務システムに組み込む仕事をしています。2023年からChatGPTを開発に取り入れ、現在は Claude Code / Cursor / Codex を役割ごとに使い分けながら、定型的な実装はAIに任せ、自分は「何を作るか」の設計判断と品質担保に集中する進め方を実務・個人開発の双方で徹底しています。",
    "自分が困っているから作る、という動機は変わりません。ただ、その感覚は他人のために作るときにも効いています。現場担当者に直接話を聞き、「どこで手が止まっているか」を自分ごとに変換してから設計に入る。動くだけでなく、迷わず使えて、壊れても復旧できる形に落とし込むことを大切にしています。",
  ],
  highlight: "約200人月相当の分類作業を、1〜2名で回せる体制へ",
} as const;

export const skillGroups = [
  {
    title: "AI駆動開発",
    tags: ["Claude Code", "Cursor", "Codex", "ChatGPT", "MCP", "Claude Code Skills"],
  },
  {
    title: "AI / LLM",
    tags: ["Azure OpenAI Service", "OpenAI API", "Claude", "Gemini", "Groq", "Whisper", "RAG"],
  },
  {
    title: "機械学習",
    tags: ["LightGBM", "pandas"],
  },
  {
    title: "言語",
    tags: ["Python", "TypeScript", "JavaScript", "Go", "PHP", "Google Apps Script", "VBA"],
  },
  {
    title: "フロントエンド",
    tags: ["React", "TypeScript", "Vite", "Next.js", "HTML", "CSS"],
  },
  {
    title: "バックエンド",
    tags: ["FastAPI", "Flask", "Node.js"],
  },
  {
    title: "クラウド / インフラ",
    tags: [
      "Google Cloud",
      "Cloudflare",
      "AWS",
      "Microsoft Azure",
      "Vercel",
      "Firebase",
      "Terraform",
      "Docker",
      "GitHub Actions",
    ],
  },
] as const;

export const workIntro =
  "現場の担当者に直接ヒアリングし、要件定義から設計・実装・運用定着までを一貫して担当してきました。";

export const workCards = [
  {
    title: "VoC分析・分類LLMシステム",
    badge: "実務 / 本番運用",
    featured: true,
    desc: "顧客からの問い合わせ内容を生成AIで自動分類・要約するシステムを設計・開発。Pythonなど外部実行環境を使えない制約下で、VBAからAzure OpenAI Serviceを直接呼び出す構成を考案しました。",
    results: [
      "月20万件規模のデータを8〜9台のPCで並列処理",
      "排他制御・リトライ処理により複数PC間で安定稼働",
      "人手換算で約200人月相当の作業を1〜2名の運用体制へ",
    ],
    tech: ["Excel VBA", "Azure OpenAI Service"],
  },
  {
    title: "営業確度予測ツール（PoC）",
    badge: "実務 / 機械学習",
    desc: "Salesforceの商談データから受注確度を予測するツールを開発。前処理からモデル構築・評価、非エンジニア向けのUI実装までを担当しました。",
    results: [
      "数万件規模のデータを前処理（欠損値処理・個人情報マスキング）",
      "学習/検証データを分割し、AUC等の指標で精度を確認",
      "担当者の主観確度とのズレから「隠れ案件」候補を抽出",
    ],
    tech: ["Python", "LightGBM", "tkinter"],
  },
  {
    title: "社内業務自動化ツール群",
    badge: "実務",
    desc: "定型業務を自動化する各種ツールの企画・設計・開発を一人で担当。現場担当者へのヒアリングを起点に、運用定着まで見届けました。",
    results: [
      "シフト表自動作成: 月2時間 → 10分に短縮",
      "工数管理チェック: 入力漏れ検出率95%以上",
      "コンディションチェック: 回答率90%以上を維持",
    ],
    tech: ["Google Apps Script", "Google Workspace", "ChatGPT"],
  },
  {
    title: "社内向けWebアプリケーション開発",
    badge: "業務委託",
    desc: "要件ヒアリングから設計・実装・運用まで一人称で担当。AI駆動開発を活用し、1〜3か月単位で開発・提供しました。",
    results: [
      "社内申請ツール: 承認プロセスの所要時間を約50%短縮",
      "営業事務管理ツール: 散在データを一元化し入力ミスを削減",
      "ECサイト改修: Git/GitHubでのチーム開発、コードレビューを受けて実装",
    ],
    tech: ["Python", "Flask", "PHP", "JavaScript", "Firebase", "GitHub"],
  },
  {
    title: "定型業務の自動化（一般事務として）",
    badge: "キャリアの出発点",
    desc: "SE補佐（一般事務）として勤務する傍ら、繰り返し発生していた手作業を自動化。限られた環境・権限の中で業務改善を実現しました。",
    results: [
      "スケジュール表作成: 2時間 → 3分に短縮",
      "ログ収集・レポート出力を自動化しヒューマンエラーを削減",
      "担当業務の約半分を自動化",
    ],
    tech: ["Excel VBA", "Access VBA", "バッチファイル"],
  },
] as const;

export const articles = [
  {
    title: "【個人開発】GCP × Slack × AI × Obsidianで作る「第二の脳」を作った話",
    href: "https://qiita.com/yuyayoshiok/items/f3cba038550043f7f2ae",
    site: "Qiita",
  },
  {
    title: "AIをひとつに絞れなかった僕が4つ同時に動かしたら最強の開発チームが出来た話",
    href: "https://note.com/yuyaainocode/n/n91870c563a14",
    site: "note",
  },
] as const;

export const aboutItems = [
  { label: "拠点", status: "島根県松江市 / フルリモート" },
  { label: "資格", status: "AWS認定 クラウドプラクティショナー（2024年） / JDLA G検定（2025年）" },
  { label: "興味のある領域", status: "AIを活用したプロダクト開発 / LLMエージェント / Webアプリケーション開発" },
] as const;
