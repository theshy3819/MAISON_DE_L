"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { spaces, spacesNote, type Space } from "@/content/site";
import { gsap, MOTION_QUERY, useGSAP } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";
import styles from "./Spaces.module.css";

/**
 * Each space is a full-screen panel that pins while the next one slides over it,
 * so the hall, bridal room and lobby read like rooms you walk through in turn.
 */
export default function Spaces() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", ref.current);
        panels.forEach((panel, i) => {
          const next = panels[i + 1];
          // The incoming room's photo settles as it rises into view.
          gsap.fromTo(
            panel.querySelector("[data-panel-media]"),
            { yPercent: i === 0 ? 0 : 12, scale: 1.08 },
            { yPercent: 0, scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true } },
          );
          if (!next) return;
          // The room being covered recedes and dims.
          gsap
            .timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } })
            .to(panel.querySelector("[data-panel-inner]"), { scale: 0.92, ease: "none" }, 0)
            .to(panel.querySelector("[data-panel-dim]"), { opacity: 0.75, ease: "none" }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="spaces" className={styles.spaces} aria-label="메종드엘의 공간">
      {spaces.map((space) => (
        <Panel key={space.id} space={space} />
      ))}
    </section>
  );
}

function Panel({ space }: { space: Space }) {
  const [active, setActive] = useState(0);
  const headingId = `${space.id}-title`;

  return (
    <article id={space.id} className={styles.panel} data-panel data-theme="dark" aria-labelledby={headingId}>
      <div className={styles.inner} data-panel-inner>
        <div className={styles.media} data-panel-media>
          {space.shots.map((shot, i) => (
            <div key={shot.src} className={styles.shot} data-active={i === active || undefined} aria-hidden={i !== active}>
              <Image src={shot.src} alt={shot.alt} fill sizes="100vw" />
            </div>
          ))}
        </div>
        <div className={styles.scrim} aria-hidden />

        <div className={styles.content}>
          {/* Panels pin at the top, so the title must trigger while it is still low in the viewport */}
          <h2 id={headingId} className={styles.name} data-reveal="title" data-start="top 98%">
            {space.name}
          </h2>
          <div className={styles.text}>
            <p className={styles.subtitle}>{space.subtitle}</p>
            <p className={styles.copy}>{space.copy}</p>
          </div>
        </div>

        <div className={styles.shots} role="group" aria-label={`${space.name} 사진 선택`}>
          {space.shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              className={styles.thumb}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span className={styles.thumbImg}>
                <Image src={shot.src} alt="" fill sizes="120px" />
              </span>
              <span className={styles.thumbLabel}>{shot.label}</span>
            </button>
          ))}
        </div>

        <p className={styles.note}>{spacesNote}</p>
        <div className={styles.dim} data-panel-dim aria-hidden />
      </div>
    </article>
  );
}
