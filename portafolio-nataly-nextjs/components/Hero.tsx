"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className={styles.hero} aria-label={t.hero.aria}>
      <div className={styles.mesh} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobA}`} />
        <span className={`${styles.blob} ${styles.blobB}`} />
        <span className={`${styles.blob} ${styles.blobC}`} />
        <span className={`${styles.blob} ${styles.blobD}`} />
        <span className={`${styles.blob} ${styles.blobE}`} />
      </div>

      <div className={styles.copy}>
        <h1 className={styles.name}>Nataly Melo</h1>
        <p className={styles.roles}>
          {t.hero.role1}
          <br />
          {t.hero.role2}
          <br />
          {t.hero.role3a}{" "}
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>{" "}
          {t.hero.role3b}
        </p>
      </div>
    </section>
  );
}
