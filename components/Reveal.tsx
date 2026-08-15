"use client";

import React from "react";
import { useReveal } from "@/lib/useReveal";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
  [key: string]: unknown;
}

/**
 * Generic scroll-reveal wrapper. Pass the original class combo (e.g.
 * "eyebrow reveal" or "section-title reveal-scale") via `className`;
 * this component adds the trailing `in` class once the element scrolls
 * into view, exactly like the original `revealObserver` in the HTML site.
 * Any extra props (id, onClick, style, ...) are passed through to the
 * rendered element.
 */
export default function Reveal({ children, className = "", as = "div", threshold = 0.15, ...rest }: RevealProps) {
  const { ref, inView } = useReveal<HTMLElement>(threshold);

  return React.createElement(
    as,
    { ref, className: `${className} ${inView ? "in" : ""}`.trim(), ...rest },
    children
  );
}
