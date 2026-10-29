"use client";

/** Tiny signal shared by the intro loader and the sections that wait for it. */
const EVENT = "maison:intro-complete";

declare global {
  interface Window {
    __maisonIntroDone?: boolean;
  }
}

export function completeIntro() {
  window.__maisonIntroDone = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onIntroComplete(cb: () => void) {
  if (window.__maisonIntroDone) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}
