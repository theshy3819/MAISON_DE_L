"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { contact } from "@/content/site";
import { useReveals } from "@/lib/useReveals";
import { CalendarIcon, NaverMark } from "./icons";
import PrivacyModal from "./PrivacyModal";
import SectionHead from "./SectionHead";
import styles from "./Reservation.module.css";

type Status = "idle" | "sending" | "done" | "error";
const PHONE_LENGTHS = [3, 4, 4];

export default function Reservation() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(["", "", ""]);
  const [date, setDate] = useState("");
  const [agree, setAgree] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const phoneRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Digits that overflow a box (fast typing or pasting "01012345678") spill into the next boxes.
  const onPhone = (i: number) => (e: ChangeEvent<HTMLInputElement>) => {
    let rest = e.target.value.replace(/\D/g, "");
    const next = [...phone];
    let last = i;
    next[i] = "";
    for (let j = i; j < PHONE_LENGTHS.length && rest; j++) {
      next[j] = rest.slice(0, PHONE_LENGTHS[j]);
      rest = rest.slice(PHONE_LENGTHS[j]);
      last = j;
    }
    setPhone(next);
    const full = next[last].length === PHONE_LENGTHS[last];
    phoneRefs.current[full ? Math.min(last + 1, PHONE_LENGTHS.length - 1) : last]?.focus();
  };

  const onPhoneKey = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !phone[i] && i > 0) phoneRefs.current[i - 1]?.focus();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const tel = phone.join("-");
    if (!name.trim()) return setError("성명을 입력해주세요.");
    if (!/^01\d-\d{3,4}-\d{4}$/.test(tel)) return setError("연락처를 정확히 입력해주세요.");
    if (!date) return setError("결혼예정일을 선택해주세요.");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(`${date}T00:00:00`) < today) return setError("결혼예정일은 오늘 이후 날짜로 선택해주세요.");
    if (!agree) return setError("개인정보 취급 방침에 동의해주세요.");
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: tel, weddingDate: date, agree }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
      setError("전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화로 문의해주세요.");
    }
  };

  return (
    <section ref={ref} id="reservation" className={styles.section} data-theme="light" aria-labelledby="reservation-title">
      <SectionHead id="reservation-title" title="Reservation" subtitle="메종드엘 예약 · 문의" />

      <div className={styles.card} data-reveal="fade">
        {status === "done" ? (
          <div className={styles.done} role="status">
            <svg viewBox="0 0 64 64" className={styles.check} aria-hidden>
              <circle cx="32" cy="32" r="30" />
              <path d="M20 33l8 8 16-17" />
            </svg>
            <p className={styles.doneTitle}>상담 신청이 접수되었습니다.</p>
            <p className={styles.doneText}>
              {name}님, 남겨주신 연락처로 신속하게 연락드리겠습니다.
              <br />
              {contact.hours}
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <p className={styles.notice}>
              <span aria-hidden>•</span> 기본정보를 입력해주시면 신속하게 연락드리겠습니다.
            </p>

            <div className={styles.fields}>
              <div className={styles.row}>
                <label htmlFor="rsv-name" className={styles.label}>
                  성명
                </label>
                <input
                  id="rsv-name"
                  className={`${styles.input} ${styles.name}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={20}
                />
              </div>

              <div className={styles.row} role="group" aria-labelledby="rsv-phone-label">
                <span id="rsv-phone-label" className={styles.label}>
                  연락처
                </span>
                <div className={styles.phone}>
                  {PHONE_LENGTHS.map((_, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        phoneRefs.current[i] = el;
                      }}
                      className={`${styles.input} ${styles.phonePart}`}
                      value={phone[i]}
                      onChange={onPhone(i)}
                      onKeyDown={onPhoneKey(i)}
                      inputMode="numeric"
                      autoComplete={i === 0 ? "tel-area-code" : "off"}
                      aria-label={["연락처 앞자리", "연락처 가운데 자리", "연락처 끝자리"][i]}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.row}>
                <label htmlFor="rsv-date" className={styles.label}>
                  결혼예정일
                </label>
                <div className={styles.dateWrap}>
                  <input
                    id="rsv-date"
                    type="date"
                    className={`${styles.input} ${styles.date}`}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    data-empty={!date || undefined}
                  />
                  <CalendarIcon className={styles.dateIcon} />
                </div>
              </div>
            </div>

            <div className={styles.agreeRow}>
              <label className={styles.agree}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span className={styles.box} aria-hidden />
                개인정보 취급 방침에 동의합니다
              </label>
              <button type="button" className={styles.more} onClick={() => setPrivacyOpen(true)}>
                자세히보기
              </button>
            </div>

            <p className={styles.error} role="alert" aria-live="polite">
              {error}
            </p>

            <button type="submit" className={styles.submit} disabled={status === "sending"} data-cursor="hover">
              <span className={styles.submitLabel}>{status === "sending" ? "신청 중…" : "이벤트 혜택 상담 신청하기"}</span>
            </button>
          </form>
        )}
      </div>

      <div className={styles.contact}>
        <p className={styles.hours} data-reveal="blur">
          {contact.hours}
        </p>
        <p className={styles.tel} data-reveal="blur" data-delay="0.08">
          예약센터 전화번호{" "}
          <a href={`tel:${contact.phone.replaceAll("-", "")}`} className={styles.telLink}>
            {contact.phone}
          </a>
        </p>
        <p className={styles.naver} data-reveal="blur" data-delay="0.16">
          네이버 예약 링크 :
          <a href={contact.naverBooking} target="_blank" rel="noreferrer" aria-label="네이버 예약 (새 창)" data-cursor="hover">
            <NaverMark size={40} />
          </a>
        </p>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} onAgree={() => setAgree(true)} />
    </section>
  );
}
