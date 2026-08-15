"use client";

import { useEffect, useRef, useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";
import { useReducedMotion } from "@/lib/useReveal";

export default function BirthdayMessage() {
  const [typed, setTyped] = useState("");
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (reducedMotion) {
      setTyped(birthdayData.message);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            let i = 0;
            const interval = setInterval(() => {
              i++;
              setTyped(birthdayData.message.slice(0, i));
              if (i >= birthdayData.message.length) clearInterval(interval);
            }, 28);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section id="message-section" className="section" ref={sectionRef}>
      <div className="container">
        <Reveal as="p" className="eyebrow">
          From The Heart
        </Reveal>
        <Reveal as="h2" className="section-title">
          A Little Message For You 💌
        </Reveal>
        <Reveal as="div" className="message-box glass" threshold={0.15}>
          <p className="message-text" id="typewriter">
            {typed}
          </p>
          <div className={`message-more${open ? " open" : ""}`} id="message-more">
            <p>{birthdayData.messageMore}</p>
          </div>
          <button className="btn btn-outline read-more-btn" id="read-more-btn" onClick={() => setOpen((o) => !o)}>
            {open ? "Show Less" : "Read More ❤️"}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
