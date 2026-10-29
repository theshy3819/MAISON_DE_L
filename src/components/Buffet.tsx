"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { buffet } from "@/content/site";
import { gsap, MOTION_QUERY, useGSAP } from "@/lib/gsap";
import { useReveals } from "@/lib/useReveals";
import SectionHead from "./SectionHead";
import styles from "./Buffet.module.css";

const C = 500; // wheel centre in viewBox units
const R = 492;
const SLICES = 8;
const START = -110; // angle of the first seam, measured from the design
const GAP = 7; // each slice is pushed out along its bisector, leaving even seams

const rad = (deg: number) => (deg * Math.PI) / 180;
const point = (deg: number, r = R) => `${(C + r * Math.cos(rad(deg))).toFixed(2)} ${(C + r * Math.sin(rad(deg))).toFixed(2)}`;

const slices = Array.from({ length: SLICES }, (_, i) => {
  const a0 = START + (360 / SLICES) * i;
  const a1 = a0 + 360 / SLICES;
  const mid = rad((a0 + a1) / 2);
  return {
    d: `M${C} ${C} L${point(a0)} A${R} ${R} 0 0 1 ${point(a1)} Z`,
    // fixed precision so server and client render identical strings
    dx: (Math.cos(mid) * GAP).toFixed(2),
    dy: (Math.sin(mid) * GAP).toFixed(2),
  };
});

/** Luxury Buffet — the dish wheel turns with the scroll; hovering a slice lifts it out. */
export default function Buffet() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_QUERY, () => {
        const q = gsap.utils.selector(ref);
        const wheel = q("[data-wheel]")[0];

        gsap
          .timeline({ scrollTrigger: { trigger: wheel, start: "top 80%", once: true } })
          .set(wheel, { visibility: "visible" })
          .from(q("[data-slice-inner]"), {
            scale: 0.4,
            autoAlpha: 0,
            svgOrigin: `${C} ${C}`,
            duration: 1.6,
            stagger: { each: 0.08 },
          })
          .from(q("[data-hub]"), { scale: 0, svgOrigin: `${C} ${C}`, duration: 1.2 }, 0.5)
          .from(q("[data-hub-logo]"), { autoAlpha: 0, duration: 1 }, 1);

        gsap.fromTo(
          q("[data-wheel-turn]"),
          { rotation: -28, svgOrigin: `${C} ${C}` },
          {
            rotation: 32,
            svgOrigin: `${C} ${C}`,
            ease: "none",
            scrollTrigger: { trigger: wheel, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );

        gsap.fromTo(
          q("[data-buffet-bg]"),
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="buffet" className={styles.section} data-theme="dark" aria-labelledby="buffet-title">
      <div className={styles.bg} aria-hidden>
        <div className={styles.bgImg} data-buffet-bg>
          <Image src={buffet.background} alt="" fill sizes="100vw" />
        </div>
      </div>

      <SectionHead id="buffet-title" title={buffet.title} subtitle={buffet.subtitle} tone="dark" />

      <div className={styles.wheelWrap}>
        <svg className={styles.wheel} viewBox="0 0 1000 1000" data-wheel role="img" aria-label="메종드엘 뷔페 대표 메뉴 사진">
          <defs>
            {slices.map((s, i) => (
              <clipPath key={i} id={`buffet-slice-${i}`} clipPathUnits="userSpaceOnUse">
                <path d={s.d} />
              </clipPath>
            ))}
          </defs>
          <g data-wheel-turn>
            {slices.map((s, i) => (
              <g
                key={i}
                className={styles.slice}
                style={{ "--dx": s.dx, "--dy": s.dy } as CSSProperties}
              >
                <g data-slice-inner>
                  <image
                    href={buffet.wheel}
                    width="1000"
                    height="1000"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#buffet-slice-${i})`}
                  />
                  <path d={s.d} className={styles.sliceEdge} />
                </g>
              </g>
            ))}
          </g>
          <g data-hub>
            <circle cx={C} cy={C} r="142" className={styles.hub} />
            <circle cx={C} cy={C} r="128" className={styles.hubRing} />
          </g>
          <image
            href="/images/logo-white.png"
            x={C - 104}
            y={C - 33}
            width="208"
            height="67"
            data-hub-logo
            className={styles.hubLogo}
          />
        </svg>
      </div>

      <ol className={styles.menu}>
        {buffet.menu.map((item, i) => (
          <li key={item} data-reveal="blur" data-delay={i * 0.07}>
            <span className={styles.menuNo}>{i + 1}.</span> {item}
          </li>
        ))}
      </ol>

      <p className={styles.closing} data-reveal="lines">
        {buffet.closing[0]}
        <br />
        {buffet.closing[1]}
      </p>
    </section>
  );
}
