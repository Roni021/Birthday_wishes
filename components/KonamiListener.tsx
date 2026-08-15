"use client";

import { useEffect, useRef } from "react";
import { launchConfetti, showSecret } from "@/lib/effectsBus";
import { birthdayData } from "@/lib/birthdayData";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiListener() {
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      bufferRef.current = [...bufferRef.current, e.key].slice(-10);
      if (bufferRef.current.join(",") === KONAMI_SEQUENCE.join(",")) {
        launchConfetti(200);
        showSecret(birthdayData.secretMessages.konami);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return null;
}
