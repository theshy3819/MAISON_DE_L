"use client";

import Image from "next/image";
import { useRef } from "react";
import { hero } from "@/content/site";
import { gsap, MOTION_QUERY, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroComplete } from "@/lib/intro";
import HeroDust from "./HeroDust";
import styles from "./Hero.module.css";

/*
 * The page's one big move: the full-bleed hall closes into an arched doorway as you scroll,
 * the wordmark drifts apart, and the line "도심 속 별빛이 머무는 곳" settles beside the arch.
 * Arch geometry lives in CSS custom properties so the static (reduced-motion) layout and the
 * animated end state are the same shape.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        const root = ref.current!;
        const q = gsap.utils.selector(root);
        const css = getComputedStyle(root);
        const arch = css.getPropertyValue("--arch").trim();
        const open = css.getPropertyValue("--arch-open").trim();

        const mark = SplitText.create(q("[data-wordmark]"), { type: "chars", mask: "chars", charsClass: "char" });

        // Entrance after the intro doors part.
        const intro = gsap.timeline({ paused: true });
        intro
          .set(q("[data-hero-in]"), { visibility: "visible" })
          .fromTo(q("[data-photo]"), { scale: 1.14 }, { scale: 1, duration: 4.5 }, 0)
          .from(mark.chars, { yPercent: 110, duration: 1.6, stagger: 0.06 }, 0.9)
          .from(q("[data-meta] > *"), { autoAlpha: 0, y: 12, duration: 1, stagger: 0.12, ease: "power2.out" }, 1.8);
        const off = onIntroComplete(() => intro.play());

        // Scroll: hall → arch.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.7 },
          })
          .fromTo(q("[data-frame]"), { clipPath: open }, { clipPath: arch, duration: 0.6, ease: "power1.inOut" }, 0)
          .to(q("[data-photo-scroll]"), { scale: 1.12, duration: 0.6 }, 0)
          .to(q("[data-wordmark]"), { yPercent: -60, autoAlpha: 0, letterSpacing: "0.18em", duration: 0.32 }, 0)
          .to(q("[data-meta]"), { autoAlpha: 0, duration: 0.15 }, 0)
          .set(q("[data-late]"), { visibility: "visible" }, 0.34)
          .from(q("[data-statement] > span"), { yPercent: 60, autoAlpha: 0, duration: 0.18, stagger: 0.06 }, 0.36)
          .from(q("[data-aside]"), { y: 30, autoAlpha: 0, duration: 0.2 }, 0.5)
          .to({}, { duration: 0.3 });

        return () => {
          off();
          mark.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="top" className={styles.hero} data-theme="dark" aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.frame} data-frame>
          <div className={styles.photo} data-photo>
            <div className={styles.photoScroll} data-photo-scroll>
              <Image src={hero.image.src} alt={hero.image.alt} fill sizes="100vw" loading="eager" fetchPriority="high" />
            </div>
          </div>
          <div className={styles.shade} aria-hidden />
        </div>

        <HeroDust className={styles.dust} />

        <h1 id="hero-title" className={styles.wordmark} data-wordmark data-hero-in aria-label="MAISON DE L 메종드엘 웨딩홀">
          MAISON DE L
        </h1>

        <div className={styles.meta} data-meta data-hero-in>
          <p>{hero.opening}</p>
          <p>{hero.place}</p>
        </div>

        <div className={styles.late} data-late>
          <p className={styles.statement} data-statement>
            {hero.statement.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <div className={styles.aside} data-aside>
            <p>{hero.intro}</p>
            <a href="#spaces" className={styles.more}>
              공간 둘러보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
