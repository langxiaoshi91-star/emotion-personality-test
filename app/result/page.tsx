"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, RotateCcw, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  dimensionKeys,
  emotionalPersonalityProfiles,
  type DimensionKey,
  type EmotionalPersonalityKey
} from "@/lib/quiz-data";

type DimensionRawScores = Record<DimensionKey, number>;
type DimensionPercentScores = Record<DimensionKey, number>;

const coreConclusions: Record<EmotionalPersonalityKey, string[]> = {
  wave: [
    "情绪模式：你很容易被回应速度和语气变化牵动。",
    "亲密关系模式：越在乎一个人，越需要确认自己没有被落下。",
    "冲突反应模式：关系一冷，你会先在心里反复寻找原因。",
    "内在需求：你真正想要的是稳定、明确、被放在心上。"
  ],
  mountain: [
    "情绪模式：你习惯先把情绪收起来，再慢慢自己处理。",
    "亲密关系模式：关系越靠近，你越需要确认自己的空间还在。",
    "冲突反应模式：压力一来，你会先沉默、抽离、保持距离。",
    "内在需求：你真正想要的是被理解，但不被逼迫打开。"
  ],
  moon: [
    "情绪模式：你能很快感受到别人没有说出口的变化。",
    "亲密关系模式：你渴望被懂得，也很怕自己的感受被轻轻带过。",
    "冲突反应模式：你不一定马上说，但会在心里回放很久。",
    "内在需求：你真正想要的是有人认真接住你的情绪。"
  ],
  mirror: [
    "情绪模式：你会先观察别人舒不舒服，再决定自己要不要表达。",
    "亲密关系模式：你容易为了关系和谐，把真实需求往后放。",
    "冲突反应模式：别人一失望，你会先怀疑是不是自己做错了。",
    "内在需求：你真正想要的是被喜欢，也被允许做自己。"
  ],
  flame: [
    "情绪模式：你的感受来得快，也很难假装没事。",
    "亲密关系模式：你需要明确态度，不喜欢模糊和冷处理。",
    "冲突反应模式：被忽视时，你会立刻想把答案问清楚。",
    "内在需求：你真正想要的是被坚定选择、被认真对待。"
  ],
  garden: [
    "情绪模式：你会先心疼别人，再处理自己的委屈。",
    "亲密关系模式：你容易用照顾和付出来维持关系稳定。",
    "冲突反应模式：受伤时你常常先忍住，继续替对方找理由。",
    "内在需求：你真正想要的是被需要，也被主动珍惜。"
  ],
  star: [
    "情绪模式：你很容易被意义感、理想感和失望感拉动。",
    "亲密关系模式：你需要精神连接，不只满足于表面的陪伴。",
    "冲突反应模式：现实一变普通，你会怀疑是不是哪里错了。",
    "内在需求：你真正想要的是被理解，也看见更深的未来。"
  ],
  forest: [
    "情绪模式：你习惯稳住局面，很少第一时间说自己累。",
    "亲密关系模式：你容易成为关系里的支柱和承担者。",
    "冲突反应模式：问题出现时，你会先扛下来，而不是先求助。",
    "内在需求：你真正想要的是稳定，也希望有人看见你的辛苦。"
  ]
};

const unfinishedProblems = [
  "你在关系中反复出现的模式，其实和早年的安全感有关。",
  "你对某些人特别敏感，其实不是简单的性格问题。",
  "你以为的性格缺点，其实可能是你一直在使用的保护机制。"
];

const fullReportBenefits = [
  "为什么你总在亲密关系中失控",
  "你最容易吸引什么类型的人",
  "你为什么总是过度在意别人",
  "你未来7天的改变路径",
  "你的情绪触发机制图谱"
];

function parseDimensionScore(value: string | null) {
  const score = Number(value);
  if (!Number.isFinite(score)) {
    return 5;
  }

  return Math.min(25, Math.max(5, Math.round(score)));
}

function getDimensionScores(searchParams: URLSearchParams) {
  return dimensionKeys.reduce(
    (scores, key) => {
      scores[key] = parseDimensionScore(searchParams.get(key));
      return scores;
    },
    {} as DimensionRawScores
  );
}

function hasDimensionScores(searchParams: URLSearchParams) {
  return dimensionKeys.some((key) => searchParams.has(key));
}

function toScorePercent(score: number) {
  return Math.round(((score - 5) / 20) * 100);
}

function getPercentScores(scores: DimensionRawScores) {
  return dimensionKeys.reduce(
    (acc, key) => {
      acc[key] = toScorePercent(scores[key]);
      return acc;
    },
    {} as DimensionPercentScores
  );
}

function isHighestDimension(dimension: DimensionKey, scores: DimensionPercentScores) {
  return dimensionKeys.every((key) => scores[dimension] >= scores[key]);
}

function determineEmotionalPersonality(scores: DimensionPercentScores): EmotionalPersonalityKey {
  const attachmentAnxiety = scores.attachmentAnxiety;
  const intimacyAvoidance = scores.intimacyAvoidance;
  const emotionalSensitivity = scores.emotionalSensitivity;
  const boundaryPeoplePleasing = scores.boundaryPeoplePleasing;

  if (
    attachmentAnxiety >= 60 &&
    emotionalSensitivity >= 60 &&
    attachmentAnxiety > intimacyAvoidance &&
    attachmentAnxiety > boundaryPeoplePleasing &&
    emotionalSensitivity > intimacyAvoidance &&
    emotionalSensitivity > boundaryPeoplePleasing
  ) {
    return "flame";
  }

  if (
    boundaryPeoplePleasing >= 60 &&
    attachmentAnxiety >= 50 &&
    boundaryPeoplePleasing > intimacyAvoidance
  ) {
    return "garden";
  }

  if (
    emotionalSensitivity >= 60 &&
    attachmentAnxiety >= 50 &&
    intimacyAvoidance < 60
  ) {
    return "star";
  }

  if (isHighestDimension("attachmentAnxiety", scores) && attachmentAnxiety >= 60) {
    return "wave";
  }

  if (isHighestDimension("intimacyAvoidance", scores) && intimacyAvoidance >= 60) {
    return "mountain";
  }

  if (isHighestDimension("emotionalSensitivity", scores) && emotionalSensitivity >= 60) {
    return "moon";
  }

  if (isHighestDimension("boundaryPeoplePleasing", scores) && boundaryPeoplePleasing >= 60) {
    return "mirror";
  }

  return "forest";
}

function getMatchPercent(scores: DimensionPercentScores) {
  return Math.max(...dimensionKeys.map((key) => scores[key]));
}

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultContent />
    </Suspense>
  );
}

function ResultLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8">
      <section className="soft-shadow max-w-md rounded-[2rem] border border-white/80 bg-white/80 p-7 text-center backdrop-blur">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-500">
          <Sparkles size={26} />
        </div>
        <p className="text-base font-black text-[#3f2d2f]">正在生成你的结果...</p>
      </section>
    </main>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const dimensionScores = getDimensionScores(searchParams);
  const percentScores = getPercentScores(dimensionScores);
  const resultKey = hasDimensionScores(searchParams)
    ? determineEmotionalPersonality(percentScores)
    : null;
  const profile = resultKey ? emotionalPersonalityProfiles[resultKey] : null;
  const matchPercent = getMatchPercent(percentScores);

  if (!profile || !resultKey) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-8">
        <section className="soft-shadow max-w-md rounded-[2rem] border border-white/80 bg-white/80 p-7 text-center backdrop-blur">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-500">
            <Sparkles size={26} />
          </div>
          <h1 className="text-2xl font-black text-[#3f2d2f]">还没有生成结果</h1>
          <p className="mt-3 text-sm leading-7 text-[#735f61]">
            这个结果链接暂时不可用。完成 20 道题后，就能看到属于你的情感人格画像。
          </p>
          <Link
            href="/test"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3f2d2f] px-5 py-4 font-bold text-white"
          >
            去完成测试
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-5 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-5 flex items-center justify-between rounded-full border border-white/75 bg-white/70 px-4 py-3 backdrop-blur">
          <Link
            href="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-100"
            aria-label="返回首页"
          >
            <ArrowLeft size={19} />
          </Link>
          <p className="text-sm font-black text-[#3f2d2f]">免费结果页</p>
          <Link
            href="/test"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-100"
            aria-label="重新测试"
          >
            <RotateCcw size={18} />
          </Link>
        </nav>

        <section className="soft-shadow overflow-hidden rounded-[2rem] border border-white/80 bg-white/86 backdrop-blur">
          <div className={`bg-gradient-to-br ${profile.color} px-6 py-8 text-white sm:px-8`}>
            <p className="text-sm font-bold text-white/82">你的情感人格倾向是</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">
              <span className="mr-3">{profile.icon}</span>
              {profile.name}
            </h1>
            <p className="mt-3 text-base font-bold text-white/86">{profile.tendency}</p>

            <div className="mt-7 rounded-[1.5rem] bg-white/18 p-5">
              <p className="text-sm font-bold text-white/78">匹配度</p>
              <p className="mt-1 text-5xl font-black">{matchPercent}%</p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/18">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${matchPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-5 p-5 sm:p-8">
            <section className="rounded-[1.5rem] border border-rose-100 bg-white/74 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-lg font-black text-[#3f2d2f]">👉 你的核心人格结论</h2>
                <span className="shrink-0 rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-700">
                  简化版
                </span>
              </div>
              <div className="grid gap-3">
                {coreConclusions[resultKey].map((item) => (
                  <p
                    key={item}
                    className="rounded-2xl bg-[#fff8f4] px-4 py-3 text-sm font-bold leading-6 text-[#674f52]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-rose-100 bg-rose-50 p-5 text-center">
              <p className="text-sm font-black text-rose-700">以下内容为简化版分析</p>
              <p className="mt-2 text-2xl font-black text-[#3f2d2f]">你看到的，只是冰山一角</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-[#6b5557]">
                免费版只展示10%的分析内容，完整版包含更深层心理结构分析。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-black text-[#3f2d2f]">3个核心特点</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {profile.keywords.slice(0, 3).map((keyword) => (
                  <div
                    key={keyword}
                    className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-4 text-center text-sm font-black text-rose-700"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-rose-100 bg-[#fff8f4] p-5">
              <h2 className="mb-3 text-lg font-black text-[#3f2d2f]">简短分析</h2>
              <p className="text-sm leading-7 text-[#6b5557]">{profile.basicSummary}</p>
            </section>

            <section className="rounded-[1.5rem] border border-rose-100 bg-white/74 p-5">
              <h2 className="mb-3 text-lg font-black text-[#3f2d2f]">
                👉 你真正的核心问题（完整版才会告诉你）
              </h2>
              <div className="space-y-3">
                {unfinishedProblems.map((item) => (
                  <p
                    key={item}
                    className="rounded-2xl bg-[#fff8f4] px-4 py-3 text-sm font-bold leading-6 text-[#674f52]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-rose-100 bg-white p-5">
              <h2 className="mb-3 text-lg font-black text-[#3f2d2f]">👉 完整版你将获得什么</h2>
              <div className="grid gap-3">
                {fullReportBenefits.map((item) => (
                  <p
                    key={item}
                    className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-black leading-6 text-rose-700"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </section>

            <p className="text-center text-sm font-black text-rose-600">
              已有 12,846 人查看完整分析
            </p>
            <Link
              href={`/pay?type=${resultKey}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3f2d2f] px-5 py-4 text-base font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-[#2f2022]"
            >
              <LockKeyhole size={18} />
              👉 解锁我的完整人格报告（¥19.9）
            </Link>
          </div>
        </section>

        <p className="mt-5 text-center text-xs leading-6 text-[#927b7e]">
          本测试仅用于情感自我探索，不作为医学或心理诊断依据。
        </p>
      </div>
    </main>
  );
}
