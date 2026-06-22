"use client";

import { useEffect } from "react";
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

    useEffect(() => {
        if (isFinished) {
            const queryParams = new URLSearchParams({
                solitude: scores.solitude.toString(),
                tangible: scores.tangible.toString(),
                order: scores.order.toString(),
            }).toString();

            router.push(`/result?${queryParams}`);
        }
    }, [isFinished, scores, router]);

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