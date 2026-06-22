export interface Dimensions {
  solitude: number;
  tangible: number;
  order: number;
}

export interface Option {
  text: string;
  effect: Dimensions;
}

export interface Question {
  id: number;
  scene: string;
  content: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    scene: "指尖的溫度",
    content: "你在一個沒有時鐘的房間裡醒來，空氣裡漂浮著淡淡的木質香氣。推開門，眼前有兩條延伸的路，此時的你直覺想走向...",
    options: [
      {
        text: "左邊。一條鋪滿鵝卵石的小徑，兩旁是整齊修剪、帶著露水的植物。",
        effect: { order: 20, tangible: 10, solitude: 5 }
      },
      {
        text: "右邊。一條通往未知濃霧的木棧道，耳邊隱約傳來遠方的海浪聲。",
        effect: { order: -20, tangible: -10, solitude: 15 }
      }
    ]
  },
  {
    id: 2,
    scene: "時間的碎屑",
    content: "漫步途中，你在路邊發現了一個被人遺忘的精緻木盒。打開它，裡面靜靜躺著一件物品，你希望那是...",
    options: [
      {
        text: "一本沾有些許歲月痕跡的手寫日記，字跡工整，還夾著乾燥的花瓣。",
        effect: { tangible: 25, order: 15, solitude: 5 }
      },
      {
        text: "一個散發著微光的發光方塊，表面有著不斷流動、規律變幻的幾何光影。",
        effect: { tangible: -25, order: -5, solitude: -10 }
      }
    ]
  },
  {
    id: 3,
    scene: "午後的留白",
    content: "霧氣漸漸散去，前方出現了一家不收費的安靜茶館。你挑選了一個角落坐下，你希望這個下午...",
    options: [
      {
        text: "獨自坐在窗邊，攤開一張乾淨的畫紙，用鉛筆一筆一劃描繪窗外的風景。",
        effect: { solitude: 25, tangible: 15, order: 20 }
      },
      {
        text: "與剛認識的茶館主人隨興聊著彼此聽過的故事，任由話題隨著茶香漫遊。",
        effect: { solitude: -25, tangible: 0, order: -20 }
      }
    ]
  },
  {
    id: 4,
    scene: "玻璃之後",
    content: "你走進一間沒有標示名稱的展覽空間，所有展品都被安靜地懸掛在半空中。你最先被吸引的是...",
    options: [
      {
        text: "一排整齊排列的透明標本瓶，每一瓶都標示著精確的日期與名稱。",
        effect: { order: 25, tangible: 20, solitude: 5 }
      },
      {
        text: "一面不斷變化的光牆，影像像記憶碎片般閃爍、無法固定。",
        effect: { order: -20, tangible: -15, solitude: -5 }
      }
    ]
  },
  {
    id: 5,
    scene: "未寄出的信",
    content: "你在抽屜深處發現一封沒有寄出的信，你會希望它的內容是...",
    options: [
      {
        text: "清楚列出時間、事件與原因的紀錄，像一份整理過的生命備忘錄。",
        effect: { order: 20, tangible: 10, solitude: 10 }
      },
      {
        text: "充滿情緒與斷裂句子的獨白，即使混亂也保留當下的真實感受。",
        effect: { order: -15, solitude: 20, tangible: -5 }
      }
    ]
  },
  {
    id: 6,
    scene: "雨中的車站",
    content: "雨開始變大，你站在無人的車站月台，列車還未到站。你選擇...",
    options: [
      {
        text: "查看時刻表，確認每一班列車的到達與離開時間。",
        effect: { order: 25, tangible: 15, solitude: -5 }
      },
      {
        text: "不看時間，只專注聽雨滴落在鐵軌上的聲音。",
        effect: { order: -10, solitude: 20, tangible: -10 }
      }
    ]
  },
  {
    id: 7,
    scene: "房間的物件",
    content: "你被分配到一個陌生的房間，裡面只有三樣物品，你會先靠近...",
    options: [
      {
        text: "一張精確標記尺寸與比例的桌子與工具組。",
        effect: { order: 20, tangible: 25, solitude: 5 }
      },
      {
        text: "一盞會隨情緒變化亮度的燈，沒有固定形狀。",
        effect: { order: -15, tangible: -20, solitude: 10 }
      }
    ]
  },
  {
    id: 8,
    scene: "記憶的走廊",
    content: "你走進一條無盡的走廊，牆上浮現過去片段。你會停在...",
    options: [
      {
        text: "一段清晰可辨的日常畫面：書桌、筆記、固定的作息。",
        effect: { order: 25, tangible: 15, solitude: 10 }
      },
      {
        text: "一段模糊但強烈的情緒畫面：聲音、光影與感受交錯。",
        effect: { order: -20, tangible: -10, solitude: 15 }
      }
    ]
  },
  {
    id: 9,
    scene: "選擇的房間",
    content: "你被要求在兩個房間中選一個居住一週，你會選擇...",
    options: [
      {
        text: "所有物品都有固定位置與分類標籤的極簡房間。",
        effect: { order: 25, tangible: 20, solitude: 10 }
      },
      {
        text: "物品會每天改變位置與形式，但充滿未知感的流動空間。",
        effect: { order: -25, tangible: -15, solitude: -5 }
      }
    ]
  }
];