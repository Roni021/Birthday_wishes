"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { launchConfetti } from "@/lib/effectsBus";

const CANDLE_COUNT = 3;

export default function Cake() {
  const [blown, setBlown] = useState<boolean[]>(Array(CANDLE_COUNT).fill(false));
  const [message, setMessage] = useState("Make a Wish...");
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkAllBlown = (next: boolean[]) => {
    if (next.every(Boolean)) {
      setMessage("Wish Granted! ✨");
      launchConfetti(120);
    }
  };

  const blowCandle = (i: number) => {
    setBlown((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      checkAllBlown(next);
      return next;
    });
  };

  const stopMic = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const tryMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      let blownCount = 0;

      intervalRef.current = setInterval(() => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > 45 && blownCount < CANDLE_COUNT) {
          blowCandle(blownCount);
          blownCount++;
        }
        if (blownCount >= CANDLE_COUNT) {
          stopMic();
        }
      }, 200);

      setTimeout(stopMic, 8000);
    } catch {
      setMessage("Mic unavailable — tap the candles instead!");
    }
  };

  return (
    <section id="cake-section" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Make A Wish
        </Reveal>
        <Reveal as="h2" className="section-title">
          Blow Out The Candles
        </Reveal>
        <Reveal as="div" className="cake-wrap" threshold={0.15}>
          <div className="candles" id="candles">
            {blown.map((isBlown, i) => (
              <div
                key={i}
                className={`candle${isBlown ? " blown" : ""}`}
                data-i={i}
                onClick={() => blowCandle(i)}
                role="button"
                tabIndex={0}
                aria-label={`Blow out candle ${i + 1}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") blowCandle(i);
                }}
              >
                <div className="flame" />
              </div>
            ))}
          </div>
          <div className="cake-tier tier-top">
            <div className="frosting" />
          </div>
          <div className="cake-tier tier-bottom">
            <div className="frosting" />
          </div>
          <div className="cake-plate" />
        </Reveal>
        <p className="cake-msg" id="cake-msg">
          {message}
        </p>
        <p className="mic-hint">💨 Tip: tap each candle to blow it out — or try blowing into your mic</p>
        <div className="center" style={{ marginTop: 14 }}>
          <button className="btn btn-outline" id="mic-btn" onClick={tryMic}>
            🎤 Try Blowing (Mic)
          </button>
        </div>
      </div>
    </section>
  );
}
