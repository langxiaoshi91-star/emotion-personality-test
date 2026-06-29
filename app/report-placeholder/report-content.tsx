"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp, FileText, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import {
  emotionalPersonalityProfiles,
  type EmotionalPersonalityKey
} from "@/lib/quiz-data";

export type ReportFileKey =
  | "wave"
  | "mountain"
  | "moon"
  | "mirror"
  | "fire"
  | "garden"
  | "star"
  | "forest";

type ReportContentProps = {
  reports: Record<ReportFileKey, string | null>;
};

type MarkdownBlock =
  | { type: "h1"; content: string }
  | { type: "h2"; content: string; id: string }
  | { type: "h3"; content: string }
  | { type: "p"; content: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

const reportFileKeys: ReportFileKey[] = [
  "wave",
  "mountain",
  "moon",
  "mirror",
  "fire",
  "garden",
  "star",
  "forest"
];

const reportToProfileKey: Record<ReportFileKey, EmotionalPersonalityKey> = {
  wave: "wave",
  mountain: "mountain",
  moon: "moon",
  mirror: "mirror",
  fire: "flame",
  garden: "garden",
  star: "star",
  forest: "forest"
};

function getReportKey(value: string | null): ReportFileKey {
  if (value === "flame") {
    return "fire";
  }

  return reportFileKeys.includes(value as ReportFileKey)
    ? (value as ReportFileKey)
    : "wave";
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  let listItems: string[] = [];
  let orderedItems: string[] = [];
  let sectionIndex = 0;

  const flushLists = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "ul", items: listItems });
      listItems = [];
    }

    if (orderedItems.length > 0) {
      blocks.push({ type: "ol", items: orderedItems });
      orderedItems = [];
    }
  };

  markdown.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushLists();
      return;
    }

    if (line.startsWith("# ")) {
      flushLists();
      blocks.push({ type: "h1", content: line.replace(/^#\s+/, "") });
      return;
    }

    if (line.startsWith("## ")) {
      flushLists();
      const content = line.replace(/^##\s+/, "");
      sectionIndex += 1;
      blocks.push({ type: "h2", content, id: `report-section-${sectionIndex}` });
      return;
    }

    if (line.startsWith("### ")) {
      flushLists();
      blocks.push({ type: "h3", content: line.replace(/^###\s+/, "") });
      return;
    }

    const bulletMatch = line.match(/^[-*]\s+(.+)/);

    if (bulletMatch) {
      orderedItems = [];
      listItems.push(bulletMatch[1]);
      return;
    }

    const orderedMatch = line.match(/^\d+[.)]\s+(.+)/);

    if (orderedMatch) {
      listItems = [];
      orderedItems.push(orderedMatch[1]);
      return;
    }

    flushLists();
    blocks.push({ type: "p", content: line });
  });

  flushLists();
  return blocks;
}

function splitSectionTitle(content: string) {
  const [chapter, ...rest] = content.split("｜");

  return {
    chapter,
    title: rest.join("｜")
  };
}

function PlaceholderLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-8">
      <section className="soft-shadow max-w-md rounded-[2rem] border border-white/80 bg-white/82 p-7 text-center backdrop-blur">
        <p className="text-base font-black text-[#3f2d2f]">正在打开完整版报告...</p>
      </section>
    </main>
  );
}

export default function ReportContent({ reports }: ReportContentProps) {
  return (
    <Suspense fallback={<PlaceholderLoading />}>
      <ReportContentInner reports={reports} />
    </Suspense>
  );
}

function ReportContentInner({ reports }: ReportContentProps) {
  const searchParams = useSearchParams();
  const reportKey = getReportKey(searchParams.get("type"));
  const profile = emotionalPersonalityProfiles[reportToProfileKey[reportKey]];
  const report = reports[reportKey];
  const blocks = useMemo(() => (report ? parseMarkdown(report) : []), [report]);
  const tocItems = useMemo(
    () =>
      blocks.flatMap((block) =>
        block.type === "h2" ? [{ id: block.id, title: block.content }] : []
      ),
    [blocks]
  );
  const [activeSectionId, setActiveSectionId] = useState("");
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const activeTocId = tocItems.some((item) => item.id === activeSectionId)
    ? activeSectionId
    : (tocItems[0]?.id ?? "");

  useEffect(() => {
    if (tocItems.length === 0) {
      return;
    }

    const headings = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (headings.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry?.target.id) {
          setActiveSectionId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -72% 0px",
        threshold: 0
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [tocItems]);

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setReadingProgress(Math.min(100, Math.max(0, nextProgress)));
      setShowBackToTop(scrollTop > 520);
    };

    window.addEventListener("scroll", updateReadingProgress, { passive: true });
    window.addEventListener("resize", updateReadingProgress);

    return () => {
      window.removeEventListener("scroll", updateReadingProgress);
      window.removeEventListener("resize", updateReadingProgress);
    };
  }, []);

  const handleTocClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    setActiveSectionId(id);
    setIsTocOpen(false);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8">
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-rose-100/70">
        <div
          className="h-full bg-[#3f2d2f]"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <section className="soft-shadow mx-auto w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 backdrop-blur">
        <div className={`bg-gradient-to-br ${profile.color} px-6 py-8 text-center text-white sm:px-10`}>
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/18">
            <FileText size={30} />
          </div>
          <p className="text-sm font-bold text-white/82">完整版报告</p>
          <h1 className="mt-3 text-3xl font-black">{profile.name}人格成长报告</h1>
          <p className="mt-3 text-sm font-bold leading-6 text-white/86">
            当前人格：{profile.name}
          </p>
        </div>

        <div className="px-5 py-6 sm:px-10 sm:py-10">
          {report ? (
            <>
              {tocItems.length > 0 && (
                <section className="mx-auto mb-8 max-w-[760px] rounded-[1.5rem] border border-rose-100 bg-[#fff8f4] p-5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 text-left sm:pointer-events-none"
                    onClick={() => setIsTocOpen((current) => !current)}
                    aria-expanded={isTocOpen}
                    aria-controls="report-toc"
                  >
                    <span className="text-xl font-black text-[#3f2d2f]">目录</span>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-rose-700 sm:hidden">
                      {isTocOpen ? "收起" : "展开"}
                    </span>
                  </button>
                  <nav
                    id="report-toc"
                    className={`${isTocOpen ? "grid" : "hidden"} mt-4 gap-2 sm:grid`}
                    aria-label="报告目录"
                  >
                    {tocItems.map((item) => {
                      const isActive = item.id === activeTocId;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`rounded-2xl px-4 py-3 text-left text-sm font-black leading-6 transition ${
                            isActive
                              ? "bg-[#3f2d2f] text-white shadow-md shadow-rose-100"
                              : "bg-white text-[#6b5557] hover:bg-rose-50 hover:text-[#3f2d2f]"
                          }`}
                          onClick={() => handleTocClick(item.id)}
                        >
                          {item.title}
                        </button>
                      );
                    })}
                  </nav>
                </section>
              )}

              <article className="mx-auto max-w-[760px] space-y-7 px-1 text-left sm:px-4">
              {blocks.map((block, index) => {
                if (block.type === "h1") {
                  return (
                    <h1
                      key={`${block.type}-${index}`}
                      className="pt-1 text-center text-3xl font-black leading-tight text-[#3f2d2f] sm:text-4xl"
                    >
                      {block.content}
                    </h1>
                  );
                }

                if (block.type === "h2") {
                  const sectionTitle = splitSectionTitle(block.content);

                  return (
                    <h2
                      key={`${block.type}-${index}`}
                      id={block.id}
                      className="my-10 scroll-mt-8 rounded-[1.5rem] border border-rose-100 bg-[#fff8f4] px-6 py-7 text-center text-[#3f2d2f] shadow-sm shadow-rose-100/70 sm:scroll-mt-10"
                    >
                      <span className="mx-auto mb-5 block h-px w-full max-w-[280px] bg-rose-200" />
                      <span className="block text-base font-black leading-snug text-rose-700">
                        {sectionTitle.chapter}
                      </span>
                      {sectionTitle.title && (
                        <span className="mt-2 block text-2xl font-black leading-snug sm:text-3xl">
                          {sectionTitle.title}
                        </span>
                      )}
                      <span className="mx-auto mt-5 block h-px w-full max-w-[280px] bg-rose-200" />
                    </h2>
                  );
                }

                if (block.type === "h3") {
                  return (
                    <h3
                      key={`${block.type}-${index}`}
                      className="text-2xl font-black leading-snug text-[#3f2d2f]"
                    >
                      {block.content}
                    </h3>
                  );
                }

                if (block.type === "ul") {
                  return (
                    <ul
                      key={`${block.type}-${index}`}
                      className="list-disc space-y-3 pl-6 text-[18px] font-medium leading-[1.9] text-[#6b5557]"
                    >
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "ol") {
                  return (
                    <ol
                      key={`${block.type}-${index}`}
                      className="list-decimal space-y-3 pl-6 text-[18px] font-medium leading-[1.9] text-[#6b5557]"
                    >
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  );
                }

                return (
                  <p
                    key={`${block.type}-${index}`}
                    className="text-[18px] font-medium leading-[1.9] text-[#6b5557]"
                  >
                    {block.content}
                  </p>
                );
              })}
              </article>
            </>
          ) : (
            <div className="rounded-[1.5rem] border border-rose-100 bg-[#fff8f4] p-6 text-center">
              <p className="text-lg font-black text-[#3f2d2f]">报告加载失败，请重新测试。</p>
            </div>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/pay?type=${reportToProfileKey[reportKey]}`}
              className="flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-white px-5 py-4 font-black text-rose-700 transition hover:bg-rose-50"
            >
              <ArrowLeft size={18} />
              返回支付页
            </Link>
            <Link
              href="/test"
              className="flex items-center justify-center gap-2 rounded-full bg-[#3f2d2f] px-5 py-4 font-black text-white shadow-lg shadow-rose-200 transition hover:-translate-y-0.5"
            >
              <Sparkles size={18} />
              重新测试
            </Link>
          </div>
        </div>
      </section>

      <button
        type="button"
        className={`${showBackToTop ? "flex" : "hidden"} fixed bottom-5 right-5 z-40 h-12 w-12 items-center justify-center rounded-full bg-[#3f2d2f] text-white shadow-lg shadow-rose-200 transition hover:bg-[#2f2022]`}
        onClick={handleBackToTop}
        aria-label="回到顶部"
      >
        <ArrowUp size={20} />
      </button>
    </main>
  );
}
