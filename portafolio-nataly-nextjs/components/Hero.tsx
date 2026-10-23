"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type Point = { x: number; y: number; life: number };

const MAX_POINTS = 80;
const FADE_SPEED = 0.018;
const MIN_DIST_SQ = 9;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const hero = heroRef.current;
    const glow = glowRef.current;
    const canvas = canvasRef.current;
    if (!hero || !glow || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let alive = true;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      glow.style.opacity = "1";

      const points = pointsRef.current;
      const last = points.at(-1);

      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (dx * dx + dy * dy < MIN_DIST_SQ) return;
      }

      const next = points.length >= MAX_POINTS ? points.slice(1) : points.slice();
      next.push({ x, y, life: 1 });
      pointsRef.current = next;
    };

    const onLeave = () => {
      glow.style.opacity = "0";
      pointsRef.current = [];
    };

    const paint = () => {
      if (!alive) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const faded: Point[] = [];
      for (const point of pointsRef.current) {
        const life = point.life - FADE_SPEED;
        if (life > 0) faded.push({ x: point.x, y: point.y, life });
      }
      pointsRef.current = faded;

      if (faded.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < faded.length; i += 1) {
          const prev = faded[i - 1]!;
          const curr = faded[i]!;
          const life = (prev.life + curr.life) / 2;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.22 * life})`;
          ctx.lineWidth = 2.5 + 10 * life;
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * life})`;
          ctx.lineWidth = 1 + 3 * life;
          ctx.stroke();
        }
      }

      rafRef.current = window.requestAnimationFrame(paint);
    };

    rafRef.current = window.requestAnimationFrame(paint);
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      alive = false;
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      pointsRef.current = [];
    };
  }, [reduced]);

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Portada">
      <div className={styles.mesh} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobA}`} />
        <span className={`${styles.blob} ${styles.blobB}`} />
        <span className={`${styles.blob} ${styles.blobC}`} />
        <span className={`${styles.blob} ${styles.blobD}`} />
        <span className={`${styles.blob} ${styles.blobE}`} />
      </div>

      {!reduced && (
        <>
          <canvas ref={canvasRef} className={styles.trail} aria-hidden="true" />
          <div ref={glowRef} className={styles.glow} aria-hidden="true" />
        </>
      )}

      <div className={styles.copy}>
        <h1 className={styles.name}>Nataly Melo</h1>
        <p className={styles.roles}>
          Creative Technologist
          <br />
          Software Development Lead
          <br />
          FrontEnd{" "}
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>{" "}
          UX/UI
        </p>
      </div>
    </section>
  );
}
