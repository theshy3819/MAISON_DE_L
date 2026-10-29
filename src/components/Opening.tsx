"use client";

import Image from "next/image";
import { useRef } from "react";
import { opening } from "@/content/site";
import { gsap, MOTION_QUERY, useGSAP } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";
import styles from "./Opening.module.css";

/** "2026.08 Grand Open" — the arch section with the turning ring of type. */
export default function Opening() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        const q = gsap.utils.selector(ref);
        const arch = q("[data-arch]")[0];

        // The arch rises open like a door, photo settling inside it.
        gsap
          .timeline({ scrollTrigger: { trigger: arch, start: "top 85%", once: true } })
          .set(arch, { visibility: "visible" })
          .fromTo(arch, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "wipe" })
          .fromTo(q("[data-arch-img]"), { scale: 1.3 }, { scale: 1.1, duration: 2.2 }, 0)
          .from(q("[data-ring]"), { autoAlpha: 0, scale: 0.92, duration: 2, ease: "power2.out" }, 0.6);

        // While scrolling: photo drifts inside the arch, ring turns, side columns float at different depths.
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 } })
          .fromTo(q("[data-arch-img]"), { yPercent: -5 }, { yPercent: 5, ease: "none" }, 0)
          .fromTo(q("[data-ring-turn]"), { rotation: -40, svgOrigin: "340 340" }, { rotation: 70, svgOrigin: "340 340", ease: "none" }, 0)
          .fromTo(q("[data-depth='near']"), { y: 50 }, { y: -50, ease: "none" }, 0)
          .fromTo(q("[data-depth='far']"), { y: -20 }, { y: 30, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={styles.section} data-theme="dark" aria-labelledby="opening-title">
      <div className={styles.bg} aria-hidden>
        <span className={styles.glow} />
        <span className={styles.glowAlt} />
        <span className={styles.grain} />
      </div>

      <div className={styles.grid}>
        <div className={styles.intro} data-depth="far">
          <h2 id="opening-title" className={styles.headline}>
            {opening.lines.map((line, i) => (
              <span key={line} className={styles.headLine} data-reveal="lines" data-delay={i * 0.1}>
                {line}
              </span>
            ))}
            <strong className={styles.headLine} data-reveal="lines" data-delay="0.2">
              {opening.title}
            </strong>
          </h2>
          <span className={styles.rule} data-reveal="line-x" data-delay="0.4" aria-hidden />
          <p className={styles.lead} data-reveal="lines" data-delay="0.5">
            {opening.lead[0]}
            <br />
            {opening.lead[1]}
          </p>
          <p className={styles.note} data-reveal="blur" data-delay="0.7">
            {opening.note}
          </p>
        </div>

        <figure className={styles.figure}>
          <div className={styles.archWrap}>
            <div className={styles.arch} data-arch>
              <div className={styles.archImg} data-arch-img>
                <Image src={opening.image.src} alt={opening.image.alt} fill sizes="(max-width: 1100px) 80vw, 507px" />
              </div>
            </div>
            <svg className={styles.ring} viewBox="0 0 680 680" data-ring aria-hidden>
              <defs>
                <path id="opening-ring" d="M340 40a300 300 0 1 1 0 600a300 300 0 1 1 0-600" />
              </defs>
              <g data-ring-turn>
                <g className={styles.ringSpin}>
                  <text>
                    <textPath href="#opening-ring" textLength={1880} lengthAdjust="spacing">
                      {opening.ring.repeat(2)}
                    </textPath>
                  </text>
                </g>
              </g>
            </svg>
          </div>
          <figcaption className={styles.disclaimer} data-reveal="blur" data-delay="0.6">
            {opening.disclaimer}
          </figcaption>
        </figure>

        <div className={styles.side} data-depth="near">
          <ul className={styles.features}>
            {opening.features.map((f, i) => (
              <li key={f.title} className={styles.feature}>
                <h3 className={styles.featureTitle} data-reveal="lines" data-delay={0.15 * i}>
                  {f.title}
                </h3>
                <span className={styles.featureRule} data-reveal="line-x" data-delay={0.15 * i + 0.15} aria-hidden />
                <p className={styles.featureText} data-reveal="blur" data-delay={0.15 * i + 0.3}>
                  {f.text}
                </p>
              </li>
            ))}
          </ul>
          <p className={styles.closing} data-reveal="lines">
            {opening.closing.map((line, i) => (
              <span key={line}>
                {line}
                {i < opening.closing.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className={styles.logo} data-reveal="fade" data-delay="0.2">
            <Image src="/images/logo-black.png" alt="MAISON DE L GWANGJU" width={187} height={60} />
          </div>
        </div>
      </div>
    </section>
  );
}
