export interface QuestionOption {
  text: string;
  weights: {
    extraversion?: number;
    intuition?: number;
    thinking?: number;
    judging?: number;
    adventurous?: number;
    independent?: number;
  };
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export const quickQuestions: Question[] = [
  {
    id: 1,
    text: "在星穹列车的派对上，你会怎么做？",
    options: [
      { text: "主动认识新朋友，成为派对焦点", weights: { extraversion: 8, independent: -3 } },
      { text: "和熟悉的朋友聊天，享受轻松氛围", weights: { extraversion: 2, independent: -1 } },
      { text: "找个安静的角落观察大家", weights: { extraversion: -6, independent: 4 } },
      { text: "提前离开，去做自己的事", weights: { extraversion: -8, independent: 8 } }
    ]
  },
  {
    id: 2,
    text: "面对未知的星球，你的第一反应是？",
    options: [
      { text: "兴奋！立刻想去探索每一个角落", weights: { adventurous: 10, intuition: 6 } },
      { text: "先收集情报，制定探索计划", weights: { adventurous: 3, intuition: 4, judging: 6 } },
      { text: "谨慎观察，确保安全再行动", weights: { adventurous: -3, intuition: 2, judging: 4 } },
      { text: "让别人先去，我殿后", weights: { adventurous: -6, independent: -4 } }
    ]
  },
  {
    id: 3,
    text: "团队遇到危机时，你倾向于？",
    options: [
      { text: "站出来指挥，带领大家脱困", weights: { extraversion: 6, thinking: 4, independent: 4 } },
      { text: "配合团队，做好自己的分工", weights: { extraversion: 2, independent: -4 } },
      { text: "独自寻找突破口，不按常理出牌", weights: { extraversion: -2, independent: 8, adventurous: 6 } },
      { text: "安抚大家情绪，保持团队士气", weights: { extraversion: 4, thinking: -6, independent: -2 } }
    ]
  },
  {
    id: 4,
    text: "你更相信什么？",
    options: [
      { text: "直觉和灵感，第六感往往很准", weights: { intuition: 8, thinking: -3 } },
      { text: "逻辑和数据，事实胜于雄辩", weights: { intuition: -4, thinking: 8 } },
      { text: "经验和传统，经过验证的才可靠", weights: { intuition: -6, thinking: 4, judging: 6 } },
      { text: "内心感受，跟着心走不会错", weights: { intuition: 4, thinking: -8 } }
    ]
  },
  {
    id: 5,
    text: "面对重要决定，你通常？",
    options: [
      { text: "迅速决断，不拖泥带水", weights: { judging: 8, thinking: 4 } },
      { text: "深思熟虑，权衡所有可能性", weights: { judging: 4, intuition: 4, thinking: 4 } },
      { text: "随缘而定，走一步看一步", weights: { judging: -8, adventurous: 4 } },
      { text: "咨询信任的人，参考他人意见", weights: { judging: 2, independent: -6 } }
    ]
  },
  {
    id: 6,
    text: "如果获得星神的力量，你会？",
    options: [
      { text: "用来保护重要的人和世界", weights: { thinking: -4, independent: -2, adventurous: 2 } },
      { text: "追求更高的知识和真理", weights: { intuition: 6, thinking: 6, independent: 4 } },
      { text: "打破规则，创造新的秩序", weights: { judging: -6, independent: 8, adventurous: 8 } },
      { text: "隐藏起来，过平静的生活", weights: { extraversion: -6, adventurous: -6, independent: 2 } }
    ]
  }
];

export const detailedQuestions: Question[] = [
  ...quickQuestions,
  {
    id: 7,
    text: "在仙舟「罗浮」的集市上，你更可能被什么吸引？",
    options: [
      { text: "热闹的表演和美食摊位", weights: { extraversion: 6, adventurous: 4 } },
      { text: "古籍书店和神秘法器", weights: { intuition: 6, thinking: 4, extraversion: -2 } },
      { text: "武器铺和战斗训练场", weights: { adventurous: 6, thinking: 2, independent: 4 } },
      { text: "药铺和医馆", weights: { thinking: -4, judging: 4, adventurous: -2 } }
    ]
  },
  {
    id: 8,
    text: "当朋友向你倾诉烦恼时，你会？",
    options: [
      { text: "认真倾听，给出实际建议", weights: { thinking: 4, judging: 4, extraversion: 2 } },
      { text: "感同身受，陪伴和安慰", weights: { thinking: -6, extraversion: 2 } },
      { text: "分析问题根源，帮助理清思路", weights: { thinking: 8, intuition: 4, extraversion: -2 } },
      { text: "转移注意力，带TA去做开心的事", weights: { thinking: -4, adventurous: 6, extraversion: 4 } }
    ]
  },
  {
    id: 9,
    text: "你理想的生活方式是？",
    options: [
      { text: "充满冒险和挑战，不断突破自我", weights: { adventurous: 10, independent: 6, judging: -4 } },
      { text: "安稳有序，按部就班地实现目标", weights: { adventurous: -6, judging: 8, independent: 2 } },
      { text: "自由自在，不受任何约束", weights: { adventurous: 6, independent: 10, judging: -8 } },
      { text: "和志同道合的人一起，共同成长", weights: { extraversion: 4, independent: -6, adventurous: 2 } }
    ]
  },
  {
    id: 10,
    text: "面对敌人的挑衅，你的反应是？",
    options: [
      { text: "正面迎战，用实力说话", weights: { extraversion: 4, adventurous: 8, thinking: 2 } },
      { text: "冷静分析，寻找对方弱点", weights: { extraversion: -2, thinking: 8, intuition: 4 } },
      { text: "用言语反击，气势上不能输", weights: { extraversion: 6, thinking: -2, adventurous: 4 } },
      { text: "避其锋芒，等待最佳时机", weights: { extraversion: -4, thinking: 4, judging: 4 } }
    ]
  },
  {
    id: 11,
    text: "你如何看待规则和秩序？",
    options: [
      { text: "规则是必要的，维护秩序很重要", weights: { judging: 8, thinking: 4, independent: -2 } },
      { text: "规则可以灵活变通，视情况而定", weights: { judging: -2, intuition: 4, thinking: 2 } },
      { text: "规则就是用来打破的", weights: { judging: -10, independent: 8, adventurous: 6 } },
      { text: "只遵守自己认同的规则", weights: { judging: -4, thinking: 2, independent: 6 } }
    ]
  },
  {
    id: 12,
    text: "在贝洛伯格的永冬中，你最想做什么？",
    options: [
      { text: "组织大家寻找取暖方法，共度难关", weights: { extraversion: 4, thinking: -4, independent: -4 } },
      { text: "独自研究破解永冬的方法", weights: { extraversion: -6, intuition: 6, thinking: 6, independent: 8 } },
      { text: "加入战斗，保护平民安全", weights: { adventurous: 8, thinking: 2, independent: 2 } },
      { text: "记录这个时代，留下历史见证", weights: { extraversion: -2, intuition: 4, adventurous: -2 } }
    ]
  },
  {
    id: 13,
    text: "你更欣赏哪种领导者？",
    options: [
      { text: "景元将军——运筹帷幄，深谋远虑", weights: { intuition: 6, thinking: 4, judging: 4 } },
      { text: "飞霄将军——身先士卒，战无不胜", weights: { adventurous: 8, extraversion: 4, thinking: 2 } },
      { text: "姬子——温柔坚定，引领方向", weights: { thinking: -4, intuition: 4, extraversion: 2 } },
      { text: "不需要领导者，每个人自主最好", weights: { independent: 10, extraversion: -2, judging: -6 } }
    ]
  },
  {
    id: 14,
    text: "面对失败，你通常会？",
    options: [
      { text: "总结经验，立刻重新尝试", weights: { judging: 6, thinking: 4, adventurous: 4 } },
      { text: "反思原因，调整策略后再出发", weights: { judging: 4, intuition: 4, thinking: 6 } },
      { text: "暂时放下，等心情平复再说", weights: { judging: -4, thinking: -2, extraversion: -2 } },
      { text: "换个方向，也许这条路不适合我", weights: { judging: -6, intuition: 6, adventurous: 4 } }
    ]
  },
  {
    id: 15,
    text: "在空间站「黑塔」，你最想和谁交流？",
    options: [
      { text: "黑塔本人——探讨知识和真理", weights: { intuition: 8, thinking: 6, extraversion: 2 } },
      { text: "艾丝妲——聊聊宇宙和梦想", weights: { extraversion: 4, intuition: 6, adventurous: 4 } },
      { text: "阮梅——研究生命的奥秘", weights: { intuition: 8, thinking: 4, extraversion: -4 } },
      { text: "独自在图书馆查阅资料", weights: { extraversion: -8, intuition: 4, independent: 6 } }
    ]
  },
  {
    id: 16,
    text: "你认为什么是真正的强大？",
    options: [
      { text: "保护他人的力量", weights: { thinking: -6, extraversion: 2, independent: -4 } },
      { text: "战胜一切的武力", weights: { adventurous: 6, thinking: 4, independent: 4 } },
      { text: "洞察一切的智慧", weights: { intuition: 8, thinking: 6, independent: 2 } },
      { text: "不被任何事物束缚的自由", weights: { independent: 10, judging: -6, adventurous: 6 } }
    ]
  },
  {
    id: 17,
    text: "如果可以选择一个命途，你会选择？",
    options: [
      { text: "同谐——连接众人，共创和谐", weights: { extraversion: 4, thinking: -4, independent: -8 } },
      { text: "巡猎——追寻目标，永不止步", weights: { judging: 6, adventurous: 6, independent: 4 } },
      { text: "智识——探索真理，追求知识", weights: { intuition: 8, thinking: 6, extraversion: -2 } },
      { text: "毁灭——打破旧局，重塑一切", weights: { adventurous: 8, independent: 6, judging: -4 } }
    ]
  },
  {
    id: 18,
    text: "在银河冒险中，最让你兴奋的是？",
    options: [
      { text: "结识来自不同星球的朋友", weights: { extraversion: 8, thinking: -4, adventurous: 4 } },
      { text: "发现未知的文明和秘密", weights: { intuition: 10, adventurous: 6, extraversion: -2 } },
      { text: "战胜强大的敌人，证明实力", weights: { adventurous: 8, thinking: 2, extraversion: 2 } },
      { text: "找到属于自己的归宿", weights: { extraversion: -2, thinking: -4, judging: 4, adventurous: -2 } }
    ]
  }
];
