"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { PortfolioProject } from "@/lib/projects";
import styles from "./ProjectDetail.module.css";

export default function ScreenshotCarousel({
  project,
  locale,
  prevLabel = "Previous screenshot",
  nextLabel = "Next screenshot",
  shotsLabel = "Screenshots",
}: {
  project: PortfolioProject;
  locale: Locale;
  prevLabel?: string;
  nextLabel?: string;
  shotsLabel?: string;
}) {
  const shots = project.screenshots;
  const [index, setIndex] = useState(0);
  const total = shots.length;
  const current = shots[index];
  const videoRef = useRef<HTMLVideoElement>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (total < 2) return;
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (total < 2) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = current?.playbackRate ?? 1;
  }, [current, index]);

  if (!current) return null;

  const isVideo =
    current.kind === "video" ||
    /\.(mp4|webm|mov|ogg)(\?|$)/i.test(current.src);

  return (
    <div className={styles.carousel} aria-roledescription="carousel">
      <figure className={styles.frame}>
        <div className={styles.frameChrome} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div
          className={`${styles.frameMedia} ${isVideo ? styles.frameMediaVideo : ""}`}
        >
          {isVideo ? (
            <video
              key={`${project.id}-${index}-video`}
              ref={videoRef}
              className={styles.frameVideo}
              controls
              playsInline
              preload="metadata"
              poster={current.poster}
              aria-label={current.alt[locale]}
              onLoadedMetadata={(event) => {
                event.currentTarget.playbackRate = current.playbackRate ?? 1;
              }}
            >
              <source src={current.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              key={`${project.id}-${index}`}
              src={current.src}
              alt={current.alt[locale]}
              fill
              sizes="(max-width: 900px) 100vw, 720px"
              quality={92}
              className={styles.frameImage}
              style={
                project.imageZoom && current.src === project.image
                  ? {
                      transform: `scale(${project.imageZoom})`,
                      ...(project.imageZoom < 1
                        ? { objectFit: "contain" as const }
                        : null),
                    }
                  : undefined
              }
            />
          )}
        </div>
        {current.caption ? (
          <figcaption className={styles.caption}>{current.caption[locale]}</figcaption>
        ) : null}
      </figure>

      {total > 1 ? (
        <div className={styles.carouselControls}>
          <button
            type="button"
            className={styles.carouselBtn}
            onClick={() => go(-1)}
            aria-label={prevLabel}
          >
            ←
          </button>
          <div className={styles.carouselDots} role="tablist" aria-label={shotsLabel}>
            {shots.map((shot, i) => (
              <button
                key={`${project.id}-dot-${i}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${shotsLabel} ${i + 1}`}
                className={`${styles.carouselDot} ${i === index ? styles.carouselDotActive : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.carouselBtn}
            onClick={() => go(1)}
            aria-label={nextLabel}
          >
            →
          </button>
          <p className={styles.carouselCount} aria-live="polite">
            {index + 1} / {total}
          </p>
        </div>
      ) : null}
    </div>
  );
}
