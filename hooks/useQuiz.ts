"use client";

import { useState } from "react";
import { Question, Dimensions } from "@/types";

export function useQuiz(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 記錄使用者一路上所有選擇的 effect 陣列
  const [selectedEffects, setSelectedEffects] = useState<Dimensions[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const calculateFinalScores = (): Dimensions => {
    let finalSolitude = 50;
    let finalTangible = 50;
    let finalOrder = 50;

    selectedEffects.forEach((effect) => {
      finalSolitude += effect.solitude;
      finalTangible += effect.tangible;
      finalOrder += effect.order;
    });

    return {
      solitude: Math.max(0, Math.min(100, finalSolitude)),
      tangible: Math.max(0, Math.min(100, finalTangible)),
      order: Math.max(0, Math.min(100, finalOrder)),
    };
  };

  const handleSelectOption = (effect: Dimensions) => {
    const updatedEffects = [...selectedEffects, effect];
    setSelectedEffects(updatedEffects);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedEffects([]);
    setIsFinished(false);
  };

  return {
    currentIndex,
    currentQuestion,
    progress,
    scores: calculateFinalScores(),
    isFinished,
    handleSelectOption,
    handleReset,
    totalQuestions: questions.length,
  };
}