"use client";

export const CONFETTI_EVENT = "birthday:launch-confetti";
export const FIREWORKS_EVENT = "birthday:launch-fireworks";
export const SECRET_EVENT = "birthday:show-secret";

export function launchConfetti(count = 140) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<number>(CONFETTI_EVENT, { detail: count }));
}

export function launchFireworks() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FIREWORKS_EVENT));
}

export function showSecret(text: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(SECRET_EVENT, { detail: text }));
}
