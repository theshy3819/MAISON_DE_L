"use client";

import Lenis from "lenis";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// One Lenis instance for the page, exposed through a tiny external store.
let instance: Lenis | null = null;
const listeners = new Set<() => void>();
const setInstance = (next: Lenis | null) => {
  instance = next;
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useLenis = () =>
  useSyncExternalStore(
    subscribe,
    () => instance,
    () => null,
  );

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Web fonts change line heights after first paint; re-measure every trigger once they land.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      anchors: true,
    });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setInstance(lenis);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setInstance(null);
    };
  }, []);

  return children;
}
