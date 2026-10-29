"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { contact, reservation } from "@/content/site";
import { useReveals } from "@/lib/useReveals";
import PrivacyModal from "./PrivacyModal";
import styles from "./Reservation.module.css";

type Status = "idle" | "sending" | "done" | "error";

// 01012345678 → 010-1234-5678 as the visitor types
const formatPhone = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`;
};

export default function Reservation() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [agree, setAgree] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("성함을 입력해 주세요.");
    if (!/^01\d-\d{3,4}-\d{4}$/.test(phone)) return setError("연락처를 010-0000-0000 형식으로 입력해 주세요.");
    if (!date) return setError("결혼 예정일을 선택해 주세요.");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(`${date}T00:00:00`) < today) return setError("결혼 예정일은 오늘 이후로 선택해 주세요.");
    if (!agree) return setError("개인정보 수집·이용에 동의해 주세요.");
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, weddingDate: date, agree }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
      setError(`신청을 보내지 못했습니다. 잠시 후 다시 시도하거나 ${contact.phone}로 전화해 주세요.`);
    }
  };

  return (
    <section ref={ref} id="reservation" className={styles.section} data-theme="dark" aria-labelledby="reservation-title">
      <div className={styles.grid}>
        <figure className={styles.arch} data-reveal="rise">
          <div className={styles.archMedia} data-reveal-media>
            <Image src={reservation.image.src} alt={reservation.image.alt} fill sizes="(max-width: 900px) 70vw, 38vw" />
          </div>
        </figure>

        <div className={styles.panel}>
          <h2 id="reservation-title" className={styles.title} data-reveal="lines">
            {reservation.title}
          </h2>
          <p className={styles.lead}>{reservation.text}</p>

          {status === "done" ? (
            <div className={styles.done} role="status">
              <p className={styles.doneTitle}>상담 신청을 받았습니다.</p>
              <p>
                {name}님, {contact.hours} 안에 {phone}로 연락드리겠습니다.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.field}>
                <input
                  id="rsv-name"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={20}
                  placeholder=" "
                />
                <label htmlFor="rsv-name" className={styles.label}>
                  성함
                </label>
              </div>
              <div className={styles.field}>
                <input
                  id="rsv-phone"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder=" "
                />
                <label htmlFor="rsv-phone" className={styles.label}>
                  연락처
                </label>
              </div>
              <div className={styles.field}>
                <input
                  id="rsv-date"
                  type="date"
                  className={styles.input}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  data-empty={!date || undefined}
                />
                <label htmlFor="rsv-date" className={`${styles.label} ${styles.labelFixed}`}>
                  결혼 예정일
                </label>
              </div>

              <div className={styles.agreeRow}>
                <label className={styles.agree}>
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                  <span className={styles.box} aria-hidden />
                  개인정보 수집·이용에 동의합니다
                </label>
                <button type="button" className={styles.more} onClick={() => setPrivacyOpen(true)}>
                  내용 보기
                </button>
              </div>

              <p className={styles.error} role="alert" aria-live="polite">
                {error}
              </p>

              <button type="submit" className={styles.submit} disabled={status === "sending"}>
                {status === "sending" ? "보내는 중…" : "상담 신청하기"}
              </button>
            </form>
          )}

          <div className={styles.direct}>
            <a href={`tel:${contact.phone.replaceAll("-", "")}`} className={styles.tel}>
              {contact.phone}
            </a>
            <p className={styles.directMeta}>
              {contact.hours}
              <a href={contact.naverBooking} target="_blank" rel="noreferrer" className={styles.naver}>
                네이버 예약으로 신청하기
              </a>
            </p>
          </div>
        </div>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} onAgree={() => setAgree(true)} />
    </section>
  );
}
