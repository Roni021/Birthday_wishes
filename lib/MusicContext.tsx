"use client";

import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { birthdayData } from "@/lib/birthdayData";

interface MusicContextValue {
  audioRef: React.RefObject<HTMLAudioElement>;
  playing: boolean;
  play: () => void;
  toggle: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        /* autoplay may be blocked until user interacts — that's fine */
      });
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <MusicContext.Provider value={{ audioRef, playing, play, toggle }}>
      {children}
      <audio ref={audioRef} loop preload="none">
        <source src={birthdayData.music.src} type="audio/mpeg" />
      </audio>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within a MusicProvider");
  return ctx;
}
