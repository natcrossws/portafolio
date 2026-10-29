"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorTrail.module.css";

type Point = { x: number; y: number; life: number };

const MAX_POINTS = 120;
const FADE_SPEED = 0.02;
const MIN_DIST_SQ = 2.25;
const STEP = 3;

function strokeSmoothPath(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  width: number,
  color: string,
) {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0]!.x, points[0]!.y);

  if (points.length === 2) {
    ctx.lineTo(points[1]!.x, points[1]!.y);
  } else {
    for (let i = 1; i < points.length - 1; i += 1) {
      const curr = points[i]!;
      const next = points[i + 1]!;
      const mx = (curr.x + next.x) / 2;
      const my = (curr.y + next.y) / 2;
      ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
    }
    const last = points[points.length - 1]!;
    ctx.lineTo(last.x, last.y);
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}

export default function CursorTrail() {
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 820px)");
    const sync = () =>
      setReduced(motion.matches || coarse.matches || narrow.matches);
    sync();
    motion.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;

    const glow = glowRef.current;
    const canvas = canvasRef.current;
    if (!glow || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let alive = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      glow.style.opacity = "1";

      const points = pointsRef.current.slice();
      const last = points.at(-1);

      if (!last) {
        pointsRef.current = [{ x, y, life: 1 }];
        return;
      }

      const dx = x - last.x;
      const dy = y - last.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < MIN_DIST_SQ) return;

      const dist = Math.sqrt(distSq);
      const steps = Math.max(1, Math.floor(dist / STEP));

      for (let i = 1; i <= steps; i += 1) {
        const t = i / steps;
        points.push({
          x: last.x + dx * t,
          y: last.y + dy * t,
          life: 1,
        });
      }

      while (points.length > MAX_POINTS) points.shift();
      pointsRef.current = points;
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
        const life =
          faded.reduce((sum, point) => sum + point.life, 0) / faded.length;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.miterLimit = 2;

        // Dual stroke: ink for light pages, white for colorful/dark areas
        strokeSmoothPath(ctx, faded, 16, `rgba(43, 39, 41, ${0.08 * life})`);
        strokeSmoothPath(ctx, faded, 10, `rgba(123, 92, 255, ${0.16 * life})`);
        strokeSmoothPath(ctx, faded, 5, `rgba(254, 80, 123, ${0.22 * life})`);
        strokeSmoothPath(ctx, faded, 2.2, `rgba(255, 255, 255, ${0.55 * life})`);
        strokeSmoothPath(ctx, faded, 1.4, `rgba(43, 39, 41, ${0.28 * life})`);
      }

      rafRef.current = window.requestAnimationFrame(paint);
    };

    rafRef.current = window.requestAnimationFrame(paint);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      alive = false;
      window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      pointsRef.current = [];
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.trail} />
      <div ref={glowRef} className={styles.glow} />
    </div>
  );
}
