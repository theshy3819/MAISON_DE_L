"use client";

import { useEffect, useRef } from "react";

type Speck = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  sway: number;
  phase: number;
  depth: number;
};

type Star = { x: number; y: number; r: number; phase: number; rate: number; glint: boolean };

/**
 * "Starlight" layer for the hero: a few soft light-dust specks drifting up and to the right
 * (the same way the butterflies in the hero film travel) over a field of faint twinkling stars.
 * Runs only while the hero is on screen and the tab is visible; static under reduced motion.
 */
export default function HeroDust({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let specks: Speck[] = [];
    let stars: Star[] = [];
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const dustCount = w < 768 ? 18 : 32;
      specks = Array.from({ length: dustCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(1.5, 5),
        alpha: rand(0.15, 0.5),
        // crosses the screen in roughly 8–14s at 60fps
        speed: rand(w / (14 * 60), w / (8 * 60)) * 0.55,
        sway: rand(6, 18),
        phase: rand(0, Math.PI * 2),
        depth: rand(0.3, 1),
      }));

      const starCount = Math.round(Math.min(110, (w * h) / 16000));
      stars = Array.from({ length: starCount }, () => ({
        x: rand(0, w),
        y: rand(0, h * 0.75),
        r: rand(0.35, 1.15),
        phase: rand(0, Math.PI * 2),
        rate: rand(0.6, 1.8),
        glint: Math.random() < 0.08,
      }));
    };

    const drawGlint = (x: number, y: number, size: number, a: number) => {
      ctx.strokeStyle = `rgba(255, 250, 240, ${a})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      pointer.x += (pointer.tx - pointer.x) * 0.02;
      pointer.y += (pointer.ty - pointer.y) * 0.02;
      const px = (pointer.x - 0.5) * 2;
      const py = (pointer.y - 0.5) * 2;

      for (const s of stars) {
        const tw = reduced ? 0.6 : 0.5 + 0.5 * Math.sin(t * 0.001 * s.rate + s.phase);
        const a = 0.15 + tw * 0.65;
        const x = s.x - px * 4;
        const y = s.y - py * 3;
        ctx.fillStyle = `rgba(255, 252, 245, ${a})`;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.glint && tw > 0.82) drawGlint(x, y, 5 + (tw - 0.82) * 40, (tw - 0.82) * 4);
      }

      for (const p of specks) {
        if (!reduced) {
          p.x += p.speed * p.depth;
          p.y -= p.speed * p.depth * 0.45;
          p.phase += 0.01;
          if (p.x - p.r > w + 40 || p.y + p.r < -40) {
            p.x = rand(-w * 0.2, w * 0.6);
            p.y = h + rand(10, 80);
          }
        }
        const x = p.x + Math.sin(p.phase) * p.sway + px * 18 * p.depth;
        const y = p.y + Math.cos(p.phase * 0.8) * p.sway * 0.5 + py * 12 * p.depth;
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 3);
        g.addColorStop(0, `rgba(255, 246, 228, ${p.alpha})`);
        g.addColorStop(0.35, `rgba(255, 238, 214, ${p.alpha * 0.45})`);
        g.addColorStop(1, "rgba(255, 238, 214, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    let visible = true;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && visible && !document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    seed();
    draw(0);
    start();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        seed();
        draw(performance.now());
      }, 150);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
