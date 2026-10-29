"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { location } from "@/content/site";
import { useReveals } from "@/lib/useReveals";
import { KakaoMapMark, NaverMark, TmapMark } from "./icons";
import KakaoMap from "./KakaoMap";
import SectionHead from "./SectionHead";
import styles from "./Location.module.css";

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

const apps = [
  { key: "naver", name: "네이버 지도", Mark: NaverMark },
  { key: "kakao", name: "카카오맵", Mark: KakaoMapMark },
  { key: "tmap", name: "T map", Mark: TmapMark },
] as const;

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  const [liveMap, setLiveMap] = useState(Boolean(KAKAO_KEY));
  const onFail = useCallback(() => setLiveMap(false), []);
  const venue = location.places[0];

  return (
    <section ref={ref} id="location" className={styles.section} data-theme="light" aria-labelledby="location-title">
      <SectionHead id="location-title" title={location.title} subtitle={location.subtitle} />

      <div className={styles.map} data-reveal="frame">
        <div className={styles.mapMedia} data-reveal-media>
          <Image src={location.staticMap} alt={`메종드엘 위치 지도: ${location.query}`} fill sizes="(max-width: 1500px) 94vw, 1424px" />
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
        <a href={venue.links.kakao} target="_blank" rel="noreferrer" className={styles.open} data-cursor="hover">
          카카오맵에서 크게 보기
          <span aria-hidden>↗</span>
        </a>
      </div>

      <dl className={styles.info}>
        {location.info.map((item, i) => (
          <div key={item.title} className={styles.infoItem} data-reveal="blur" data-delay={i * 0.1}>
            <dt>{item.title}</dt>
            <dd>{item.text}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.places}>
        {location.places.map((place, i) => (
          <div key={place.label} className={styles.place} data-reveal="fade" data-delay={i * 0.12}>
            <p className={styles.placeLabel}>{place.label}</p>
            <ul className={styles.apps}>
              {apps.map(({ key, name, Mark }) => (
                <li key={key}>
                  <a
                    href={place.links[key]}
                    target={key === "tmap" ? undefined : "_blank"}
                    rel="noreferrer"
                    className={styles.app}
                    aria-label={`${place.label} ${name}로 길찾기${key === "tmap" ? " (T map 앱 필요)" : " (새 창)"}`}
                    data-cursor="hover"
                  >
                    <Mark className={styles.appMark} />
                    <span className={styles.appName} aria-hidden>
                      {name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
