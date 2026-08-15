"use client";

import { useRef, useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";

export default function MemoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  };

  return (
    <section id="video-section" className="section" style={{ background: "var(--midnight-deep)" }}>
      <div className="container center">
        <Reveal as="p" className="eyebrow">
          One To Remember
        </Reveal>
        <Reveal as="h2" className="section-title">
          A Few Moments We Never Want To Forget...
        </Reveal>
        <Reveal as="div" className="video-frame" threshold={0.15}>
          <video
            id="memory-video"
            ref={videoRef}
            playsInline
            poster={birthdayData.video.poster}
            onPause={() => setPlaying(false)}
          >
            <source src={birthdayData.video.src} type="video/mp4" />
          </video>
          <div className={`video-play${playing ? " hide" : ""}`} id="video-play" onClick={handlePlay}>
            <div className="play-circle">▶</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
