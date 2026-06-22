"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";
import { questions } from "@/data/questions";
import ProgressBar from "@/components/quiz/ProgressBar";
import QuizCard from "@/components/quiz/QuizCard";

export default function QuizPage() {
    const router = useRouter();

    const {
        currentQuestion,
        progress,
        scores,
        isFinished,
        handleSelectOption,
        currentIndex,
        totalQuestions,
    } = useQuiz(questions);

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        if (isFinished) {
            setIsAnalyzing(true);

            const timer = setTimeout(() => {
                const queryParams = new URLSearchParams({
                    solitude: scores.solitude.toString(),
                    tangible: scores.tangible.toString(),
                    order: scores.order.toString(),
                }).toString();

                router.push(`/result?${queryParams}`);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isFinished, scores, router]);

    // 測驗完成，正在分析中
    if (isAnalyzing) {
        return (
            <main className="w-full h-screen min-h-screen flex flex-col items-center justify-center bg-background p-8 relative overflow-hidden">

                {/* 脈動光暈 */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 bg-accent/10 rounded-full blur-3xl animate-pulse" />

                <div className="z-10 text-center space-y-6 max-w-xs mx-auto">
                    <div className="flex justify-center mb-2">

                        {/* 圓圈旋轉 */}
                        <div className="w-6 h-6 border border-primary/20 border-t-accent rounded-full animate-spin" />
                    </div>
                    <h2 className="font-serif text-base tracking-widest text-primary animate-pulse">
                        正在分析你的靈魂特質...
                    </h2>
                    <p className="font-sans text-xs tracking-widest text-secondary/60">
                        AI 正在聆聽你的靈魂，<br />
                        為你尋找存在於生活裂縫中的形狀...
                    </p>
                </div>
            </main>
        );
    }

    // 答題中
    return (
        <main className="w-full h-screen flex flex-col justify-between p-8 md:px-16 bg-background">
            {/* 頁首 */}
            <header className="w-full text-left z-10 font-serif text-sm tracking-widest text-secondary/40">
                Soul Atelier // 探索階段
            </header>

            {/* 問答區 */}
            <div className="w-full mx-auto my-auto z-10">
                <QuizCard
                    question={currentQuestion}
                    onSelect={(option) => handleSelectOption(option.effect)}
                />
            </div>

            {/* 頁尾進度條 */}
            <footer className="w-full z-10">
                <ProgressBar
                    progress={progress}
                    current={currentIndex}
                    total={totalQuestions}
                />
            </footer>
        </main>
    );
}