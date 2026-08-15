"use client";

import { birthdayData } from "@/lib/birthdayData";
import { useMusic } from "@/lib/MusicContext";

export default function MusicPlayer() {
  const { playing, toggle } = useMusic();

  return (
    <div id="music-player" className={`glass${playing ? " playing" : ""}`}>
      <button className="music-toggle" id="music-toggle" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
        {playing ? "❚❚" : "♫"}
      </button>
      <div className="music-bars">
        <span />
        <span />
        <span />
      </div>
      <span className="music-info" id="music-info">
        {birthdayData.music.label}
      </span>
    </div>
  );
}
