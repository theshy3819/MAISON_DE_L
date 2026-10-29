"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { location } from "@/content/site";
import { useReveals } from "@/lib/useReveals";
import KakaoMap from "./KakaoMap";
import styles from "./Location.module.css";

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  const [liveMap, setLiveMap] = useState(Boolean(KAKAO_KEY));
  const onFail = useCallback(() => setLiveMap(false), []);

  return (
    <section ref={ref} id="location" className={styles.location} data-theme="light" aria-labelledby="location-title">
      <div className={styles.grid}>
        <div className={styles.text}>
          <h2 id="location-title" className={styles.title} data-reveal="lines">
            {location.title}
          </h2>
          <p className={styles.address} data-reveal="lines" data-delay="0.1">
            {location.address}
          </p>
          <p className={styles.building}>{location.building}</p>

          <dl className={styles.info}>
            {location.info.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>

          <ul className={styles.links} aria-label="지도 앱에서 열기">
            {location.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.app ? undefined : "_blank"}
                  rel="noreferrer"
                  className={styles.link}
                  aria-label={link.app ? `${link.label} 앱에서 열기` : `${link.label}에서 열기 (새 창)`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <figure className={styles.map} data-reveal="rise">
          <div className={styles.mapMedia} data-reveal-media>
            <Image src={location.staticMap} alt={`메종드엘 위치 지도: ${location.address}`} fill sizes="(max-width: 900px) 92vw, 52vw" />
            {liveMap && KAKAO_KEY && (
              <KakaoMap
                appKey={KAKAO_KEY}
                query={location.query}
                coords={location.coords}
                label="메종드엘"
                markerClassName={styles.pin}
                onFail={onFail}
              />
            )}
          </div>
          {!liveMap && <span className={styles.pulse} aria-hidden />}
        </figure>
      </div>
    </section>
  );
}
