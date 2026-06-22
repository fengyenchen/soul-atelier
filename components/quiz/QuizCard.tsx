"use client";

import { Question, Option } from "@/types";
import { motion } from "motion/react"

interface QuizCardProps {
    question: Question;
    onSelect: (option: Option) => void;
}

export default function QuizCard({ question, onSelect }: QuizCardProps) {
    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full max-w-xl mx-auto space-y-10 py-6"
        >
            {/* 情境 */}
            <div className="px-4">
                <span className="text-center font-serif text-xs tracking-widest text-accent block mb-4">
                    〔 {question.scene} 〕
                </span>
                <p className="text-center md:text-left font-serif text-lg md:text-xl text-primary tracking-wide leading-loose min-h-20">
                    {question.content}
                </p>
            </div>

            {/* 選項 */}
            <div className="flex flex-col gap-4 px-2">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(option)}
                        className="w-full text-left px-6 py-4 rounded-xl border border-primary/10 bg-background text-primary tracking-wide text-sm font-sans transition hover:border-primary/40 hover:bg-background-dark cursor-pointer flex items-center justify-between group"
                    >
                        <p className="leading-relaxed pr-4">{option.text}</p>
                        <span className="text-secondary/40 font-serif text-xs transition group-hover:translate-x-1">
                            →
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}