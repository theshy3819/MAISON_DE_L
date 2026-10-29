import type { Metadata, Viewport } from "next";
import { Abhaya_Libre } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import "./globals.css";

const abhaya = Abhaya_Libre({
  variable: "--font-abhaya",
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "메종드엘 웨딩홀 | MAISON DE L — 광주 상무지구 럭셔리 웨딩홀",
  description:
    "도심 속 별빛이 머무는 곳, 광주 상무지구 메종드엘 웨딩홀. 샤이니 블랙 럭셔리 홀, 브라이덜 룸, 5성급 호텔 뷔페. 2026년 8월 그랜드 오픈.",
  keywords: ["메종드엘", "MAISON DE L", "광주 웨딩홀", "상무지구 웨딩홀", "광주 결혼식장", "럭셔리 웨딩"],
  openGraph: {
    title: "MAISON DE L — 2026.08 GRAND OPEN",
    description: "A New Beginning in Luxury Wedding Venues. 광주 상무지구 메종드엘 웨딩홀",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/images/hall-main.jpg", width: 1440, height: 1018, alt: "메종드엘 럭셔리 홀" }],
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
    <html lang="ko" className={abhaya.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
