"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FACETS } from "@/lib/facets";
import styles from "./Identity.module.css";

const INTERVAL_MS = 5000;

export default function Identity() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => {
      setActive((current) => (current + 1) % FACETS.length);
    }, INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [active, reduced]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      if (reduced) {
        video.pause();
        return;
      }
      void video.play().catch(() => {});
    });
  }, [reduced]);

  return (
    <section id="identidad" className={styles.section} aria-label="Quién soy">
      {FACETS.map((facet, index) => {
        const open = index === active;
        const label = facet.lines.join(" ");
        return (
          <article
            key={facet.slug}
            className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
          >
            <button
              type="button"
              className={styles.hit}
              aria-expanded={open}
              aria-label={label}
              onClick={() => setActive(index)}
              tabIndex={open ? -1 : 0}
            />
            {facet.video ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className={styles.photo}
                src={facet.video}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={facet.alt}
              />
            ) : (
              <Image
                src={facet.image!}
                alt={facet.alt}
                fill
                sizes="(max-width: 720px) 78vw, 45vw"
                quality={90}
                className={styles.photo}
                style={{ objectPosition: facet.position }}
              />
            )}
            <div className={styles.caption}>
              <p className={styles.note}>{facet.note}</p>
              <h2 className={styles.title}>
                {facet.lines.map((line) => (
                  <span key={line} className={styles.line}>
                    {line}
                  </span>
                ))}
              </h2>
              <Link
                href={facet.href}
                className={styles.cta}
                tabIndex={open ? 0 : -1}
                aria-hidden={!open}
                onClick={(event) => event.stopPropagation()}
              >
                {facet.cta}
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
