"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { buffet } from "@/content/site";
import { useReveals } from "@/lib/useReveals";
import styles from "./Buffet.module.css";

/** Menu on the left; pointing at (or tapping, or tabbing to) a station brings its dish up on the right. */
export default function Buffet() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} id="buffet" className={styles.buffet} data-theme="dark" aria-labelledby="buffet-title">
      <header className={styles.head}>
        <h2 id="buffet-title" className={styles.title} data-reveal="title">
          {buffet.title}
        </h2>
        <p className={styles.subtitle} data-reveal="lines" data-delay="0.2">
          {buffet.subtitle}
        </p>
      </header>

      <div className={styles.body}>
        <ul className={styles.menu}>
          {buffet.menu.map((item, i) => (
            <li key={item.name}>
              <button
                type="button"
                className={styles.item}
                aria-pressed={i === active}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemDetail}>{item.detail}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.plate} data-reveal="rise">
          <div className={styles.plateMedia} data-reveal-media>
            {buffet.menu.map((item, i) => (
              <div key={item.image} className={styles.dish} data-active={i === active || undefined}>
                {/* eager: clipped-away dishes would otherwise never lazy-load until hovered, leaving a blank frame */}
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 900px) 92vw, 36vw" loading="eager" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.closing} data-reveal="lines">
        {buffet.closing}
      </p>
      <p className={styles.note}>{buffet.note}</p>
    </section>
  );
}
