"use client";

import { useEffect, useRef } from "react";
import { birthdayData } from "@/lib/birthdayData";
import { useReducedMotion } from "@/lib/useReveal";
import Reveal from "@/components/Reveal";

interface FwParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

export default function FinalSurprise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FwParticle[]>([]);
  const runningRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const run = () => {
      ctx.fillStyle = "rgba(16,8,25,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life++;
        ctx.globalAlpha = Math.max(0, 1 - p.life / 70);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      particlesRef.current = particlesRef.current.filter((p) => p.life < 70);
      if (particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(run);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        runningRef.current = false;
      }
    };

    const launchFireworks = () => {
      if (reducedMotion) return;
      resize();
      const colors = ["#FF6FA8", "#F0C674", "#8E5CC7", "#E94E90", "#FFC1DA", "#78DC96"];
      for (let burst = 0; burst < 4; burst++) {
        setTimeout(() => {
          const cx = canvas.width * (0.2 + Math.random() * 0.6);
          const cy = canvas.height * (0.2 + Math.random() * 0.4);
          for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 * i) / 50;
            const speed = 2 + Math.random() * 3;
            particlesRef.current.push({
              x: cx,
              y: cy,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: colors[Math.floor(Math.random() * colors.length)],
              life: 0,
            });
          }
          if (!runningRef.current) {
            runningRef.current = true;
            rafRef.current = requestAnimationFrame(run);
          }
        }, burst * 450);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            launchFireworks();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(section);

    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <section id="final" ref={sectionRef}>
      <canvas id="fireworks-canvas" ref={canvasRef} />
      <div className="final-content">
        <Reveal as="h4">And Finally...</Reveal>
        <Reveal as="h2">
          Happy Birthday, <span id="final-name">{birthdayData.name}</span> ❤️
        </Reveal>
        <Reveal as="p">{birthdayData.finalMessage}</Reveal>
        <Reveal as="p" className="final-toast">
          {birthdayData.finalToast}
        </Reveal>
      </div>
    </section>
  );
}
