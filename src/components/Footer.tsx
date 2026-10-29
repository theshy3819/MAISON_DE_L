import Image from "next/image";
import { company } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} data-theme="dark">
      <a href="#top" className={styles.logo} aria-label="맨 위로">
        <Image src="/images/logo-white.png" alt="MAISON DE L GWANGJU" width={187} height={60} />
      </a>
      <dl className={styles.info}>
        <div>
          <dt>상호명</dt>
          <dd>{company.name}</dd>
        </div>
        <div>
          <dt>대표자</dt>
          <dd>{company.ceo}</dd>
        </div>
        <div>
          <dt>주소</dt>
          <dd>{company.address}</dd>
        </div>
        <div>
          <dt>사업자등록번호</dt>
          <dd>{company.bizNo}</dd>
        </div>
        <div>
          <dt>대표전화</dt>
          <dd>
            <a href={`tel:${company.tel.replaceAll("-", "")}`}>{company.tel}</a>
          </dd>
        </div>
        <span className={styles.break} aria-hidden />
        <div>
          <dt>이메일</dt>
          <dd>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </dd>
        </div>
        <div>
          <dt>개인정보관리책임자</dt>
          <dd>{company.privacyOfficer}</dd>
        </div>
      </dl>
      <p className={styles.copy}>Copyright© 메종드엘 웨딩홀 All Rights Reserved.</p>
    </footer>
  );
}
