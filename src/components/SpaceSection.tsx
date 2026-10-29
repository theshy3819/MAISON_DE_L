"use client";

import { useRef } from "react";
import type { Space } from "@/content/site";
import { useReveals } from "@/lib/useReveals";
import SectionHead from "./SectionHead";
import Slider from "./Slider";
import styles from "./SpaceSection.module.css";

/** Luxury Hall / Bridal room / Lobby Lounge — same layout, alternating white and mist backgrounds. */
export default function SpaceSection({ space }: { space: Space }) {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  const headingId = `${space.id}-title`;

  return (
    <section ref={ref} id={space.id} className={styles.section} data-tone={space.tone} data-theme="light" aria-labelledby={headingId}>
      <SectionHead
        id={headingId}
        title={
          <>
            <em>{space.accent}</em>
            {space.rest}
          </>
        }
        subtitle={space.subtitle}
      />
      <Slider slides={space.slides} ratio={space.ratio} label={`${space.accent}${space.rest} 사진`} />
      <p className={styles.copy}>
        <span className={styles.lead} data-reveal="lines">
          {space.copy[0]}
        </span>
        <span className={styles.rest} data-reveal="lines" data-delay="0.15">
          {space.copy[1]}
        </span>
      </p>
    </section>
  );
}
