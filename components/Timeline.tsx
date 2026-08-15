"use client";

import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";

export default function Timeline() {
  return (
    <section id="timeline-section" className="section" style={{ background: "var(--midnight-deep)" }}>
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Our Memories
        </Reveal>
        <Reveal as="h2" className="section-title">
          A Little Look Back
        </Reveal>
        <div className="timeline">
          {birthdayData.timeline.map((item, i) => (
            <Reveal
              key={item.title}
              as="div"
              className={`tl-item ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}
            >
              <div className="tl-dot" />
              <div className="tl-card glass">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
                <div className="tl-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.photo} alt={item.alt} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
