import { company, contact } from "@/content/site";
import { InstagramIcon } from "./icons";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} data-theme="dark">
      <div className={styles.top}>
        <a href={contact.instagram} target="_blank" rel="noreferrer" className={styles.insta}>
          <InstagramIcon size={18} />
          {contact.instagramHandle}
        </a>
        <a href="#top" className={styles.toTop}>
          처음으로
        </a>
      </div>

      <p className={styles.wordmark} aria-hidden>
        MAISON DE L
      </p>

      <div className={styles.bottom}>
        <dl className={styles.info}>
          <div>
            <dt>상호</dt>
            <dd>{company.name}</dd>
          </div>
          <div>
            <dt>대표</dt>
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
        <p className={styles.copy}>© 메종드엘 웨딩홀. All rights reserved.</p>
      </div>
    </footer>
  );
}
