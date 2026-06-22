export interface Dimensions {
  solitude: number; // 獨處傾向 (0 = 連結, 100 = 獨處)
  tangible: number; // 實體觸感 (0 = 想像, 100 = 實體)
  order: number; // 秩序細膩 (0 = 隨興, 100 = 秩序)
}

export interface Option {
  text: string;
  effect: Dimensions; // 選擇該選項會對維度造成的加減分
}

export interface Question {
  id: number;
  scene: string;
  content: string;
  options: Option[];
}

export interface AIAnalysisResult {
  title: string;
  content: string;
  prescription: string;
}