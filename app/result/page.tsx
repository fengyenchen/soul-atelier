"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { analyzeSoul } from "@/app/actions/analyze";
import { AIAnalysisResult } from "@/types";
import { motion } from "motion/react";

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const solitude = searchParams.get("solitude");
    const tangible = searchParams.get("tangible");
    const order = searchParams.get("order");

    const [data, setData] = useState<AIAnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                setLoading(true);
                const result = await analyzeSoul({
                    solitude: Number(solitude),
                    tangible: Number(tangible),
                    order: Number(order),
                });
                setData(result);
            } catch (error) {
                console.error("讀取 Server Action 失敗:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [solitude, tangible, order]);

    if (loading || !data) {
        return (
            <div className="z-10 text-center space-y-6 max-w-xs mx-auto animate-fade-in">
                <div className="flex justify-center mb-2">
                    <div className="w-6 h-6 border border-primary/20 border-t-accent rounded-full animate-spin" />
                </div>
                <h2 className="font-serif text-base tracking-widest text-primary animate-pulse">
                    正在編織你的靈魂肌理...
                </h2>
                <p className="font-sans text-xs tracking-widest text-secondary/60 leading-loose">
                    AI 正在聆聽你的低語，<br />
                    為你尋找存在於生活裂縫中的形狀...
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xl mx-auto space-y-12 py-4"
        >
            <h1 className="text-center font-serif text-2xl md:text-3xl tracking-widest text-primary leading-relaxed">
                {data.title}
            </h1>

            <div className="grid grid-cols-3 gap-4 border-y border-primary/10 py-4 text-center font-serif text-xs tracking-widest text-secondary/80">
                <div>孤獨感: {solitude}%</div>
                <div>感知力: {tangible}%</div>
                <div>秩序性: {order}%</div>
            </div>

            <div className="space-y-4">
                <p className="text-sm md:text-base text-secondary tracking-wide font-light leading-loose text-justify whitespace-pre-line">
                    {data.content}
                </p>
            </div>

            <div className="space-y-4 pt-4">
                <h3 className="font-serif text-xs tracking-widest text-primary uppercase border-b border-primary/10 pb-2">
                    // 給靈魂的生活處方
                </h3>
                <p className="text-xs md:text-sm text-secondary/80 tracking-wide font-light leading-relaxed whitespace-pre-line">
                    {data.prescription}
                </p>
            </div>

            <div className="text-center pt-4">
                <button
                    onClick={() => router.push("/")}
                    className="px-8 py-2.5 rounded-full border border-primary/10 bg-background text-primary tracking-widest text-xs font-serif shadow-xs transition duration-600 hover:border-primary/40 hover:bg-background-dark cursor-pointer"
                >
                    重返工坊
                </button>
            </div>
        </motion.div>
    );
}

export default function ResultPage() {
    return (
        <main className="w-full h-screen flex flex-col p-8 md:px-16 bg-background overflow-y-auto relative">
            <header className="w-full text-left z-10 font-serif text-sm tracking-widest text-secondary/40">
                SOUL ATELIER // 診斷報告
            </header>

            <div className="my-auto z-10 w-full relative py-8">
                <Suspense fallback={
                    <div className="text-center font-serif text-xs text-secondary/40 animate-pulse">
                        工坊空間凝聚中...
                    </div>
                }>
                    <ResultContent />
                </Suspense>
            </div>

            <footer className="w-full flex flex-col md:flex-row justify-center md:justify-end items-center md:items-end z-10 pt-4">
                <p className="text-[10px] text-secondary/40 tracking-wider font-light">
                    © 2026 Soul Atelier. All rights reserved.
                </p>
            </footer>
        </main>
    );
}