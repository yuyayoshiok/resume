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
    "吃音があり、口頭よりもテキストで力を発揮するタイプです。書いて伝えることを早くから鍛えてきたので、非同期・テキスト中心のコミュニケーションが得意です。",
    "データ入力の仕事から始まり、「この作業、自動化できないかな」と考えたのがプログラミングを始めたきっかけでした。一般事務の立場でExcel VBAを覚え、担当業務の半分ほどを自動化したのがキャリアの出発点です。",
    "いまは生成AIを業務システムに組み込む仕事をしています。2023年からChatGPTを開発に取り入れ、いまはClaude CodeやCursor、Codexを役割ごとに使い分けています。定型的な実装はAIに任せて、自分は何を作るかの判断と、出てきたコードの品質を見ることに集中しています。",
    "自分が困っているから作る、という動機はいまも変わりません。ただ、その感覚は他の人のために作るときにも役立っています。現場の担当者に直接話を聞いて、どこで手が止まっているのかを確かめてから設計に入る。動くだけでなく、迷わず使えて、壊れても直せる形にすることを大事にしています。",
  ],
  highlight: "直近では、約200人月相当だった分類作業を1〜2名で回せる体制まで圧縮しました。",
} as const;

export const skillGroups = [
  {
    title: "AI駆動開発",
    tags: ["Claude Code", "Cursor", "Codex", "ChatGPT"],
  },
  {
    title: "AI / LLM",
    tags: ["Azure OpenAI Service", "OpenAI API", "Claude", "Gemini", "Groq", "Whisper", "RAG"],
  },
  {
    title: "機械学習",
    tags: ["LightGBM"],
  },
  {
    title: "言語",
    tags: ["Python", "TypeScript", "JavaScript", "Go", "PHP", "Google Apps Script", "VBA"],
  },
  {
    title: "フロントエンド",
    tags: ["React", "TypeScript", "Vite", "HTML", "CSS"],
  },
  {
    title: "バックエンド",
    tags: ["FastAPI", "Flask", "Node.js"],
  },
  {
    title: "クラウド / インフラ",
    tags: [
      "AWS",
      "Google Cloud",
      "Microsoft Azure",
      "Cloudflare",
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
    desc: "顧客からの問い合わせ内容を生成AIで自動分類・要約するシステムを設計しました。Pythonなど外部の実行環境が使えない制約のなか、VBAからAzure OpenAI Serviceを直接呼び出す構成を考えて実現しています。",
    results: [
      "月15~20万件規模のデータを8〜9台のPCで並列処理",
      "排他制御とリトライ処理により複数PC間で安定稼働",
      "人手換算で約200人月相当だった作業を1〜2名の運用体制へ",
    ],
    tech: ["Excel VBA", "Azure OpenAI Service"],
  },
  {
    title: "営業確度予測ツール",
    badge: "実務 / 機械学習",
    desc: "Salesforceの商談データから受注確度を予測するツールを開発しました。前処理からモデル構築、評価、営業担当者が使うUIまでを担当しています。",
    results: [
      "数万件規模のデータを前処理し、欠損値処理と個人情報のマスキングを実装",
      "学習用と検証用にデータを分け、AUCなどの指標で精度を確認",
      "担当者の主観確度とのズレが大きい商談から「隠れ案件」の候補を抽出",
    ],
    tech: ["Python", "LightGBM", "tkinter"],
  },
  {
    title: "社内業務自動化ツール群",
    badge: "実務",
    desc: "定型業務を自動化するツールの企画から開発までを一人で担当しました。現場の担当者に話を聞くところから始めて、実際に使われ続けるところまで見届けています。",
    results: [
      "シフト表の自動作成で、月2時間かかっていた作業を10分に短縮",
      "工数管理チェックで入力漏れの検出率95%以上を実現",
      "コンディションチェックの回答率90%以上を維持",
    ],
    tech: ["Google Apps Script", "Google Workspace", "ChatGPT"],
  },
  {
    title: "社内向けWebアプリケーション開発",
    badge: "業務委託",
    desc: "要件のヒアリングから設計・実装・運用までを一人で担当しました。AI駆動開発を取り入れ、1〜3か月単位で届けています。",
    results: [
      "社内申請ツールで承認プロセスの所要時間を約50%短縮",
      "営業事務管理ツールで散在していたデータを一元化し入力ミスを削減",
      "ECサイト改修ではGit/GitHubを使ったチーム開発に参加し、レビューを受けながら実装",
    ],
    tech: ["Python", "Flask", "PHP", "JavaScript", "Firebase", "GitHub"],
  },
  {
    title: "定型業務の自動化",
    badge: "キャリアの出発点",
    desc: "SE補佐として一般事務を担当しながら、繰り返し発生していた手作業を自動化しました。限られた環境と権限のなかで、できる範囲から業務改善を進めています。",
    results: [
      "スケジュール表の作成時間を2時間から3分に短縮",
      "ログ収集とレポート出力を自動化し、手作業のミスを削減",
      "担当業務の約半分を自動化",
    ],
    tech: ["Excel VBA", "Access VBA", "バッチファイル"],
  },
] as const;

export const articles = [
  {
    title: "GCP × Slack × AI × Obsidianで作る「第二の脳」を作った話",
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
  { label: "資格", status: "AWS認定 クラウドプラクティショナー / JDLA G検定" },
  { label: "興味のある領域", status: "AIを活用したプロダクト開発、LLMエージェント、Webアプリケーション開発" },
] as const;
