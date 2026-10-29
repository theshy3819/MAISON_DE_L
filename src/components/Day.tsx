"use client";

import Image from "next/image";
import { useRef } from "react";
import { day } from "@/content/site";
import { gsap, MOTION_QUERY, useGSAP } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";
import styles from "./Day.module.css";

/** Two offset columns of photographs drifting at slightly different speeds, like a flipped-through album. */
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

  const [veil, table, rings, bouquet] = day.shots;

  return (
    <section ref={ref} className={styles.day} data-theme="light" aria-labelledby="day-title">
      <div className={styles.grid}>
        <div className={styles.colA} data-speed="0.4">
          <Shot shot={veil} sizes="(max-width: 767px) 86vw, 38vw" className={styles.veil} />
          <Shot shot={rings} sizes="(max-width: 767px) 60vw, 22vw" className={styles.rings} />
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
          <Shot shot={table} sizes="(max-width: 767px) 92vw, 46vw" className={styles.table} />
          <div data-speed="-0.3">
            <Shot shot={bouquet} sizes="(max-width: 767px) 64vw, 24vw" className={styles.bouquet} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Shot({ shot, sizes, className }: { shot: (typeof day.shots)[number]; sizes: string; className: string }) {
  return (
    <figure className={`${styles.shot} ${className}`} style={{ aspectRatio: shot.ratio }} data-reveal="rise">
      <div className={styles.media} data-reveal-media>
        <Image src={shot.src} alt={shot.alt} fill sizes={sizes} />
      </div>
    </figure>
  );
}
