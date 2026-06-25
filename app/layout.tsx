import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Soul Atelier",
  description: "一個 AI 人格測驗，快來找尋你是哪種角色。",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Soul Atelier 靈魂工坊 | AI 人格測驗",
    description: "探索內心深處的自我。這是一場 AI 驅動的人格測驗，快來找尋屬於你的靈魂角色！",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Soul Atelier 靈魂工坊 - AI 人格測驗首頁",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
