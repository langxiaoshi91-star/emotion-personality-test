"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  emotionalPersonalityProfiles,
  type EmotionalPersonalityKey
} from "@/lib/quiz-data";

const personalityKeys = [
  "wave",
  "mountain",
  "moon",
  "mirror",
  "flame",
  "garden",
  "star",
  "forest"
] as const;

function getPersonalityKey(value: string | null): EmotionalPersonalityKey {
  return personalityKeys.includes(value as EmotionalPersonalityKey)
    ? (value as EmotionalPersonalityKey)
    : "wave";
}

export default function PayPage() {
  return (
    <Suspense fallback={<PayLoading />}>
      <PayContent />
    </Suspense>
  );
}

function PayLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8">
      <section className="soft-shadow max-w-md rounded-[2rem] border border-white/80 bg-white/82 p-7 text-center backdrop-blur">
        <p className="text-base font-black text-[#3f2d2f]">正在进入支付页...</p>
      </section>
    </main>
  );
}

function PayContent() {
  const searchParams = useSearchParams();
  const type = getPersonalityKey(searchParams.get("type"));
  const profile = emotionalPersonalityProfiles[type];

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-8">
      <section className="soft-shadow w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 backdrop-blur">
        <div className={`bg-gradient-to-br ${profile.color} px-6 py-7 text-white`}>
          <Link
            href={`/result?attachmentAnxiety=5&intimacyAvoidance=5&emotionalSensitivity=5&boundaryPeoplePleasing=5`}
            className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-white transition hover:bg-white/28"
            aria-label="返回结果页"
          >
            <ArrowLeft size={19} />
          </Link>
          <p className="text-sm font-bold text-white/82">模拟支付</p>
          <h1 className="mt-2 text-3xl font-black">解锁完整版报告</h1>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/88">
            当前人格：{profile.name}
          </p>
        </div>

        <div className="space-y-5 p-5 sm:p-7">
          <div className="rounded-[1.5rem] border border-rose-100 bg-[#fff8f4] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#927b7e]">应付金额</p>
                <p className="mt-1 text-4xl font-black text-[#3f2d2f]">¥19.9</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <CreditCard size={25} />
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#674f52]">
              <ShieldCheck className="text-emerald-600" size={18} />
              这是模拟支付页，不会产生真实扣款
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#674f52]">
              <CheckCircle2 className="text-rose-600" size={18} />
              点击成功后进入完整版报告占位页
            </div>
          </div>

          <Link
            href={`/report-placeholder?type=${type}`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3f2d2f] px-5 py-4 text-base font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-[#2f2022]"
          >
            <CheckCircle2 size={18} />
            模拟支付成功
          </Link>
        </div>
      </section>
    </main>
  );
}
