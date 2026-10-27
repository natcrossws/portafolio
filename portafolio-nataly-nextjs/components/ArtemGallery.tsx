"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ARTEM_WORKS, type ArtemKind, type ArtemWork } from "@/lib/artem";
import { useI18n } from "@/lib/i18n/I18nProvider";
import styles from "./ArtemGallery.module.css";

type Filter = "all" | ArtemKind;

export default function ArtemGallery() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<ArtemWork | null>(null);

  const works = useMemo(
    () =>
      filter === "all"
        ? ARTEM_WORKS
        : ARTEM_WORKS.filter((work) => work.kind === filter),
    [filter],
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const copyFor = (id: string) => t.artem.works[id];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          ← {t.facetPage.back}
        </Link>
        <p className={styles.eyebrow}>{t.artem.eyebrow}</p>
        <h1 className={styles.title}>{t.artem.title}</h1>
        <p className={styles.lead}>{t.artem.lead}</p>

        <div className={styles.filters} role="tablist" aria-label={t.artem.title}>
          {(
            [
              ["all", t.artem.filters.all],
              ["painting", t.artem.filters.painting],
              ["illustration", t.artem.filters.illustration],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={filter === value}
              className={`${styles.filter} ${filter === value ? styles.filterActive : ""}`}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <section className={styles.grid} aria-label={t.artem.title}>
        {works.map((work, index) => {
          const copy = copyFor(work.id);
          return (
            <button
              key={work.id}
              type="button"
              className={`${styles.tile} ${styles[work.aspect]}`}
              style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
              onClick={() => setActive(work)}
            >
              <span className={styles.frame}>
                <Image
                  src={work.src}
                  alt={copy?.title ?? work.id}
                  fill
                  sizes="(max-width: 720px) 90vw, (max-width: 1100px) 40vw, 280px"
                  quality={90}
                  className={styles.photo}
                />
              </span>
              <span className={styles.caption}>
                <span className={styles.workTitle}>{copy?.title}</span>
                <span className={styles.workKind}>
                  {t.artem.medium[work.kind]}
                </span>
              </span>
            </button>
          );
        })}
      </section>

      {active && (
        <div className={styles.lightbox} role="presentation">
          <button
            type="button"
            className={styles.backdrop}
            aria-label={t.artem.close}
            onClick={() => setActive(null)}
          />
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={copyFor(active.id)?.title}
          >
            <button
              type="button"
              className={styles.close}
              onClick={() => setActive(null)}
              aria-label={t.artem.close}
            >
              ×
            </button>
            <div className={styles.lightboxMedia}>
              <Image
                src={active.src}
                alt={copyFor(active.id)?.title ?? active.id}
                fill
                sizes="(max-width: 900px) 92vw, 70vw"
                quality={92}
                className={styles.lightboxPhoto}
                priority
              />
            </div>
            <div className={styles.lightboxCopy}>
              <p className={styles.workKind}>{t.artem.medium[active.kind]}</p>
              <h2 className={styles.lightboxTitle}>
                {copyFor(active.id)?.title}
              </h2>
              {copyFor(active.id)?.note ? (
                <p className={styles.lightboxNote}>{copyFor(active.id)?.note}</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
