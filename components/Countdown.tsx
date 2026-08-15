"use client";

import { useEffect, useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(birthdayData.birthdayDate).getTime();
    const tick = () => setDiff(target - Date.now());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const arrived = diff !== null && diff <= 0;

  const days = diff !== null ? Math.floor(diff / 86400000) : 0;
  const hours = diff !== null ? Math.floor((diff % 86400000) / 3600000) : 0;
  const minutes = diff !== null ? Math.floor((diff % 3600000) / 60000) : 0;
  const seconds = diff !== null ? Math.floor((diff % 60000) / 1000) : 0;

  return (
    <section id="countdown" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Almost Time
        </Reveal>
        <Reveal as="h2" className="section-title">
          Counting Down To Your Special Moment
        </Reveal>
        {!arrived ? (
          <Reveal as="div" className="count-grid" id="countdown-grid" threshold={0.15}>
            <div className="count-box glass">
              <div className="count-num" id="cd-d">{pad(days)}</div>
              <div className="count-label">Days</div>
            </div>
            <div className="count-box glass">
              <div className="count-num" id="cd-h">{pad(hours)}</div>
              <div className="count-label">Hours</div>
            </div>
            <div className="count-box glass">
              <div className="count-num" id="cd-m">{pad(minutes)}</div>
              <div className="count-label">Minutes</div>
            </div>
            <div className="count-box glass">
              <div className="count-num" id="cd-s">{pad(seconds)}</div>
              <div className="count-label">Seconds</div>
            </div>
          </Reveal>
        ) : (
          <p className="today-msg" id="cd-today" style={{ display: "block" }}>
            Today is your day! 🎉❤️
          </p>
        )}
      </div>
    </section>
  );
}
