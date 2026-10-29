"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";
import { gsap, MOTION_QUERY, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroComplete } from "@/lib/intro";
import HeroDust from "./HeroDust";
import { ArrowIcon } from "./icons";
import styles from "./Hero.module.css";

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const previous = useRef(0);
  const count = hero.slides.length;
  const hasVideo = Boolean(hero.video);

  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  // Entrance — waits for the intro doors, then settles the photo and lifts the copy in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        const q = gsap.utils.selector(ref);
        const title = SplitText.create(q("[data-hero='title']"), { type: "chars", charsClass: "char" });
        const eyebrow = SplitText.create(q("[data-hero='eyebrow']"), { type: "words", mask: "words", wordsClass: "word" });

        const tl = gsap.timeline({ paused: true });
        tl.set(q("[data-hero]"), { visibility: "visible" })
          .fromTo(q("[data-hero-inner]"), { scale: 1.12 }, { scale: 1, duration: 4.5 }, 0)
          .from(q("[data-hero-shade]"), { opacity: 1, duration: 2.4, ease: "power2.out" }, 0)
          .from(eyebrow.words, { yPercent: 105, duration: 0.9, stagger: 0.08 }, 1.1)
          .from(
            title.chars,
            { y: 36, autoAlpha: 0, filter: "blur(12px)", duration: 1.5, stagger: 0.045, ease: "power2.out", clearProps: "filter" },
            1.2,
          )
          .fromTo(
            q("[data-hero='pill']"),
            { clipPath: "inset(0% 50% 0% 50% round 74px)" },
            { clipPath: "inset(0% 0% 0% 0% round 74px)", duration: 1.2, ease: "wipe" },
            1.7,
          )
          .from(q("[data-hero='pill'] span"), { autoAlpha: 0, y: 8, duration: 0.9 }, 2.1)
          .from(q("[data-hero='caption']"), { autoAlpha: 0, y: 16, filter: "blur(8px)", duration: 0.9, ease: "power2.out" }, 2.3)
          .from(q("[data-hero='nav']"), { autoAlpha: 0, y: 12, duration: 1 }, 2.6);

        const off = onIntroComplete(() => tl.play());

        // Scroll hand-off: the copy drifts up and dissolves, the photo leans in.
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.4 } })
          .to(q("[data-hero-content]"), { yPercent: -28, autoAlpha: 0, ease: "none" }, 0)
          .to(q("[data-hero-media]"), { scale: 1.08, yPercent: 10, ease: "none" }, 0)
          .to(q("[data-hero-shade]"), { opacity: 0.75, ease: "none" }, 0);

        // Pointer parallax — content and photo move in opposite directions for depth.
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        let onMove: ((e: PointerEvent) => void) | undefined;
        if (fine) {
          const mx = gsap.quickTo(q("[data-hero-parallax]"), "x", { duration: 1.6, ease: "power3.out" });
          const my = gsap.quickTo(q("[data-hero-parallax]"), "y", { duration: 1.6, ease: "power3.out" });
          const cx = gsap.quickTo(q("[data-hero-float]"), "x", { duration: 1.8, ease: "power3.out" });
          const cy = gsap.quickTo(q("[data-hero-float]"), "y", { duration: 1.8, ease: "power3.out" });
          onMove = (e) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            mx(nx * -22);
            my(ny * -14);
            cx(nx * 10);
            cy(ny * 8);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
        }

        return () => {
          off();
          title.revert();
          eyebrow.revert();
          if (onMove) window.removeEventListener("pointermove", onMove);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  // Slide change: incoming frame dissolves in while settling from a slight zoom.
  useGSAP(
    () => {
      if (hasVideo) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", ref.current);
      const from = previous.current;
      previous.current = index;
      if (from === index) return;
      gsap.set(slides, { zIndex: 0 });
      gsap.set(slides[from], { zIndex: 1 });
      gsap.fromTo(slides[index], { zIndex: 2, autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "power2.inOut" });
      gsap.fromTo(slides[index].querySelector("img"), { scale: 1.08 }, { scale: 1, duration: 2.4 });
      gsap.to(slides[from], { autoAlpha: 0, duration: 0.6, delay: 1.2 });
    },
    { dependencies: [index], scope: ref },
  );

  // Autoplay starts once the intro has finished, and only while the hero is visible and the tab is active.
  useEffect(() => {
    if (hasVideo || count < 2) return;
    const el = ref.current;
    if (!el) return;
    let introDone = false;
    let inView = true;
    const sync = () => setPlaying(introDone && inView && !document.hidden);
    const off = onIntroComplete(() => {
      introDone = true;
      sync();
    });
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      off();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [hasVideo, count]);

  useEffect(() => {
    if (hasVideo || !playing || count < 2) return;
    const timer = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, playing, go, hasVideo, count]);

  return (
    <section ref={ref} id="top" className={styles.hero} data-theme="dark" aria-label="메종드엘 메인">
      <div className={styles.media} data-hero-media>
        <div className={styles.parallax} data-hero-parallax>
          <div className={styles.inner} data-hero-inner>
            {hero.video ? (
              <video className={styles.video} autoPlay muted loop playsInline preload="auto" poster={hero.video.poster}>
                {hero.video.mobileMp4 && <source src={hero.video.mobileMp4} type="video/mp4" media="(max-width: 767px)" />}
                {hero.video.webm && <source src={hero.video.webm} type="video/webm" />}
                <source src={hero.video.mp4} type="video/mp4" />
              </video>
            ) : (
              hero.slides.map((slide, i) => (
                <div key={slide.src} className={styles.slide} data-slide data-first={i === 0 || undefined}>
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={styles.shade} data-hero-shade aria-hidden />
      <HeroDust className={styles.dust} />

      <div className={styles.content} data-hero-content>
        <div className={styles.float} data-hero-float>
          <p className={styles.eyebrow} data-hero="eyebrow">
            {hero.eyebrow}
          </p>
          <h1 className={styles.title} data-hero="title" aria-label={hero.title}>
            {hero.title}
          </h1>
          <p className={styles.pill} data-hero="pill">
            <span>{hero.tagline}</span>
          </p>
          <p className={styles.caption} data-hero="caption">
            {hero.caption}
          </p>
        </div>
      </div>

      {!hasVideo && count > 1 && (
        <div className={styles.nav} data-hero="nav" role="group" aria-label="메인 이미지 슬라이드">
          <button type="button" className={styles.arrow} onClick={() => go(index - 1)} aria-label="이전 이미지">
            <ArrowIcon direction="left" />
          </button>
          <ol className={styles.dots}>
            {hero.slides.map((slide, i) => (
              <li key={slide.src}>
                <button
                  type="button"
                  className={styles.dot}
                  onClick={() => go(i)}
                  aria-label={`${i + 1}번째 이미지: ${slide.alt}`}
                  aria-current={i === index || undefined}
                >
                  {i === index && (
                    <svg className={styles.ring} viewBox="0 0 24 24" aria-hidden data-paused={!playing || undefined}>
                      <circle cx="12" cy="12" r="10.5" key={index} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ol>
          <button type="button" className={styles.arrow} onClick={() => go(index + 1)} aria-label="다음 이미지">
            <ArrowIcon />
          </button>
        </div>
      )}
    </section>
  );
}
