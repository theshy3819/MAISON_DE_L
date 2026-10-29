"use client";

import { useEffect, useRef } from "react";
import { company } from "@/content/site";
import { useLenis } from "./SmoothScroll";
import { CloseIcon } from "./icons";
import styles from "./PrivacyModal.module.css";

type Props = { open: boolean; onClose: () => void; onAgree: () => void };

/** 개인정보취급방침 자세히보기 팝업 — native <dialog> for focus trapping and Esc handling. */
export default function PrivacyModal({ open, onClose, onAgree }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lenis?.stop();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, lenis]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="privacy-title"
      onClose={() => {
        lenis?.start();
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className={styles.panel}>
        <header className={styles.head}>
          <h2 id="privacy-title">개인정보취급방침</h2>
          <button type="button" className={styles.x} onClick={onClose} aria-label="닫기">
            <CloseIcon />
          </button>
        </header>
        {/* TODO: 법무 검토된 최종 문구로 교체 */}
        <div className={styles.body} data-lenis-prevent>
          <p>
            {company.name}(이하 &lsquo;회사&rsquo;)는 상담 신청을 위해 아래와 같이 개인정보를 수집·이용합니다.
          </p>
          <dl>
            <dt>수집 항목</dt>
            <dd>성명, 연락처, 결혼예정일</dd>
            <dt>수집·이용 목적</dt>
            <dd>웨딩 상담 및 예약 안내, 이벤트 혜택 안내</dd>
            <dt>보유·이용 기간</dt>
            <dd>상담 완료 후 1년간 보관하며, 목적 달성 시 지체 없이 파기합니다.</dd>
            <dt>동의 거부 권리</dt>
            <dd>개인정보 수집·이용에 동의하지 않을 권리가 있으며, 동의 거부 시 상담 신청이 제한될 수 있습니다.</dd>
            <dt>개인정보 보호책임자</dt>
            <dd>
              {company.privacyOfficer} ({company.email})
            </dd>
          </dl>
        </div>
        <footer className={styles.foot}>
          <button
            type="button"
            className={styles.agree}
            onClick={() => {
              onAgree();
              onClose();
            }}
          >
            동의하고 닫기
          </button>
          <button type="button" className={styles.close} onClick={onClose}>
            닫기
          </button>
        </footer>
      </div>
    </dialog>
  );
}
