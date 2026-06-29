"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Send } from "lucide-react";
import Link from "next/link";
import {
  dimensionKeys,
  quizQuestions,
  type DimensionKey
} from "@/lib/quiz-data";

type ScoreValue = 1 | 2 | 3 | 4 | 5;
type AnswerMap = Record<number, ScoreValue>;
type DimensionScores = Record<DimensionKey, number>;

const scaleOptions: Array<{ label: string; value: ScoreValue }> = [
  { value: 1, label: "完全不符合" },
  { value: 2, label: "不太符合" },
  { value: 3, label: "说不清/一般" },
  { value: 4, label: "比较符合" },
  { value: 5, label: "非常符合" }
];

export default function TestPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showHint, setShowHint] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === quizQuestions.length;
  const progress = Math.round((answeredCount / quizQuestions.length) * 100);

  const missingQuestion = useMemo(
    () => quizQuestions.find((item) => !answers[item.id])?.id,
    [answers]
  );

  function chooseAnswer(questionId: number, score: ScoreValue) {
    setAnswers((current) => ({ ...current, [questionId]: score }));
    setShowHint(false);
  }

  function calculateScores() {
    return quizQuestions.reduce(
      (scores, question) => {
        scores[question.dimension] += answers[question.id] ?? 0;
        return scores;
      },
      dimensionKeys.reduce(
        (acc, key) => ({ ...acc, [key]: 0 }),
        {} as DimensionScores
      )
    );
  }

  function buildResultUrl() {
    const scores = calculateScores();
    const params = new URLSearchParams();

    dimensionKeys.forEach((key) => {
      params.set(key, String(scores[key]));
    });

    return `/result?${params.toString()}`;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isComplete) {
      setShowHint(true);
      if (missingQuestion) {
        document.getElementById(`question-${missingQuestion}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
      return;
    }

    router.push(buildResultUrl());
  }

  return (
    <main className="min-h-screen px-4 py-5 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="sticky top-3 z-10 mb-5 rounded-[1.5rem] border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur">
          <div className="mb-3 flex items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition hover:bg-rose-100"
              aria-label="返回首页"
            >
              <ArrowLeft size={19} />
            </Link>
            <div className="text-right">
              <p className="text-xs font-bold text-rose-500">已完成 {answeredCount}/20</p>
              <p className="text-xs text-[#8b7477]">1 完全不符合 · 5 非常符合</p>
            </div>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-rose-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <section className="mb-5 rounded-[1.5rem] border border-white/80 bg-white/72 p-4 text-sm leading-7 text-[#6b5557] backdrop-blur">
          <p className="font-black text-[#3f2d2f]">测试说明</p>
          <p className="mt-1">
            每道题请选择 1-5 分：1 = 完全不符合，2 = 不太符合，3 = 说不清/一般，4 = 比较符合，5 = 非常符合。
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          {quizQuestions.map((item) => (
            <section
              key={item.id}
              id={`question-${item.id}`}
              className="soft-shadow rounded-[1.75rem] border border-white/80 bg-white/78 p-5 backdrop-blur"
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3f2d2f] text-sm font-black text-white">
                  {item.id}
                </span>
                <h2 className="pt-1 text-lg font-black leading-7 text-[#3f2d2f]">
                  {item.question}
                </h2>
              </div>

              <div className="grid gap-2">
                {scaleOptions.map((option) => {
                  const isSelected = answers[item.id] === option.value;
                  return (
                    <button
                      type="button"
                      key={`${item.id}-${option.value}`}
                      onClick={() => chooseAnswer(item.id, option.value)}
                      className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm leading-6 transition ${
                        isSelected
                          ? "border-rose-300 bg-rose-50 text-rose-800 shadow-sm"
                          : "border-rose-100 bg-white/76 text-[#6f5a5d] hover:border-rose-200 hover:bg-rose-50/70"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                          isSelected
                            ? "bg-rose-500 text-white"
                            : "bg-[#f7ebe8] text-[#8b7477]"
                        }`}
                      >
                        {isSelected ? <Check size={15} /> : option.value}
                      </span>
                      <span className="font-semibold">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          <div className="sticky bottom-3 rounded-[1.5rem] border border-white/80 bg-white/86 p-3 shadow-lg shadow-rose-100 backdrop-blur">
            {showHint && missingQuestion ? (
              <p className="mb-3 text-center text-sm font-semibold text-rose-600">
                还差第 {missingQuestion} 题，答完就能看到结果。
              </p>
            ) : null}
            <button
              type="submit"
              className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-base font-black transition ${
                isComplete
                  ? "bg-[#3f2d2f] text-white shadow-lg shadow-rose-200 hover:-translate-y-0.5 hover:bg-[#2f2022]"
                  : "bg-rose-100 text-rose-400"
              }`}
            >
              <Send size={18} />
              {isComplete ? "查看我的人格结果" : `继续完成 ${quizQuestions.length - answeredCount} 题`}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
