"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { completeIntro } from "@/lib/intro";
import { useLenis } from "./SmoothScroll";
import styles from "./Intro.module.css";

const SEEN_KEY = "maison-intro";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * First-visit curtain: two dark doors part from the centre — the hall doors opening —
 * while the hero settles behind them. Skipped for returning visitors in the same
 * session and for reduced-motion users.
 */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis, active]);

  useGSAP(
    () => {
      const root = ref.current;
      const html = document.documentElement;
      if (!root || !html.classList.contains("motion-ok") || html.classList.contains("intro-seen")) {
        setActive(false);
        completeIntro();
        return;
      }

      html.style.overflow = "hidden";
      const q = gsap.utils.selector(root);
      const progress = gsap.to(q("[data-progress]"), { scaleX: 0.85, duration: 2.6, ease: "power2.out" });
      const ready = Promise.race([Promise.all([document.fonts.ready, wait(1500)]), wait(3600)]);

      let cancelled = false;
      ready.then(() => {
        if (cancelled) return;
        progress.kill();
        gsap
          .timeline({
            onComplete: () => {
              html.style.overflow = "";
              sessionStorage.setItem(SEEN_KEY, "1");
              setActive(false);
            },
          })
          .to(q("[data-progress]"), { scaleX: 1, duration: 0.45, ease: "power2.inOut" })
          .to(q("[data-mark]"), { autoAlpha: 0, y: -10, duration: 0.5, ease: "power2.in" }, "+=0.1")
          .add(() => completeIntro())
          .to(q("[data-door='left']"), { xPercent: -101, duration: 1.8, ease: "wipe" }, "<0.2")
          .to(q("[data-door='right']"), { xPercent: 101, duration: 1.8, ease: "wipe" }, "<")
          .to(q("[data-seam]"), { autoAlpha: 0, duration: 0.6 }, "<");
      });

      return () => {
        cancelled = true;
        html.style.overflow = "";
      };
    },
    { scope: ref },
  );

  if (!active) return null;

  return (
    <div ref={ref} className={styles.intro} aria-hidden>
      <div className={styles.door} data-door="left" />
      <div className={styles.door} data-door="right" />
      <span className={styles.seam} data-seam />
      <div className={styles.mark} data-mark>
        <Image src="/images/logo-white.png" alt="" width={240} height={77} className={styles.logo} loading="eager" />
        <span className={styles.track}>
          <span className={styles.progress} data-progress />
        </span>
      </div>
    </div>
  );
}
