"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

const LABELS: Record<string, string> = { drag: "DRAG", view: "VIEW" };

/**
 * Dot + trailing ring for fine pointers only. The ring grows over interactive elements and
 * carries a label over [data-cursor="drag"|"view"]. Native cursor stays visible.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches || !dot.current || !ring.current) return;

    const d = dot.current;
    const r = ring.current;
    const target = { x: -100, y: -100 };
    const dp = { ...target };
    const rp = { ...target };
    let raf = 0;
    let shown = false;

    const tick = () => {
      dp.x += (target.x - dp.x) * 0.45;
      dp.y += (target.y - dp.y) * 0.45;
      rp.x += (target.x - rp.x) * 0.16;
      rp.y += (target.y - rp.y) * 0.16;
      d.style.transform = `translate3d(${dp.x}px, ${dp.y}px, 0)`;
      r.style.transform = `translate3d(${rp.x}px, ${rp.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        shown = true;
        dp.x = rp.x = target.x;
        dp.y = rp.y = target.y;
        document.documentElement.dataset.cursor = "on";
      }
      const el = (e.target as Element).closest?.("[data-cursor], a, button, label, input, textarea, select");
      const mode = el?.getAttribute("data-cursor") ?? (el ? "hover" : "");
      r.dataset.mode = mode;
      if (label.current) label.current.textContent = LABELS[mode] ?? "";
    };
    const onLeave = () => {
      shown = false;
      delete document.documentElement.dataset.cursor;
    };
    const onDown = () => r.setAttribute("data-press", "");
    const onUp = () => r.removeAttribute("data-press");

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  return (
    <div className={styles.cursor} aria-hidden>
      <div ref={ring} className={styles.ring}>
        <span className={styles.circle}>
          <span ref={label} className={styles.label} />
        </span>
      </div>
      <div ref={dot} className={styles.dot}>
        <span />
      </div>
    </div>
  );
}
