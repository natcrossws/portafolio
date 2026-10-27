"use client";

import Image from "next/image";
import Link from "next/link";
import type { FacetMedia } from "@/lib/facets";
import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./FacetPage.module.css";

export default function FacetPage({ facet }: { facet: FacetMedia }) {
  const { t } = useI18n();
  const copy = t.identity.facets[facet.slug];

  return (
    <main className={styles.page}>
      <div className={styles.media}>
        {facet.video ? (
          <video
            className={styles.photo}
            src={facet.video}
            muted
            loop
            autoPlay
            playsInline
            aria-label={copy.alt}
          />
        ) : (
          <Image
            src={facet.image!}
            alt={copy.alt}
            fill
            priority
            sizes="100vw"
            quality={92}
            className={styles.photo}
            style={{ objectPosition: facet.position }}
          />
        )}
        <div className={styles.shade} />
      </div>

      <div className={styles.content}>
        <Link href="/#portafolio" className={styles.back}>
          ← {t.facetPage.back}
        </Link>
        <p className={styles.note}>{copy.note}</p>
        <h1 className={styles.title}>
          {copy.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className={styles.lead}>{copy.lead}</p>
      </div>
    </main>
  );
}
