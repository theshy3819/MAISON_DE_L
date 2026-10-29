import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";

type Props = {
  id: string;
  title: ReactNode;
  subtitle: string;
  tone?: "dark" | "light";
};

/** Hairline + display title + subtitle that opens every section in the design. */
export default function SectionHead({ id, title, subtitle, tone = "light" }: Props) {
  return (
    <header className={styles.head} data-tone={tone}>
      <span className={styles.line} data-reveal="line-y" aria-hidden />
      <div className={styles.text}>
        <h2 id={id} className={styles.title} data-reveal="title" data-delay="0.35">
          {title}
        </h2>
        <p className={styles.subtitle} data-reveal="blur" data-delay="0.6">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
