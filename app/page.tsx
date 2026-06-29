import Link from "next/link";
import { ArrowRight, Heart, Sparkles, Sunrise } from "lucide-react";

const fitFor = [
  "明明很用心，却总在感情里受伤的人",
  "容易因为冷淡、失联、语气变化而内耗的人",
  "想看懂自己亲密关系弱点的人",
  "想找到情绪修复方向的人"
];

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-4xl flex-col justify-between">
        <div className="space-y-6">
          <nav className="flex items-center justify-between rounded-full border border-white/70 bg-white/60 px-4 py-3 text-sm text-rose-700 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <Heart size={17} fill="currentColor" />
              </span>
              情感人格测试
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              20 题
            </span>
          </nav>

          <div className="paper-texture soft-shadow rounded-[2rem] border border-white/80 bg-white/78 p-6 backdrop-blur sm:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
              <Sparkles size={16} />
              免费完成 20 道题，先看基础结果
            </div>

            <h1 className="text-4xl font-black leading-tight text-[#3f2d2f] sm:text-6xl">
              测一测，
              <span className="block text-rose-500">你在感情里为什么总是受伤？</span>
            </h1>

            <p className="mt-5 text-base leading-8 text-[#6b5557] sm:max-w-2xl sm:text-lg">
              20道题，看清你的情感人格、亲密关系弱点和自我修复方向。
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/72 p-4">
                <p className="text-sm font-bold text-rose-600">先看模式</p>
                <p className="mt-1 text-sm leading-6 text-[#735f61]">从反复受伤的关系里，看见自己的惯性反应。</p>
              </div>
              <div className="rounded-3xl bg-white/72 p-4">
                <p className="text-sm font-bold text-rose-600">免费测试</p>
                <p className="mt-1 text-sm leading-6 text-[#735f61]">无需登录，无需支付，提交后先获得基础结果。</p>
              </div>
              <div className="rounded-3xl bg-white/72 p-4">
                <p className="text-sm font-bold text-rose-600">可继续深入</p>
                <p className="mt-1 text-sm leading-6 text-[#735f61]">想了解痛苦来源和行动计划时，再解锁完整报告。</p>
              </div>
            </div>

            <Link
              href="/test"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3f2d2f] px-6 py-4 text-base font-bold text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-[#2f2022] sm:w-auto"
            >
              免费开始测试
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>

        <section className="mt-7 rounded-[1.75rem] border border-white/75 bg-white/64 p-5 backdrop-blur sm:p-7">
          <div className="mb-4 flex items-center gap-2 text-[#3f2d2f]">
            <Sunrise className="text-amber-500" size={20} />
            <h2 className="text-lg font-black">适合人群</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fitFor.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-rose-100 bg-white/68 px-4 py-3 text-sm font-semibold text-[#674f52]"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#927b7e]">
            温馨提示：本测试用于自我觉察和情绪陪伴，不构成医学、心理诊断或治疗建议。
          </p>
        </section>
      </section>
    </main>
  );
}
