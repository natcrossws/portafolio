"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/dictionaries";
import styles from "./BrandBookFlip.module.css";

export type BrandBookSheet = {
  src: string;
  alt: string;
};

type Spread =
  | { kind: "cover"; page: BrandBookSheet }
  | { kind: "open"; left: BrandBookSheet | null; right: BrandBookSheet | null };

function buildSpreads(pages: BrandBookSheet[]): Spread[] {
  if (pages.length === 0) return [];
  const [cover, ...rest] = pages;
  const spreads: Spread[] = [{ kind: "cover", page: cover }];
  for (let i = 0; i < rest.length; i += 2) {
    spreads.push({
      kind: "open",
      left: rest[i] ?? null,
      right: rest[i + 1] ?? null,
    });
  }
  return spreads;
}

function useCompactMode(breakpoint = 760) {
  const [compact, setCompact] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [breakpoint]);

  return compact;
}

function Leaf({
  page,
  side,
  priority = false,
}: {
  page: BrandBookSheet;
  side: "left" | "right" | "cover";
  priority?: boolean;
}) {
  return (
    <div
      className={[
        styles.leaf,
        side === "left" ? styles.leafLeft : "",
        side === "right" ? styles.leafRight : "",
        side === "cover" ? styles.leafCover : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={page.src}
        alt={page.alt}
        width={932}
        height={1212}
        quality={95}
        priority={priority}
        className={styles.leafImage}
      />
    </div>
  );
}

function OpenSpread({
  left,
  right,
  under = false,
  ghost = false,
  flipRight,
  flipClass,
}: {
  left: BrandBookSheet | null;
  right: BrandBookSheet | null;
  under?: boolean;
  ghost?: boolean;
  flipRight?: BrandBookSheet | null;
  flipClass?: string;
}) {
  return (
    <div
      className={[
        styles.spread,
        under ? styles.spreadUnder : styles.spreadTop,
        ghost ? styles.spreadGhost : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {left ? (
        <Leaf page={left} side="left" />
      ) : (
        <div className={styles.leafGhost} aria-hidden="true" />
      )}
      <span className={styles.spine} aria-hidden="true" />
      <div className={styles.rightStack}>
        {right ? (
          <Leaf page={right} side="right" />
        ) : (
          <div className={styles.leafGhost} aria-hidden="true" />
        )}
        {flipRight ? (
          <div className={[styles.flipLeaf, flipClass].filter(Boolean).join(" ")}>
            <Leaf page={flipRight} side="right" />
            <div className={styles.flipLeafBack} aria-hidden="true" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Controls({
  locale,
  index,
  total,
  busy,
  onPrev,
  onNext,
}: {
  locale: Locale;
  index: number;
  total: number;
  busy: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.btn}
        onClick={onPrev}
        disabled={index === 0 || busy}
        aria-label={locale === "es" ? "Página anterior" : "Previous page"}
      >
        ←
      </button>
      <p className={styles.count}>
        {index + 1} / {total}
      </p>
      <button
        type="button"
        className={styles.btn}
        onClick={onNext}
        disabled={index >= total - 1 || busy}
        aria-label={locale === "es" ? "Página siguiente" : "Next page"}
      >
        →
      </button>
    </div>
  );
}

function CompactFlip({
  pages,
  locale,
}: {
  pages: BrandBookSheet[];
  locale: Locale;
}) {
  const total = pages.length;
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<"idle" | "next" | "prev">("idle");
  const lock = useRef(false);
  const touchX = useRef<number | null>(null);

  const current = pages[index] ?? pages[0];
  const under =
    anim === "next"
      ? pages[index + 1]
      : anim === "prev"
        ? current
        : null;
  const top = anim === "prev" ? pages[index - 1] : current;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (lock.current || total < 2) return;
      const next = index + dir;
      if (next < 0 || next >= total) return;
      lock.current = true;
      setAnim(dir === 1 ? "next" : "prev");
      window.setTimeout(() => {
        setIndex(next);
        setAnim("idle");
        lock.current = false;
      }, 380);
    },
    [index, total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!current || !top) return null;

  return (
    <div className={styles.stage}>
      <p className={styles.hint}>
        {locale === "es" ? "Desliza para pasar" : "Swipe to turn"}
      </p>

      <div
        className={`${styles.book} ${styles.bookCompact}`}
        aria-live="polite"
        aria-label={
          locale === "es"
            ? `Página ${index + 1} de ${total}`
            : `Page ${index + 1} of ${total}`
        }
        onTouchStart={(event) => {
          touchX.current = event.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchX.current == null) return;
          const endX = event.changedTouches[0]?.clientX ?? touchX.current;
          const delta = endX - touchX.current;
          touchX.current = null;
          if (Math.abs(delta) < 40) return;
          go(delta < 0 ? 1 : -1);
        }}
      >
        <button
          type="button"
          className={`${styles.hotspot} ${styles.hotspotPrev}`}
          onClick={() => go(-1)}
          disabled={index === 0 || anim !== "idle"}
          aria-label={locale === "es" ? "Página anterior" : "Previous page"}
        />
        <button
          type="button"
          className={`${styles.hotspot} ${styles.hotspotNext}`}
          onClick={() => go(1)}
          disabled={index >= total - 1 || anim !== "idle"}
          aria-label={locale === "es" ? "Página siguiente" : "Next page"}
        />

        <div className={styles.compactFrame}>
          {under ? (
            <div className={`${styles.compactSheet} ${styles.compactUnder}`}>
              <Image
                src={under.src}
                alt=""
                width={932}
                height={1212}
                quality={95}
                className={styles.leafImage}
              />
            </div>
          ) : null}

          <div
            className={[
              styles.compactSheet,
              styles.compactTop,
              anim === "next" ? styles.slideNext : "",
              anim === "prev" ? styles.slidePrev : "",
            ]
              .filter(Boolean)
              .join(" ")}
            key={anim === "prev" ? `prev-${top.src}` : top.src}
          >
            <Image
              src={top.src}
              alt={top.alt}
              width={932}
              height={1212}
              quality={95}
              priority={index === 0}
              className={styles.leafImage}
            />
          </div>
        </div>
      </div>

      <Controls
        locale={locale}
        index={index}
        total={total}
        busy={anim !== "idle"}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </div>
  );
}

function DesktopFlip({
  pages,
  locale,
}: {
  pages: BrandBookSheet[];
  locale: Locale;
}) {
  const spreads = buildSpreads(pages);
  const total = spreads.length;
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<"idle" | "next" | "prev">("idle");
  const lock = useRef(false);

  const current = spreads[index] ?? spreads[0];
  const nextSpread = spreads[index + 1];
  const prevSpread = spreads[index - 1];

  const go = useCallback(
    (dir: -1 | 1) => {
      if (lock.current || total < 2) return;
      const next = index + dir;
      if (next < 0 || next >= total) return;
      lock.current = true;
      setAnim(dir === 1 ? "next" : "prev");
      window.setTimeout(() => {
        setIndex(next);
        setAnim("idle");
        lock.current = false;
      }, 640);
    },
    [index, total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!current) return null;

  const opening = anim === "next" && current.kind === "cover" && nextSpread?.kind === "open";
  const closing = anim === "prev" && current.kind === "open" && prevSpread?.kind === "cover";
  const turningNext =
    anim === "next" && current.kind === "open" && nextSpread?.kind === "open";
  const turningPrev =
    anim === "prev" && current.kind === "open" && prevSpread?.kind === "open";
  const showOpenShell = current.kind === "open" || opening || closing;

  return (
    <div className={styles.stage}>
      <p className={styles.hint}>
        {locale === "es"
          ? "Manual interactivo · abre el libro y pasa las páginas"
          : "Interactive manual · open the book and turn the pages"}
      </p>

      <div
        className={[
          styles.book,
          showOpenShell ? styles.bookOpen : styles.bookClosed,
        ].join(" ")}
        aria-live="polite"
        aria-label={
          locale === "es"
            ? `Hoja ${index + 1} de ${total}`
            : `Spread ${index + 1} of ${total}`
        }
      >
        <button
          type="button"
          className={`${styles.hotspot} ${styles.hotspotPrev}`}
          onClick={() => go(-1)}
          disabled={index === 0 || anim !== "idle"}
          aria-label={locale === "es" ? "Página anterior" : "Previous page"}
        />
        <button
          type="button"
          className={`${styles.hotspot} ${styles.hotspotNext}`}
          onClick={() => go(1)}
          disabled={index >= total - 1 || anim !== "idle"}
          aria-label={locale === "es" ? "Página siguiente" : "Next page"}
        />

        <div className={styles.frame}>
          {current.kind === "cover" && !opening ? (
            <div className={`${styles.spread} ${styles.spreadTop} ${styles.spreadCover}`}>
              <Leaf page={current.page} side="cover" priority />
            </div>
          ) : null}

          {opening && nextSpread?.kind === "open" && current.kind === "cover" ? (
            <OpenSpread
              left={nextSpread.left}
              right={nextSpread.right}
              flipRight={current.page}
              flipClass={styles.flipCoverOpen}
            />
          ) : null}

          {closing && current.kind === "open" && prevSpread?.kind === "cover" ? (
            <OpenSpread
              left={current.left}
              right={current.right}
              flipRight={prevSpread.page}
              flipClass={styles.flipCoverClose}
            />
          ) : null}

          {current.kind === "open" && anim === "idle" ? (
            <OpenSpread left={current.left} right={current.right} />
          ) : null}

          {turningNext && current.kind === "open" && nextSpread?.kind === "open" ? (
            <>
              <OpenSpread left={nextSpread.left} right={nextSpread.right} under />
              <OpenSpread
                left={null}
                right={null}
                ghost
                flipRight={current.right}
                flipClass={styles.flipLeafNext}
              />
            </>
          ) : null}

          {turningPrev && current.kind === "open" && prevSpread?.kind === "open" ? (
            <>
              <OpenSpread left={prevSpread.left} right={prevSpread.right} under />
              <OpenSpread
                left={null}
                right={null}
                ghost
                flipRight={prevSpread.right}
                flipClass={styles.flipLeafPrev}
              />
            </>
          ) : null}
        </div>
      </div>

      <Controls
        locale={locale}
        index={index}
        total={total}
        busy={anim !== "idle"}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </div>
  );
}

export default function BrandBookFlip({
  pages,
  locale,
}: {
  pages: BrandBookSheet[];
  locale: Locale;
}) {
  const compact = useCompactMode(700);

  if (compact === null) {
    return (
      <div className={styles.stage}>
        <div className={`${styles.book} ${styles.bookPending}`} aria-hidden="true" />
      </div>
    );
  }

  if (compact) {
    return <CompactFlip pages={pages} locale={locale} />;
  }

  return <DesktopFlip pages={pages} locale={locale} />;
}
