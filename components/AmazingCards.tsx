"use client";

import { useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";

export default function AmazingCards() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggle = (i: number) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  return (
    <section id="amazing-section" className="section" style={{ background: "var(--midnight-deep)" }}>
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Just A Few Reasons
        </Reveal>
        <Reveal as="h2" className="section-title">
          Why You&apos;re Amazing
        </Reveal>
        <Reveal as="p" className="section-sub">
          Tap a card to flip it.
        </Reveal>
        <div className="amazing-grid" id="amazing-grid">
          {birthdayData.amazing.map((a, i) => (
            <Reveal
              key={a.title}
              as="div"
              className={`flip-card${flipped[i] ? " flipped" : ""}`}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
            >
              <div className="flip-inner">
                <div className="flip-front glass">
                  <div className="emoji">{a.emoji}</div>
                  <h4>{a.title}</h4>
                </div>
                <div className="flip-back">
                  <p>{a.back}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
