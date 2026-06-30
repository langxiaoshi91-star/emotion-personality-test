"use client";

import { FormEvent, Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  ReceiptText,
  WalletCards
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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

const unlockCode = "LOVE2026";

function getPersonalityKey(value: string | null): EmotionalPersonalityKey {
  if (value === "fire") {
    return "flame";
  }

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = getPersonalityKey(searchParams.get("type"));
  const profile = emotionalPersonalityProfiles[type];
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.trim().toUpperCase() !== unlockCode) {
      setError("解锁码错误，请检查后重新输入。");
      return;
    }

    setError("");
    router.push(`/report-placeholder?type=${type}&code=${unlockCode}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-8">
      <section className="soft-shadow w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 backdrop-blur">
        <div className={`bg-gradient-to-br ${profile.color} px-6 py-7 text-white sm:px-8`}>
          <Link
            href="/test"
            className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/18 text-white transition hover:bg-white/28"
            aria-label="返回测试页"
          >
            <ArrowLeft size={19} />
          </Link>
          <p className="text-sm font-bold text-white/82">人工收款确认</p>
          <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
            解锁你的完整人格成长报告
          </h1>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/88">
            当前人格：{profile.icon} {profile.name}
          </p>
        </div>

        <div className="space-y-5 p-5 sm:p-8">
          <section className="rounded-[1.5rem] border border-rose-100 bg-[#fff8f4] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#927b7e]">解锁价格</p>
                <p className="mt-1 text-4xl font-black text-[#3f2d2f]">¥9.9</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <WalletCards size={25} />
              </div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-rose-100 bg-white p-5 text-center">
            <p className="text-base font-black text-[#3f2d2f]">请使用微信或支付宝扫码付款</p>
            <p className="mt-1 text-sm font-bold text-[#927b7e]">支付金额 ¥9.9</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-rose-100 bg-[#fff8f4] p-4">
                <p className="mb-3 text-sm font-black text-[#3f2d2f]">微信支付</p>
                <div className="relative mx-auto flex h-[220px] max-w-[220px] items-center justify-center overflow-hidden rounded-[1.25rem] border border-rose-100 bg-white p-3 shadow-sm">
                  <Image
                    src="/wechat-qr-clean.jpg"
                    alt="微信扫码支付二维码"
                    width={448}
                    height={400}
                    className="max-h-full w-full rounded-xl object-contain"
                  />
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-4 border-white bg-emerald-500 text-sm font-black text-white shadow-md">
                    微信
                  </span>
                </div>
                <p className="mt-3 text-xs font-bold leading-5 text-[#927b7e]">
                  微信扫一扫付款
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-rose-100 bg-[#fff8f4] p-4">
                <p className="mb-3 text-sm font-black text-[#3f2d2f]">支付宝支付</p>
                <div className="relative mx-auto flex h-[220px] max-w-[220px] items-center justify-center overflow-hidden rounded-[1.25rem] border border-rose-100 bg-white p-3 shadow-sm">
                  <Image
                    src="/alipay-qr-clean.jpg"
                    alt="支付宝扫码支付二维码"
                    width={960}
                    height={880}
                    className="max-h-full w-full rounded-xl object-contain"
                  />
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border-4 border-white bg-sky-500 text-sm font-black text-white shadow-md">
                    支付
                  </span>
                </div>
                <p className="mt-3 text-xs font-bold leading-5 text-[#927b7e]">
                  支付宝扫一扫付款
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-rose-100 bg-rose-50 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-rose-600">
                <MessageCircle size={19} />
              </div>
              <p className="text-sm font-bold leading-7 text-[#674f52]">
                付款后截图回到公众号【恋爱人格实验室】，发送关键词获取解锁码，再回到本页面输入。
              </p>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-rose-100 bg-white p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                <ReceiptText size={18} />
              </div>
              <h2 className="text-lg font-black text-[#3f2d2f]">解锁步骤</h2>
            </div>
            <div className="grid gap-3 text-sm font-bold leading-7 text-[#674f52]">
              <p className="rounded-2xl bg-[#fff8f4] px-4 py-3">① 扫码支付 ¥9.9</p>
              <p className="rounded-2xl bg-[#fff8f4] px-4 py-3">
                ② 支付完成后，回公众号【恋爱人格实验室】
              </p>
              <p className="rounded-2xl bg-[#fff8f4] px-4 py-3">
                ③ 发送关键词：已付款
              </p>
              <p className="rounded-2xl bg-[#fff8f4] px-4 py-3">
                ④ 公众号会自动回复解锁码
              </p>
              <p className="rounded-2xl bg-[#fff8f4] px-4 py-3">
                ⑤ 回到本页面输入解锁码，即可查看完整版报告
              </p>
            </div>
          </section>

          <form
            className="rounded-[1.5rem] border border-rose-100 bg-[#fff8f4] p-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-black text-[#3f2d2f]">输入解锁码</h2>
            <input
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              placeholder="请输入公众号回复的解锁码"
              className="mt-4 w-full rounded-2xl border border-rose-100 bg-white px-4 py-4 text-base font-bold text-[#3f2d2f] outline-none transition placeholder:text-[#b8a7aa] focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
            />
            {error && (
              <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-black text-rose-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#3f2d2f] px-5 py-4 text-base font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-[#2f2022]"
            >
              <CheckCircle2 size={18} />
              验证并查看报告
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
