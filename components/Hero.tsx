"use client";

import { useEffect, useRef, useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import { launchConfetti, showSecret } from "@/lib/effectsBus";
import { useMusic } from "@/lib/MusicContext";
import { useReducedMotion } from "@/lib/useReveal";

const SYMBOLS = ["❤️", "✨", "🎈", "⭐"];

interface Particle {
  left: string;
  fontSize: string;
  dx: string;
  duration: string;
  delay: string;
  symbol: string;
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const { play } = useMusic();
  const clicksRef = useRef(0);

  // Start with an empty array so server-rendered HTML and the first client
  // render match exactly. Random particles are generated only after mount,
  // on the client, avoiding a hydration mismatch from Math.random().
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (reducedMotion) {
      setParticles([]);
      return;
    }
    setParticles(
      Array.from({ length: 18 }, () => ({
        left: `${Math.random() * 100}%`,
        fontSize: `${14 + Math.random() * 18}px`,
        dx: `${Math.random() * 100 - 50}px`,
        duration: `${9 + Math.random() * 8}s`,
        delay: `${Math.random() * 8}s`,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      }))
    );
  }, [reducedMotion]);

  const handleStart = () => {
    launchConfetti(160);
    play();
    document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTitleClick = () => {
    clicksRef.current += 1;
    if (clicksRef.current === 5) {
      showSecret(birthdayData.secretMessages.title);
      clicksRef.current = 0;
    }
  };

  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="hero-particles" id="hero-particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="floaty"
            style={
              {
                left: p.left,
                bottom: "-40px",
                fontSize: p.fontSize,
                "--dx": p.dx,
                animationDuration: p.duration,
                animationDelay: p.delay,
              } as React.CSSProperties
            }
          >
            {p.symbol}
          </div>
        ))}
      </div>
      <div className="hero-content">
        <p className="eyebrow" style={{ color: "var(--gold)" }}>
          A Little Surprise For You
        </p>
        <h1 className="hero-title" onClick={handleTitleClick}>
          Happy Birthday,
          <br />
          <span id="bday-name">{birthdayData.name}</span> ❤️
        </h1>
        <p className="hero-sub">Today is all about you...</p>
        <button className="btn pulse-btn" id="start-btn" onClick={handleStart}>
          Start the Surprise 🎁
        </button>
        <p className="hero-hint">🎵 Turn up the volume</p>
      </div>
    </section>
  );
}
