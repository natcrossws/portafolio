import Image from "next/image";
import Link from "next/link";
import type { Facet } from "@/lib/facets";
import styles from "./FacetPage.module.css";

export default function FacetPage({ facet }: { facet: Facet }) {
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
            aria-label={facet.alt}
          />
        ) : (
          <Image
            src={facet.image!}
            alt={facet.alt}
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
        <Link href="/#identidad" className={styles.back}>
          ← Volver
        </Link>
        <p className={styles.note}>{facet.note}</p>
        <h1 className={styles.title}>
          {facet.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className={styles.lead}>{facet.lead}</p>
      </div>
    </main>
  );
}
