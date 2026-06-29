import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "情感人格测试",
  description: "20 道题看见你的亲密关系模式，获得温柔的自我照顾建议。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
