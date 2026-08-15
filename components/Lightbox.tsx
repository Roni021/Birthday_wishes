"use client";

import { useEffect, useRef, useState } from "react";
import { birthdayData } from "@/lib/birthdayData";

interface LightboxProps {
  startIndex: number;
  onClose: () => void;
}

export default function Lightbox({ startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef(0);
  const photos = birthdayData.photos;

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].screenX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
  };

  const photo = photos[index];

  return (
    <div
      id="lightbox"
      className="open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="lb-close" id="lb-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <button className="lb-prev" id="lb-prev" onClick={prev} aria-label="Previous photo">
        &#8249;
      </button>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="lb-img" src={photo.src} alt={photo.cap} />
        <p className="lb-cap" id="lb-cap">
          {photo.cap}
        </p>
      </div>
      <button className="lb-next" id="lb-next" onClick={next} aria-label="Next photo">
        &#8250;
      </button>
    </div>
  );
}
