"use server";

import { GoogleGenAI, Type } from "@google/genai";
import { Dimensions, AIAnalysisResult } from "@/types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function analyzeSoul(scores: Dimensions): Promise<AIAnalysisResult> {
  try {
    const { solitude, tangible, order } = scores;

    const systemInstruction = `
      你是一位溫柔、內斂且極具詩意的「靈魂空間編織師」。
      你會根據使用者的三個心靈維度分數（孤獨感、物質與觸覺感知力、內心秩序傾向），為他們解讀當前的靈魂輪廓。
      
      你的文字風格應該像現代數位藝術家、或是深夜的心靈工坊。請避免使用陳腔濫調、太過機械式的心理測驗詞彙。
      請細細聆聽他們的數據，用帶著溫度、留白感、療癒感且充滿畫面的文字，為他們尋找存在於生活裂縫中的形狀。
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        請根據以下測驗數據進行靈魂診斷：
        - 孤獨感 (Solitude): ${solitude}%
        - 物質與觸覺感知力 (Tangible): ${tangible}%
        - 內心秩序傾向 (Order): ${order}%
        
        請為使用者編織出：
        1. 專屬的人格封號 (title)：例如「迷霧中的秩序編織者」、「深夜的微縮守護者」等（長度約 6-12 字）。
        2. 深刻的詩意深度分析 (content)：結合他的分數，分析他在喧囂世界中的存在狀態，行文多用換行，讓畫面好看（約 150-250 字）。
        3. 一句生活處方 (prescription)：給予他一個非常具體、浪漫且生活化的療癒建議，例如用 p5.js 寫生成藝術、或是拼裝 1:24 的微縮模型細節打磨等（約 40-80 字）。
      `,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { 
              type: Type.STRING, 
              description: "人格結果封號，具有詩意與空間感。" 
            },
            content: { 
              type: Type.STRING, 
              description: "深度心靈特質分析文字，語氣溫柔療癒，可包含適當換行。" 
            },
            prescription: { 
              type: Type.STRING, 
              description: "給靈魂的生活處方建議，非常具體且具手作感或儀式感。" 
            },
          },
          required: ["title", "content", "prescription"],
        },
        temperature: 0.7, 
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("AI 沒有回應任何靈魂絮語。");
    }

    const result: AIAnalysisResult = JSON.parse(responseText);
    return result;

  } catch (error) {
    console.error("Gemini 靈魂編織失敗:", error);
    return {
      title: "靜謐的留白旅人",
      content: "工坊的絲線在深夜裡稍微交纏了。這代表你此時的內心正處於極度巨大的轉變期，連 AI 都選擇為你保持暫時的留白。請靜心感受當下的呼吸。",
      prescription: "關掉螢幕，給自己倒一杯溫水，在窗邊靜坐三分鐘。"
    };
  }
}