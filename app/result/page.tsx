"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { analyzeSoul } from "@/app/actions/analyze";
import { AIAnalysisResult } from "@/types";
import { motion } from "motion/react";
import html2canvas from 'html2canvas';

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const solitude = searchParams.get("solitude");
    const tangible = searchParams.get("tangible");
    const order = searchParams.get("order");

    const [data, setData] = useState<AIAnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    const resultRef = useRef<HTMLDivElement>(null);

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

    const handleDownloadImage = async () => {
        const element = resultRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2, // 提升圖片解析度
                useCORS: true, // 允許跨域圖片
            });
            // 將 canvas 轉為 DataURL 並下載
            const imageDate = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imageDate;
            link.download = `${data.title}_soul_atelier.png`; // 檔名
            link.click();
        } catch (error) {
            console.error('圖片生成失敗：', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xl mx-auto space-y-12 py-4"
        >
            <div
                className="bg-background p-8 rounded-2xl space-y-12"
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
            </div>

            {/* 要輸出的畫面 - start */}
            <div
                style={{
                    position: 'fixed',
                    left: '-9999px',
                    top: '0px',
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}
            >
                <div
                    ref={resultRef}
                    style={{
                        width: '560px',
                        backgroundColor: '#F9F8F6',
                        paddingLeft: '6rem',  // px-24 -> 24 * 0.25rem
                        paddingRight: '6rem',
                        paddingTop: '2rem',   // py-8 -> 8 * 0.25rem
                        paddingBottom: '2rem',
                        borderRadius: '1rem', // rounded-2xl
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'left',
                        gap: '3rem'           // space-y-12 -> 12 * 0.25rem
                    }}
                >
                    <h1
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '1.875rem', // text-3xl
                            letterSpacing: '0.1em', // tracking-widest
                            color: '#2C2C2C',
                            lineHeight: '1.625',    // leading-relaxed
                            fontFamily: '"Noto Serif TC", "Songti TC", "PMingLiU", "Apple LiMin", "MingLiU", serif',
                            fontWeight: 400
                        }}
                    >
                        {data.title}
                    </h1>

                    <div
                        style={{
                            width: '100%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', // grid-cols-3
                            gap: '1rem', // gap-4
                            borderTop: '1px solid rgba(61, 61, 61, 0.1)', // border-y border-[#3d3d3d]/10
                            borderBottom: '1px solid rgba(61, 61, 61, 0.1)',
                            paddingTop: '1rem', // py-4
                            paddingBottom: '1rem',
                            textAlign: 'center',
                            fontSize: '0.75rem', // text-xs
                            letterSpacing: '0.1em', // tracking-widest
                            color: '#666666',
                            fontFamily: '"Noto Serif TC", "Songti TC", "PMingLiU", "Apple LiMin", "MingLiU", serif',
                            fontWeight: 400
                        }}
                    >
                        <div>孤獨感: {solitude}%</div>
                        <div>感知力: {tangible}%</div>
                        <div>秩序性: {order}%</div>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem' // space-y-4
                        }}
                    >
                        <p
                            style={{
                                fontSize: '1rem', // text-base
                                color: '#2C2C2C',
                                letterSpacing: '0.025em', // tracking-wide
                                fontWeight: 300, // font-light
                                lineHeight: '2', // leading-loose
                                textAlign: 'justify', // text-justify
                                whiteSpace: 'pre-line'
                            }}
                        >
                            {data.content}
                        </p>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            paddingTop: '1rem', // pt-4
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem' // space-y-4
                        }}
                    >
                        <h3
                            style={{
                                width: '100%',
                                fontSize: '0.75rem', // text-xs
                                letterSpacing: '0.1em', // tracking-widest
                                color: '#666666',
                                textTransform: 'uppercase', // uppercase
                                borderBottom: '1px solid rgba(44, 44, 44, 0.1)', // border-b border-[#2C2C2C]/10
                                paddingBottom: '1rem', // pb-4
                                fontFamily: '"Noto Serif TC", "Songti TC", "PMingLiU", "Apple LiMin", "MingLiU", serif',
                                fontWeight: 400
                            }}
                        >
                // 給靈魂的生活處方
                        </h3>
                        <p
                            style={{
                                fontSize: '0.875rem', // text-sm
                                color: '#2C2C2C',
                                letterSpacing: '0.025em', // tracking-wide
                                fontWeight: 300, // font-light
                                lineHeight: '1.625', // leading-relaxed
                                whiteSpace: 'pre-line'
                            }}
                        >
                            {data.prescription}
                        </p>
                    </div>
                </div>
            </div>
            {/* 要輸出的畫面 - end */}

            <div className="text-center pt-4">
                <button
                    onClick={() => router.push("/")}
                    className="px-8 py-2.5 rounded-full border border-primary/10 bg-background text-primary tracking-widest text-xs font-serif shadow-xs transition duration-600 hover:border-primary/40 hover:bg-background-dark cursor-pointer"
                >
                    重返工坊
                </button>
                <button
                    onClick={handleDownloadImage}
                    className="ml-4 px-8 py-2.5 rounded-full border border-primary/10 bg-background text-primary tracking-widest text-xs font-serif shadow-xs transition duration-600 hover:border-primary/40 hover:bg-background-dark cursor-pointer"
                >
                    下載處方
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