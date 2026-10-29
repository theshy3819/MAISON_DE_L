"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./Slider.module.css";

const AUTOPLAY_MS = 5000;

type Props = {
  slides: { src: string; alt: string }[];
  ratio: number;
  label: string;
};

/**
 * Photo frame with the numbered 01 / 02 controls from the design.
 * Incoming photo wipes across from the travel direction and settles from a zoom;
 * the active number carries a thin ring that fills while autoplay counts down.
 */
export default function Slider({ slides, ratio, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const state = useRef({ previous: 0, direction: 1, dragX: 0 });
  const count = slides.length;

  const go = useCallback(
    (next: number, direction = next > index ? 1 : -1) => {
      state.current.direction = direction;
      setIndex((next + count) % count);
    },
    [count, index],
  );

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-slide]", ref.current);
      const { previous: from, direction } = state.current;
      state.current.previous = index;
      if (from === index) return;
      const incoming = items[index];
      const outgoing = items[from];
      gsap.set(items, { zIndex: 0 });
      gsap.set(outgoing, { zIndex: 1 });
      gsap.set(incoming, { zIndex: 2, visibility: "visible" });
      gsap.fromTo(
        incoming,
        { clipPath: direction > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "wipe" },
      );
      gsap.fromTo(incoming.querySelector("img"), { scale: 1.15, xPercent: direction * 6 }, { scale: 1, xPercent: 0, duration: 1.6 });
      gsap.to(outgoing.querySelector("img"), { xPercent: direction * -8, duration: 1.2, ease: "wipe" });
      gsap.set(outgoing, { visibility: "hidden", delay: 1.2 });
      gsap.set(outgoing.querySelector("img"), { xPercent: 0, delay: 1.25 });
    },
    { dependencies: [index], scope: ref },
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = inView && !hovering && count > 1;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [playing, index, go]);

  const onPointerDown = (e: PointerEvent) => {
    state.current.dragX = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    const dx = e.clientX - state.current.dragX;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  };

  return (
    <div ref={ref} className={styles.slider} role="group" aria-roledescription="carousel" aria-label={label}>
      <div
        className={styles.frame}
        style={{ aspectRatio: ratio }}
        data-reveal="frame"
        data-cursor={count > 1 ? "drag" : undefined}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <div className={styles.media} data-reveal-media>
          {slides.map((slide, i) => (
            <figure
              key={slide.src}
              className={styles.slide}
              data-slide
              data-first={i === 0 || undefined}
              aria-hidden={i !== index}
            >
              <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 1500px) 94vw, 1424px" draggable={false} />
            </figure>
          ))}
        </div>
      </div>

      {count > 1 && (
        <ol className={styles.controls}>
          {slides.map((slide, i) => (
            <li key={slide.src}>
              <button
                type="button"
                className={styles.num}
                aria-current={i === index || undefined}
                aria-label={`${i + 1}번째 사진 보기`}
                onClick={() => go(i)}
              >
                <span className={styles.digits}>{String(i + 1).padStart(2, "0")}</span>
                {i === index && (
                  <svg className={styles.ring} viewBox="0 0 40 40" aria-hidden data-paused={!playing || undefined}>
                    <circle cx="20" cy="20" r="19" key={index} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
