# 🏛️ Soul Atelier // 靈魂工坊

> 「日常的喧囂裡，你是否曾好奇過自己內心的肌理？撥開生活的迷霧，讓 AI 聆聽你的靈魂低語。」

`Soul Atelier` 是一個融合 **3D 互動視覺藝術** 與 **大語言模型（LLM）** 的心靈空間特質測驗。使用者將透過一系列極簡、富有詩意的情境劇本導引，在最後由 Google Gemini 2.5 AI 深度編織出專屬的靈魂幾何輪廓與生活處方。

---

## 🎨 核心美學與視覺

專案在視覺與體驗設計上追求極致的「留白」與「空氣感」：
* **燕麥紙質色調**：以低飽和度的燕麥色（Oatmeal/Alabaster）為基底，搭配深炭灰文字，營造深夜手作工坊的靜謐氛圍。
* **詩意微互動 3D 皇冠**：首頁置入經環境光優化、自轉的 3D 皇冠模型（Three.js/React Three Fiber）。內建 Smooth Lerp 演算法，使模型隨滑鼠游標溫柔傾斜、隨時間軸規律漂浮，賦予畫面呼吸般的生命力。
* **絲滑過渡動效**：採用最新一代 `framer-motion` (`motion/react`)，讓問答卡片切換與診斷結果呈現皆具備優雅的淡入滑行軌跡。

---

## ⚡ 技術棧與架構亮點

* **前端框架**：Next.js 15+ (App Router)
* **樣式系統**：Tailwind CSS v4 (全新設計系統變數整合)
* **3D 渲染**：Three.js / React Three Fiber (R3F) / @react-three/drei
* **動畫流暢**：framer-motion (`motion/react`)
* **核心大腦**：Next.js Server Actions 異步通訊機制
* **人工智慧**：Google Gemini 2.5 Flash API (啟用 Structured Outputs 結構化 JSON 輸出)
* **型別安全**：TypeScript 5+ 全端型別嚴格校對

---

## 📂 專案檔案結構

```text
.
├── .next              # Next.js 編譯快取
├── app
│   ├── actions        # 後端核心：Server Actions (Gemini API 串接)
│   │   └── analyze.ts
│   ├── quiz           # 測驗問答路由頁面
│   │   └── page.tsx
│   ├── result         # AI 診斷報告路由頁面 (Suspense 異步防禦)
│   │   └── page.tsx
│   ├── globals.css    # Tailwind v4 全域變數與燕麥色系定義
│   ├── layout.tsx     # 全域字體與 SSR Hydration 防禦
│   └── page.tsx       # 靜謐首頁入口
├── components
│   ├── quiz           # 問答互動元件 (ProgressBar, QuizCard)
│   └── Crown.tsx      # R3F 3D 皇冠模型與滑鼠傾斜大腦
├── data
│   └── questions.ts   # 嚴格型別定義的詩意情境劇本資料
├── hooks
│   └── useQuiz.ts     # 答題狀態管理 Hook (結算前 effects 收集機制)
├── public
│   └── 3d             # 3D 資產存放 (crown.glb)
└── types
    └── index.ts       # 全域數據維度與 AI 欄位 Interface 定義
```

---

## 🛠️ 開發環境啟動指南

### 1. 複製與安裝依賴

```bash
pnpm install
```

### 2. 環境變數設定

在專案根目錄建立 `.env.local` 檔案，並填入您的 Google AI 金鑰：

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. 本地啟動

```bash
pnpm dev
```

---

## 🕊️ 靈魂數據維度定義

測驗背後圍繞三個核心心靈對稱軸進行動態權重收集：

1. **Solitude (獨立傾向)**：`0` 代表群體連結，`100` 代表純粹獨處。
2. **Tangible (實體感知)**：`0` 代表形而上的想像，`100` 代表具體手作的觸覺感知。
3. **Order (秩序細膩)**：`0` 代表廢興與隨興，`100` 代表神殿般的完美秩序。

三個維度在答題途中僅進行歷史軌跡收集，直至最後一題點擊瞬間，Server Action 才一口氣結算出 `0 ~ 100` 的最終分數並餵給 Gemini，確保狀態追蹤的純粹與精準。