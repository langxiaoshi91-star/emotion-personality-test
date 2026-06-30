"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  ReceiptText,
  WalletCards
} from "lucide-react";
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
  const searchParams = useSearchParams();
  const type = getPersonalityKey(searchParams.get("type"));
  const profile = emotionalPersonalityProfiles[type];

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
                付款后请截图发送到公众号【恋爱人格实验室】，客服确认后为你开通完整版报告。
              </p>
            </div>
          </section>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#674f52]">
              <ReceiptText className="text-rose-600" size={18} />
              暂时不做自动校验，客服会人工确认付款截图
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#674f52]">
              <CheckCircle2 className="text-emerald-600" size={18} />
              支付完成后可先进入完整版报告页面
            </div>
          </div>

          <Link
            href={`/report-placeholder?type=${type}&unlock=1`}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3f2d2f] px-5 py-4 text-base font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-[#2f2022]"
          >
            <CheckCircle2 size={18} />
            我已支付，查看报告
          </Link>
        </div>
      </section>
    </main>
  );
}
