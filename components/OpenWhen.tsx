"use client";

import { useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";

export default function OpenWhen() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = activeIndex !== null ? birthdayData.openWhen[activeIndex] : null;

  return (
    <section id="openwhen-section" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Little Letters
        </Reveal>
        <Reveal as="h2" className="section-title">
          Open When...
        </Reveal>
        <Reveal as="p" className="section-sub">
          A few notes for whenever you need them.
        </Reveal>
        <div className="envelopes-grid" id="envelopes-grid">
          {birthdayData.openWhen.map((o, i) => (
            <Reveal
              key={o.title}
              as="div"
              className="envelope-card glass"
              onClick={() => setActiveIndex(i)}
              role="button"
              tabIndex={0}
            >
              <div className="emoji">{o.emoji}</div>
              <h4>{o.title}</h4>
            </Reveal>
          ))}
        </div>
      </div>

      <div
        id="letter-modal"
        className={active ? "open" : ""}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveIndex(null);
        }}
      >
        <div className="letter-card">
          <button className="letter-close" id="letter-close" onClick={() => setActiveIndex(null)} aria-label="Close letter">
            &times;
          </button>
          <h4 id="letter-title">{active?.title}</h4>
          <p id="letter-body">{active?.body}</p>
        </div>
      </div>
    </section>
  );
}
