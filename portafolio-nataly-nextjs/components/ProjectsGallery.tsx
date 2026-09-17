"use client";

import { useRef, useState } from "react";
import { projects, type Project } from "@/lib/projects";
import styles from "./ProjectsGallery.module.css";

const TONE_STYLE: Record<Project["tone"], { background: string; color: string; border?: string }> = {
  vino: { background: "#6d1f2c", color: "#f4efe6" },
  azul: { background: "#3c4a72", color: "#f4efe6" },
  crema: { background: "#fbf7f0", color: "#1a1a1a", border: "1px solid #b9ae9c" },
};

function ProjectCard({ project }: { project: Project }) {
  const tone = TONE_STYLE[project.tone];
  return (
    <article
      className={styles.card}
      style={{ background: tone.background, color: tone.color, border: tone.border }}
    >
      <div className={styles.cardTop}>
        <span>{project.index}</span>
        <span>{project.year}</span>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{project.category}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDescription}>{project.description}</p>
      </div>
    </article>
  );
}

export default function ProjectsGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScroll: 0, pointerId: -1 });

  function updateProgress() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max <= 0 ? 0 : (el.scrollLeft / max) * 100);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { startX: e.clientX, startScroll: el.scrollLeft, pointerId: e.pointerId };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (!el || !isDragging) return;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.startScroll - dx;
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  }

  return (
    <section id="obra" className={styles.section} aria-label="Proyectos">
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className={styles.eyebrow}>2021 — 2026</span>
            <h2 className="section-heading">Recorrido</h2>
          </div>
          <span className={styles.drag}>← arrastra →</span>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`${styles.track} ${isDragging ? styles.dragging : ""}`}
        onScroll={updateProgress}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="container">
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
