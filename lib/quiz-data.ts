export type PersonalityKey = "pleaser" | "anxious" | "avoidant" | "sensitive";

export type EmotionalPersonalityKey =
  | "wave"
  | "mountain"
  | "moon"
  | "mirror"
  | "flame"
  | "garden"
  | "star"
  | "forest";

export type DimensionKey =
  | "attachmentAnxiety"
  | "intimacyAvoidance"
  | "emotionalSensitivity"
  | "boundaryPeoplePleasing";

export type QuizQuestion = {
  id: number;
  question: string;
  dimension: DimensionKey;
};

export type DimensionProfile = {
  label: string;
  description: string;
  resultType: PersonalityKey;
};

export type PersonalityProfile = {
  name: string;
  subtitle: string;
  basicAnalysis: string;
  whyExplanation: string;
  badge: string;
  color: string;
  coreTraits: string[];
  lovePattern: string;
  painSource: string;
  healingAdvice: string[];
};

export type EmotionalPersonalityProfile = {
  icon: string;
  name: string;
  tendency: string;
  color: string;
  keywords: string[];
  basicSummary: string;
};

export const dimensionProfiles: Record<DimensionKey, DimensionProfile> = {
  attachmentAnxiety: {
    label: "依恋焦虑",
    description: "关系中的不确定、害怕失去和反复确认需求。",
    resultType: "anxious"
  },
  intimacyAvoidance: {
    label: "亲密回避",
    description: "面对靠近、承诺和脆弱表达时的压力与抽离。",
    resultType: "avoidant"
  },
  emotionalSensitivity: {
    label: "情绪敏感",
    description: "对语气、氛围、细节和他人情绪的高强度感知。",
    resultType: "sensitive"
  },
  boundaryPeoplePleasing: {
    label: "边界/讨好",
    description: "害怕拒绝、优先照顾别人、事后感到委屈。",
    resultType: "pleaser"
  }
};

export const dimensionKeys: DimensionKey[] = [
  "attachmentAnxiety",
  "intimacyAvoidance",
  "emotionalSensitivity",
  "boundaryPeoplePleasing"
];

export const emotionalPersonalityProfiles: Record<
  EmotionalPersonalityKey,
  EmotionalPersonalityProfile
> = {
  wave: {
    icon: "🌊",
    name: "海浪型",
    tendency: "焦虑依恋倾向",
    color: "from-sky-400 to-cyan-500",
    keywords: ["害怕失去", "需要确认", "关系不安"],
    basicSummary: "你很重视关系中的回应和确定感，也容易在不确定中感到不安。"
  },
  mountain: {
    icon: "⛰️",
    name: "山峰型",
    tendency: "回避依恋倾向",
    color: "from-slate-500 to-teal-500",
    keywords: ["害怕靠近", "习惯独处", "隐藏脆弱"],
    basicSummary: "你渴望被理解，但当关系太近时，也会本能地想保护自己的空间。"
  },
  moon: {
    icon: "🌙",
    name: "月亮型",
    tendency: "高敏感倾向",
    color: "from-violet-400 to-fuchsia-500",
    keywords: ["感知细腻", "容易内耗", "共情强"],
    basicSummary: "你对关系中的细节和情绪变化非常敏感，容易把很多感受留在心里。"
  },
  mirror: {
    icon: "🪞",
    name: "镜子型",
    tendency: "讨好牺牲倾向",
    color: "from-rose-400 to-pink-500",
    keywords: ["不敢拒绝", "过度照顾", "忽视自我"],
    basicSummary: "你很在意别人的感受，常常为了关系和谐而忽略自己的需求。"
  },
  flame: {
    icon: "🔥",
    name: "火焰型",
    tendency: "情绪拉扯倾向",
    color: "from-orange-400 to-rose-500",
    keywords: ["爱得强烈", "容易冲动", "情绪起伏大"],
    basicSummary: "你在关系里感受强烈，爱得认真，也容易被情绪拉着走。"
  },
  garden: {
    icon: "🌷",
    name: "花园型",
    tendency: "照顾付出倾向",
    color: "from-emerald-400 to-rose-400",
    keywords: ["温柔照顾", "渴望稳定", "容易委屈"],
    basicSummary: "你习惯照顾和付出，希望关系稳定，但也容易在付出后感到委屈。"
  },
  star: {
    icon: "✨",
    name: "星辰型",
    tendency: "理想投射倾向",
    color: "from-indigo-400 to-pink-400",
    keywords: ["浪漫想象", "容易美化", "期待灵魂共鸣"],
    basicSummary: "你对亲密关系有很高的期待，容易被理想化的感受吸引。"
  },
  forest: {
    icon: "🌲",
    name: "森林型",
    tendency: "稳定边界倾向",
    color: "from-green-500 to-teal-500",
    keywords: ["边界较稳", "自我感清晰", "关系节奏稳定"],
    basicSummary: "你的情绪和边界相对稳定，通常能在关系里保留较清晰的自我感。"
  }
};

export const personalityProfiles: Record<PersonalityKey, PersonalityProfile> = {
  pleaser: {
    name: "讨好型",
    subtitle: "你很会照顾别人，也需要学会把自己放回心上。",
    basicAnalysis:
      "你在关系里很容易先照顾对方的情绪，习惯用体贴、懂事和付出来维持稳定。你不是没有需求，只是太擅长把自己的感受往后放。这样的你温柔、有共情力，也很容易在长期迁就里感到委屈和疲惫。",
    whyExplanation:
      "你会这样，往往是因为你把“被喜欢”和“表现得足够好”联系在了一起。关系一紧张，你会本能地先修复对方的感受，而不是确认自己是否也被好好对待。",
    badge: "温柔照顾者",
    color: "from-rose-400 to-pink-500",
    coreTraits: ["共情力强", "害怕让人失望", "容易先满足别人", "对关系变化很敏锐"],
    lovePattern:
      "你常常用付出换取安全感，习惯先观察对方的需要，再决定自己能不能表达真实想法。",
    painSource:
      "最深的消耗来自长期压住需求。你害怕冲突，也害怕被认为麻烦，于是把委屈一点点收进心里。",
    healingAdvice: [
      "每天练习说一句小小的真实感受，比如“我今天有点累”。",
      "把帮助别人和牺牲自己分开，先确认自己是否真的愿意。",
      "关系里的爱不只来自懂事，也来自你被看见、被照顾、被允许有边界。"
    ]
  },
  anxious: {
    name: "焦虑依恋型",
    subtitle: "你渴望稳定回应，心里住着一个很怕被落下的自己。",
    basicAnalysis:
      "你在亲密关系里很重视回应和确定感。对方的语气、回复速度、态度变化，都会牵动你的情绪。你爱得真诚，也容易因为不确定而反复确认。你真正需要的不是更多猜测，而是稳定、清楚、让人安心的连接。",
    whyExplanation:
      "你会这样，可能是因为你对关系变化特别敏感，内心很害怕突然失去。只要对方变得模糊，你的大脑就会自动寻找线索，试图提前保护自己。",
    badge: "靠近确认者",
    color: "from-orange-300 to-rose-400",
    coreTraits: ["重视回应", "容易反复确认", "怕冷淡和失联", "爱得真诚又用力"],
    lovePattern:
      "你在亲密关系中很需要连接感。对方的语气、回复速度、情绪变化，都可能牵动你的安全感。",
    painSource:
      "痛苦常来自不确定。你不是太敏感，而是曾经很努力靠近，却没有得到足够稳定的接住。",
    healingAdvice: [
      "焦虑升起时，先给身体降温：喝水、深呼吸、离开手机五分钟。",
      "把“对方没回”改写成多个可能，而不是直接等同于“不爱了”。",
      "建立自己的稳定节奏，让安全感不只挂在某一个人的回应上。"
    ]
  },
  avoidant: {
    name: "回避防御型",
    subtitle: "你不是没有感情，只是习惯先保护自己再靠近别人。",
    basicAnalysis:
      "你在关系里很需要空间和节奏感。你并非冷漠，只是不喜欢被强迫打开，也不习惯在压力下立刻表达情绪。当关系靠得太快、问得太细，你会本能地后退。你的爱更像慢慢确认，而不是快速交付。",
    whyExplanation:
      "你会这样，常常是因为你把亲密和失控、被要求、被束缚联系在一起。保持距离会让你感觉安全，也让你有时间判断这段关系是否值得信任。",
    badge: "安静防御者",
    color: "from-sky-300 to-teal-400",
    coreTraits: ["重视空间", "不爱被逼问", "情绪慢热", "压力大时会抽离"],
    lovePattern:
      "你需要在可控、舒服的距离里慢慢建立信任。太快的靠近会让你想撤退，哪怕你其实在乎。",
    painSource:
      "痛苦常来自亲密和自由的拉扯。你想被理解，却又害怕一旦依赖别人，就会失去主动权。",
    healingAdvice: [
      "不必强迫自己立刻敞开，可以先表达“我需要一点时间”。",
      "练习把沉默变成说明，让对方知道你是在整理，不是在否定关系。",
      "真正安全的关系不会吞掉你，它会给你空间，也欢迎你回来。"
    ]
  },
  sensitive: {
    name: "高敏感消耗型",
    subtitle: "你能捕捉许多细节，也容易被太多情绪同时淹没。",
    basicAnalysis:
      "你对关系里的细节、语气和氛围非常敏锐，能感受到很多没被说出口的变化。你的感受力很强，也因此容易被他人的情绪牵动。你不是脆弱，而是接收得太多，需要更清晰地分辨哪些情绪属于你。",
    whyExplanation:
      "你会这样，是因为你的情绪雷达很灵敏。别人一个停顿、一句轻描淡写的话，都可能被你捕捉并放大，于是你会不自觉承担过多关系压力。",
    badge: "细腻感受者",
    color: "from-violet-300 to-fuchsia-400",
    coreTraits: ["感受细腻", "容易共振", "需要安静恢复", "对语气和氛围敏感"],
    lovePattern:
      "你在关系里很会感知细节，能读懂很多没被说出口的东西，也因此容易承担过量情绪。",
    painSource:
      "最大的消耗来自过度吸收。你可能把别人的低落、冷淡、迟疑都归因到自己身上。",
    healingAdvice: [
      "把感受到的情绪分成“我的”和“别人的”，先不急着全部负责。",
      "给自己安排固定的低刺激时间，让神经系统慢慢回到平稳。",
      "你的细腻是天赋，但天赋也需要边界来保护。"
    ]
  }
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    dimension: "attachmentAnxiety",
    question: "喜欢的人很久没有回复消息时，我会反复猜想是不是自己哪里做错了。"
  },
  {
    id: 2,
    dimension: "attachmentAnxiety",
    question: "关系越亲近，我越容易担心对方有一天会突然离开。"
  },
  {
    id: 3,
    dimension: "attachmentAnxiety",
    question: "对方语气稍微变冷，我就会明显不安，想立刻确认关系是否还好。"
  },
  {
    id: 4,
    dimension: "attachmentAnxiety",
    question: "我需要对方比较明确地表达在乎和爱意，才会真正安心。"
  },
  {
    id: 5,
    dimension: "attachmentAnxiety",
    question: "在亲密关系里，我很容易因为对方的小变化陷入胡思乱想。"
  },
  {
    id: 6,
    dimension: "intimacyAvoidance",
    question: "当别人想更深入了解我时，我会本能地想保留一部分距离。"
  },
  {
    id: 7,
    dimension: "intimacyAvoidance",
    question: "遇到难过或脆弱的事情，我更习惯自己消化，而不是告诉伴侣。"
  },
  {
    id: 8,
    dimension: "intimacyAvoidance",
    question: "如果一段关系联系太频繁、黏得太紧，我会觉得有压力。"
  },
  {
    id: 9,
    dimension: "intimacyAvoidance",
    question: "我不太喜欢在亲密关系里暴露自己的脆弱和真实需求。"
  },
  {
    id: 10,
    dimension: "intimacyAvoidance",
    question: "当对方要求更多承诺、陪伴或情绪回应时，我有时会想逃开。"
  },
  {
    id: 11,
    dimension: "emotionalSensitivity",
    question: "我很容易察觉别人语气、表情或态度里的细微变化。"
  },
  {
    id: 12,
    dimension: "emotionalSensitivity",
    question: "别人一句无心的话，我可能会在心里想很久。"
  },
  {
    id: 13,
    dimension: "emotionalSensitivity",
    question: "在嘈杂、人多或情绪浓度很高的环境里，我容易感到疲惫。"
  },
  {
    id: 14,
    dimension: "emotionalSensitivity",
    question: "我经常能感受到别人没有直接说出口的情绪。"
  },
  {
    id: 15,
    dimension: "emotionalSensitivity",
    question: "关系里的一个小细节，可能会影响我一整天的心情。"
  },
  {
    id: 16,
    dimension: "boundaryPeoplePleasing",
    question: "明明心里不愿意，我也常常因为怕别人失望而答应。"
  },
  {
    id: 17,
    dimension: "boundaryPeoplePleasing",
    question: "面对亲近的人，我很难直接拒绝对方的请求。"
  },
  {
    id: 18,
    dimension: "boundaryPeoplePleasing",
    question: "我经常先考虑对方会不会不舒服，再考虑自己愿不愿意。"
  },
  {
    id: 19,
    dimension: "boundaryPeoplePleasing",
    question: "我害怕表达自己的需求后，被别人觉得麻烦、矫情或不懂事。"
  },
  {
    id: 20,
    dimension: "boundaryPeoplePleasing",
    question: "在关系里我容易付出很多，但事后又觉得委屈或不被看见。"
  }
];

export const personalityKeys: PersonalityKey[] = [
  "pleaser",
  "anxious",
  "avoidant",
  "sensitive"
];
