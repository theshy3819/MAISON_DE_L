import type { Metadata, Viewport } from "next";
import { Italiana } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "메종드엘 웨딩홀 | MAISON DE L — 광주시청 앞 프리미엄 웨딩 베뉴",
  description:
    "상무지구 광주시청 앞 프리미엄 웨딩 베뉴 메종드엘. 별빛이 쏟아지는 아스테르홀과 루센트홀, 신부대기실, 스타 셰프 뷔페. 2027 예식 상담 진행 중 062-716-0101.",
  keywords: ["메종드엘", "MAISON DE L", "광주 웨딩홀", "상무지구 웨딩홀", "광주 결혼식장", "아스테르홀", "루센트홀", "광주 예식장"],
  openGraph: {
    title: "MAISON DE L — YOUR MOST BEAUTIFUL MOMENT",
    description: "광주의 새로운 웨딩을 완성하다. 상무지구 시청 앞 프리미엄 웨딩 베뉴, 메종드엘",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "메종드엘 아스테르홀의 크리스털 샹들리에와 꽃길" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: lets CSS hide reveal targets only when animations will actually run,
// and keeps the intro curtain from flashing for visitors who already saw it this session.
const motionFlag = `try{var c=document.documentElement.classList;if(!matchMedia('(prefers-reduced-motion: reduce)').matches)c.add('motion-ok');if(sessionStorage.getItem('maison-intro'))c.add('intro-seen')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={italiana.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
