"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./About.module.css";

const PHOTO = "/nataly-about.jpeg";

export default function About() {
  const { t } = useI18n();
  const { about } = t;
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="sobre" className={styles.section} aria-label={about.aria}>
      <div className={styles.inner}>
        <figure className={styles.figure}>
          <Image
            src={PHOTO}
            alt={about.photoAlt}
            fill
            sizes="(max-width: 820px) 72vw, 340px"
            quality={92}
            className={styles.photo}
            priority={false}
          />
        </figure>

        <div className={styles.copy}>
          <p className={styles.kicker}>{about.kicker}</p>
          <h2 className={styles.title}>{about.title}</h2>

          <div className={styles.body}>
            <p className={styles.lead}>{lead}</p>
            {rest.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ul className={styles.stats}>
            {about.stats.map((stat) => (
              <li key={stat.value} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
