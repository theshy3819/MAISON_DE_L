"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { onIntroComplete } from "@/lib/intro";
import { InstagramIcon, PhoneIcon } from "./icons";
import styles from "./Header.module.css";

type Theme = "dark" | "light";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide while reading downward, return on the slightest upward intent.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setCompact(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight * 0.6);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Swap logo / icon colour depending on the section underneath the bar.
  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("[data-theme]");
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 48px",
        end: "bottom 48px",
        onToggle: (self) => self.isActive && setTheme(section.dataset.theme as Theme),
      });
    });
  });

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.set(el, { autoAlpha: 0, y: -24 });
      return onIntroComplete(() => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.4, delay: 0.9 }));
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className={styles.header}
      data-tone={theme}
      data-compact={compact || undefined}
      data-hidden={hidden || undefined}
    >
      <div className={styles.glass} aria-hidden />
      <a href="#top" className={styles.logo} aria-label="MAISON DE L 메종드엘 홈으로">
        <Image src="/images/logo-white.png" alt="" width={225} height={72} className={styles.logoWhite} loading="eager" />
        <Image src="/images/logo-black.png" alt="" width={225} height={72} className={styles.logoBlack} loading="eager" />
      </a>
      <div className={styles.actions}>
        <a href={`tel:${contact.phone.replaceAll("-", "")}`} className={styles.call} data-cursor="hover">
          <span className={styles.callIcon}>
            <PhoneIcon size={24} />
          </span>
          <span className={styles.callText}>
            <b>예약 접수중</b> <span>{contact.phone}</span>
          </span>
          <span className="sr-only">로 전화 걸기</span>
        </a>
        <a
          href={contact.instagram}
          target="_blank"
          rel="noreferrer"
          className={styles.insta}
          aria-label="메종드엘 인스타그램 (새 창)"
          data-cursor="hover"
        >
          <InstagramIcon size={36} />
        </a>
      </div>
    </header>
  );
}
