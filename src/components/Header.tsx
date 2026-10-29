"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroComplete } from "@/lib/intro";
import { PhoneIcon } from "./icons";
import styles from "./Header.module.css";

type Theme = "dark" | "light";

const nav = [
  { href: "#spaces", label: "공간" },
  { href: "#buffet", label: "뷔페" },
  { href: "#location", label: "오시는 길" },
];

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [hidden, setHidden] = useState(false);

  // Step out of the way while reading downward; come back on the slightest upward intent.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight * 0.8);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Ink colour follows the section under the bar.
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-theme]").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 40px",
        end: "bottom 40px",
        onToggle: (self) => self.isActive && setTheme(section.dataset.theme as Theme),
      });
    });
  });

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.set(el, { autoAlpha: 0 });
      return onIntroComplete(() => gsap.to(el, { autoAlpha: 1, duration: 1.2, delay: 1.4 }));
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className={styles.header} data-tone={theme} data-hidden={hidden || undefined}>
      <a href="#top" className={styles.logo} aria-label="MAISON DE L 메종드엘 처음으로">
        <Image src="/images/logo-white.png" alt="" width={225} height={72} className={styles.logoWhite} loading="eager" />
        <Image src="/images/logo-black.png" alt="" width={225} height={72} className={styles.logoBlack} loading="eager" />
      </a>

      <nav className={styles.nav} aria-label="주요 메뉴">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <a href={`tel:${contact.phone.replaceAll("-", "")}`} className={styles.tel} aria-label={`전화 상담 ${contact.phone}`}>
          <PhoneIcon size={18} />
          <span className={styles.telNumber}>{contact.phone}</span>
        </a>
        <a href="#reservation" className={styles.book}>
          상담 예약
        </a>
      </div>
    </header>
  );
}
