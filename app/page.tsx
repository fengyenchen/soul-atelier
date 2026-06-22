import Link from "next/link";
import Crown from "@/components/Crown";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col justify-between p-8 md:px-16 relative overflow-hidden bg-background">

      {/* 3D 皇冠 */}
      <Crown />

      {/* 頁首 */}
      <header className="w-full text-left z-10 font-serif text-sm tracking-widest text-secondary">
        SOUL ATELIER // 靈魂工坊
      </header>

      {/* 空出適當的垂直間距在大標題上方 */}
      <div className="h-0 md:h-16" />

      {/* 主視覺 */}
      <div className="max-w-xl mx-auto text-center my-auto z-10 flex flex-col items-center gap-6">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-widest text-primary leading-relaxed">
          探索你的靈魂
        </h1>

        {/* 空出適當的垂直間距給背景的 3D 皇冠展示 */}
        <div className="h-72 md:h-84" />

        {/* 開始按鈕 */}
        <Link href="/quiz">
          <button className="relative z-10 px-12 py-3.5 overflow-hidden rounded-full border border-primary/20 bg-background text-primary tracking-widest text-sm font-serif shadow-xs transition-all duration-500 hover:border-primary hover:bg-background-dark cursor-pointer">
            進入工坊，開始探索
          </button>
        </Link>
      </div>

      {/* 頁尾 */}
      <footer className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end gap-4 z-10">
        <p className="text-center md:text-left text-sm md:text-base text-secondary tracking-wide font-light leading-loose max-w-md">
          日常的喧囂裡，你是否曾好奇過自己的內心？
          <br />
          撥開生活的迷霧，讓 AI 聆聽你的靈魂低語。
        </p>

        <p className="text-xs text-secondary/60 tracking-wider font-light">
          © 2026 Soul Atelier. All rights reserved.
        </p>
      </footer>
    </main>
  );
}