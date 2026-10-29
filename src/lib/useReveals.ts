"use client";

import type { RefObject } from "react";
import { gsap, MOTION_QUERY, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Scroll-triggered entrances declared in markup with data attributes:
 *
 *   data-reveal="title"   — words rise out of a mask (English display titles)
 *   data-reveal="lines"   — text rises line by line out of a mask (Korean copy — never per character)
 *   data-reveal="blur"    — short rise out of a soft blur (subtitles, small copy)
 *   data-reveal="fade"    — rise + fade
 *   data-reveal="line-y"  — vertical hairline draws downward
 *   data-reveal="line-x"  — horizontal hairline draws left → right
 *   data-reveal="wipe"    — frame wipes open left → right, photo ([data-reveal-media]) settles from a zoom
 *   data-reveal="frame"   — full-width photo grows from an inset card as you scroll (scrubbed)
 *
 * Optional: data-delay="0.2" (seconds), data-start="top 80%" (ScrollTrigger start).
 */
export function useReveals(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add({ motion: MOTION_QUERY, wide: "(min-width: 769px)" }, (ctx) => {
        const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
        const splits: SplitText[] = [];
        const nodes = root.querySelectorAll<HTMLElement>("[data-reveal]");

        if (!motion) {
          gsap.set(nodes, { visibility: "visible" });
          return;
        }

        nodes.forEach((el) => {
          const kind = el.dataset.reveal;
          const delay = Number(el.dataset.delay ?? 0);
          const scrollTrigger = { trigger: el, start: el.dataset.start ?? "top 85%", once: true };
          const media = el.querySelector("[data-reveal-media]");
          gsap.set(el, { visibility: "visible" });

          switch (kind) {
            case "title":
            case "lines": {
              const byWord = kind === "title";
              splits.push(
                SplitText.create(el, {
                  type: byWord ? "lines,words" : "lines",
                  mask: byWord ? "words" : "lines",
                  linesClass: "split-line",
                  wordsClass: "word",
                  autoSplit: true,
                  onSplit: (self) =>
                    gsap.from(byWord ? self.words : self.lines, {
                      yPercent: 105,
                      duration: 0.9,
                      stagger: 0.08,
                      delay,
                      scrollTrigger,
                    }),
                }),
              );
              break;
            }
            case "blur":
              gsap.from(el, {
                y: 16,
                autoAlpha: 0,
                filter: "blur(8px)",
                duration: 0.9,
                ease: "power2.out",
                delay,
                scrollTrigger,
                clearProps: "filter",
              });
              break;
            case "fade":
              gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: "power2.out", delay, scrollTrigger });
              break;
            case "line-y":
              gsap.from(el, { scaleY: 0, transformOrigin: "50% 0%", duration: 0.8, delay, scrollTrigger });
              break;
            case "line-x":
              gsap.from(el, { scaleX: 0, transformOrigin: "0% 50%", duration: 1.2, ease: "wipe", delay, scrollTrigger });
              break;
            case "wipe": {
              const tl = gsap.timeline({ delay, scrollTrigger });
              tl.fromTo(el, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "wipe" });
              if (media) tl.fromTo(media, { scale: 1.15 }, { scale: 1, duration: 1.4 }, 0);
              break;
            }
            case "frame": {
              if (!wide) {
                const tl = gsap.timeline({ scrollTrigger });
                tl.fromTo(el, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "wipe" });
                if (media) tl.fromTo(media, { scale: 1.15 }, { scale: 1, duration: 1.4 }, 0);
                break;
              }
              const tl = gsap.timeline({
                scrollTrigger: { trigger: el, start: "top 96%", end: "top 30%", scrub: 0.6 },
                defaults: { ease: "none" },
              });
              tl.fromTo(
                el,
                { clipPath: "inset(7% 6% 7% 6% round 18px)" },
                { clipPath: "inset(0% 0% 0% 0% round 0px)" },
              );
              if (media) tl.fromTo(media, { scale: 1.18 }, { scale: 1 }, 0);
              break;
            }
          }
        });

        return () => splits.forEach((s) => s.revert());
      });

      return () => mm.revert();
    },
    { scope },
  );
}
