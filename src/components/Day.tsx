"use client";

import Image from "next/image";
import { useRef } from "react";
import { day } from "@/content/site";
import { gsap, MOTION_QUERY, useGSAP } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";
import styles from "./Day.module.css";

type DayShot = (typeof day.shots)[keyof typeof day.shots];

/** Two offset columns of real wedding-day photos drifting at slightly different speeds, like a flipped-through album. */
export default function Day() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_QUERY} and (min-width: 768px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-speed]", ref.current).forEach((el) => {
          const speed = Number(el.dataset.speed);
          gsap.fromTo(
            el,
            { y: speed * 120 },
            { y: speed * -120, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const { welcome, veil, candles, back } = day.shots;

  return (
    <section ref={ref} className={styles.day} data-theme="light" aria-labelledby="day-title">
      <div className={styles.grid}>
        <div className={styles.colA} data-speed="0.4">
          <Shot shot={welcome} sizes="(max-width: 767px) 86vw, 38vw" className={styles.welcome} />
          <Shot shot={back} sizes="(max-width: 767px) 80vw, 30vw" className={styles.back} />
        </div>

        <div className={styles.colB}>
          <header className={styles.head}>
            <h2 id="day-title" className={styles.title} data-reveal="title">
              {day.title}
            </h2>
            <p className={styles.subtitle} data-reveal="lines" data-delay="0.2">
              {day.subtitle}
            </p>
            <p className={styles.text} data-reveal="lines" data-delay="0.3">
              {day.text}
            </p>
          </header>
          <Shot shot={veil} sizes="(max-width: 767px) 92vw, 52vw" className={styles.veil} />
          <div data-speed="-0.3">
            <Shot shot={candles} sizes="(max-width: 767px) 70vw, 32vw" className={styles.candles} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Shot({ shot, sizes, className }: { shot: DayShot; sizes: string; className: string }) {
  return (
    <figure className={`${styles.shot} ${className}`} style={{ aspectRatio: shot.ratio }} data-reveal="rise">
      <div className={styles.media} data-reveal-media>
        <Image src={shot.src} alt={shot.alt} fill sizes={sizes} />
      </div>
    </figure>
  );
}
