"use client";

import { useEffect, useRef, useState } from "react";

/* Minimal typings for the bits of the Kakao Maps SDK used here */
type LatLng = object;
type KakaoMaps = {
  load: (cb: () => void) => void;
  LatLng: new (lat: number, lng: number) => LatLng;
  Map: new (el: HTMLElement, opts: { center: LatLng; level: number; scrollwheel?: boolean }) => {
    setCenter: (p: LatLng) => void;
    relayout: () => void;
  };
  CustomOverlay: new (opts: { position: LatLng; content: HTMLElement; yAnchor?: number }) => { setMap: (m: unknown) => void };
  services: {
    Geocoder: new () => {
      addressSearch: (q: string, cb: (res: { x: string; y: string }[], status: string) => void) => void;
    };
    Status: { OK: string };
  };
};

declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
  }
}

const SDK_ID = "kakao-maps-sdk";

function loadSdk(appKey: string) {
  return new Promise<KakaoMaps>((resolve, reject) => {
    if (window.kakao?.maps) return window.kakao.maps.load(() => resolve(window.kakao!.maps));
    let script = document.getElementById(SDK_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SDK_ID;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => window.kakao!.maps.load(() => resolve(window.kakao!.maps)));
    script.addEventListener("error", reject);
  });
}

type Props = {
  appKey: string;
  query: string;
  coords: { lat: number; lng: number } | null;
  label: string;
  markerClassName: string;
  onFail: () => void;
};

/** Live Kakao map centred on the venue, with a custom label pin instead of the stock marker. */
export default function KakaoMap({ appKey, query, coords, label, markerClassName, onFail }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadSdk(appKey)
      .then((maps) => {
        const el = ref.current;
        if (cancelled || !el) return;
        const place = (lat: number, lng: number) => {
          const center = new maps.LatLng(lat, lng);
          const map = new maps.Map(el, { center, level: 3, scrollwheel: false });
          const pin = document.createElement("div");
          pin.className = markerClassName;
          pin.textContent = label;
          new maps.CustomOverlay({ position: center, content: pin, yAnchor: 1 }).setMap(map);
          setReady(true);
        };
        if (coords) return place(coords.lat, coords.lng);
        new maps.services.Geocoder().addressSearch(query, (res, status) => {
          if (cancelled) return;
          if (status === maps.services.Status.OK && res[0]) place(Number(res[0].y), Number(res[0].x));
          else onFail();
        });
      })
      .catch(() => !cancelled && onFail());
    return () => {
      cancelled = true;
    };
  }, [appKey, query, coords, label, markerClassName, onFail]);

  return <div ref={ref} style={{ position: "absolute", inset: 0, opacity: ready ? 1 : 0, transition: "opacity 0.8s" }} />;
}
