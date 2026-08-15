"use client";

import { useEffect, useRef, useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";
import Lightbox from "@/components/Lightbox";

interface FloatingHeart {
  id: number;
  left: number;
  top: number;
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastTapRef = useRef<Record<number, number>>({});
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const heartId = useRef(0);

  const handleItemClick = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    const last = lastTapRef.current[idx] || 0;
    if (now - last < 350) {
      const rect = e.currentTarget.getBoundingClientRect();
      burstHearts(rect);
    } else {
      setLightboxIndex(idx);
    }
    lastTapRef.current[idx] = now;
  };

  const burstHearts = (rect: DOMRect) => {
    const newHearts: FloatingHeart[] = Array.from({ length: 8 }, () => ({
      id: heartId.current++,
      left: rect.left + rect.width / 2 + (Math.random() * 120 - 60),
      top: rect.top + rect.height / 2 - 80 - Math.random() * 60,
    }));
    setHearts((h) => [...h, ...newHearts]);
    setTimeout(() => {
      setHearts((h) => h.filter((heart) => !newHearts.some((nh) => nh.id === heart.id)));
    }, 1000);
  };

  return (
    <section id="gallery" className="section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Frame By Frame
        </Reveal>
        <Reveal as="h2" className="section-title">
          Beautiful Memories 📸
        </Reveal>
        <Reveal as="p" className="section-sub">
          Click a photo — double-tap for a little extra love.
        </Reveal>
        <div className="masonry" id="masonry">
          {birthdayData.photos.map((p, idx) => (
            <div className="g-item" key={p.src} onClick={(e) => handleItemClick(idx, e)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.cap} loading="lazy" />
              <div className="g-cap">{p.cap}</div>
            </div>
          ))}
        </div>
      </div>

      {hearts.map((h) => (
        <FloatingHeart key={h.id} left={h.left} top={h.top} />
      ))}

      {lightboxIndex !== null && (
        <Lightbox startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </section>
  );
}

function FloatingHeart({ left, top }: { left: number; top: number }) {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: "fixed",
    left,
    top,
    fontSize: "1.2rem",
    zIndex: 6000,
    pointerEvents: "none",
    transition: "transform 1s ease-out, opacity 1s ease-out",
    transform: "translate(0,0)",
    opacity: 1,
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setStyle((s) => ({
        ...s,
        transform: `translate(${Math.random() * 120 - 60}px, ${-80 - Math.random() * 60}px)`,
        opacity: 0,
      }));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return <div style={style}>❤️</div>;
}
