"use client";

import { useRef, useState } from "react";
import { location } from "@/content/site";
import { useReveals } from "@/lib/useReveals";
import styles from "./Location.module.css";

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  // The map ignores the pointer until clicked, so scrolling past it never pans or zooms it by accident.
  const [mapActive, setMapActive] = useState(false);

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

        <figure
          className={styles.map}
          data-active={mapActive || undefined}
          data-reveal="rise"
          onPointerLeave={() => setMapActive(false)}
        >
          <div className={styles.mapMedia} data-reveal-media>
            <iframe
              src={location.mapEmbed}
              title={`메종드엘 위치 지도: ${location.address}`}
              className={styles.frame}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              tabIndex={mapActive ? 0 : -1}
            />
          </div>
          {!mapActive && (
            <button type="button" className={styles.shield} onClick={() => setMapActive(true)}>
              <span className={styles.shieldLabel}>클릭해서 지도 움직이기</span>
            </button>
          )}
        </figure>
      </div>
    </section>
  );
}
