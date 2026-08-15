"use client";

import { useEffect, useRef } from "react";
import { CONFETTI_EVENT } from "@/lib/effectsBus";
import { useReducedMotion } from "@/lib/useReveal";

interface Piece {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vy: number;
  vx: number;
  rot: number;
  vr: number;
  life: number;
}

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<Piece[]>([]);
  const runningRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      piecesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      piecesRef.current = piecesRef.current.filter((p) => p.y < canvas.height + 40 && p.life < 500);
      if (piecesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(run);
      } else {
        runningRef.current = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const launch = (e: Event) => {
      if (reducedMotion) return;
      const count = (e as CustomEvent<number>).detail ?? 140;
      const colors = ["#FF6FA8", "#F0C674", "#8E5CC7", "#E94E90", "#FFC1DA"];
      for (let i = 0; i < count; i++) {
        piecesRef.current.push({
          x: Math.random() * canvas.width,
          y: -20 - Math.random() * 200,
          w: 6 + Math.random() * 6,
          h: 10 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          vy: 2 + Math.random() * 3,
          vx: -2 + Math.random() * 4,
          rot: Math.random() * 360,
          vr: -6 + Math.random() * 12,
          life: 0,
        });
      }
      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(run);
      }
    };

    window.addEventListener(CONFETTI_EVENT, launch);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener(CONFETTI_EVENT, launch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return <canvas id="confetti-canvas" ref={canvasRef} />;
}
