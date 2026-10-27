"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  groupContentSections,
  isHighlightParagraph,
  type ContentBlock,
  type ContentSection,
} from "@/lib/projectContent";
import styles from "./ProjectDetail.module.css";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add(styles.revealIn);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "list") {
          const compact = block.items.every((item) => item.length < 72);
          return (
            <ul
              key={index}
              className={`${styles.bodyList} ${compact ? styles.bodyListCompact : ""}`}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }

        if (isHighlightParagraph(block.text)) {
          return (
            <blockquote key={index} className={styles.pullQuote}>
              <span className={styles.pullMark} aria-hidden="true">
                ”
              </span>
              <p>{block.text}</p>
            </blockquote>
          );
        }

        return (
          <p key={index} className={styles.bodyParagraph}>
            {block.text}
          </p>
        );
      })}
    </>
  );
}

function sectionTone(index: number) {
  const tones = [
    styles.sectionToneA,
    styles.sectionToneB,
    styles.sectionToneC,
  ] as const;
  return tones[index % tones.length];
}

function SectionBlock({
  section,
  index,
}: {
  section: ContentSection;
  index: number;
}) {
  const title = section.headingLabel ?? section.heading;

  return (
    <article
      id={section.id || undefined}
      className={`${styles.section} ${sectionTone(index)}`}
    >
      {section.heading ? (
        <header className={styles.sectionHead}>
          {section.indexLabel ? (
            <span className={styles.sectionGhost} aria-hidden="true">
              {section.indexLabel}
            </span>
          ) : null}
          <div className={styles.sectionTitleWrap}>
            <p className={styles.sectionEyebrow}>
              {section.indexLabel
                ? `0${section.indexLabel}`.slice(-2)
                : "···"}
            </p>
            <h3 className={styles.bodyHeading}>{title}</h3>
            <span className={styles.sectionStroke} aria-hidden="true" />
          </div>
        </header>
      ) : null}
      <div className={styles.sectionBody}>
        <Blocks blocks={section.blocks} />
      </div>
    </article>
  );
}

export default function ProjectBody({ blocks }: { blocks: ContentBlock[] }) {
  const { lede, sections } = groupContentSections(blocks);

  return (
    <div className={styles.body}>
      {lede ? (
        <Reveal>
          <p className={styles.lede}>
            <span className={styles.ledeAccent} aria-hidden="true" />
            {lede}
          </p>
        </Reveal>
      ) : null}

      <div className={styles.sections}>
        {sections.map((section, sectionIndex) => (
          <Reveal key={section.id} delay={Math.min(sectionIndex * 35, 140)}>
            <SectionBlock section={section} index={sectionIndex} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
