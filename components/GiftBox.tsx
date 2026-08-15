"use client";

import { useState } from "react";
import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";
import { launchConfetti } from "@/lib/effectsBus";

export default function GiftBox() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    launchConfetti(150);
  };

  return (
    <section id="gift-section" className={`section${opened ? " opened" : ""}`}>
      <div className="container center">
        <Reveal as="p" className="eyebrow">
          One More Thing
        </Reveal>
        <Reveal as="h2" className="section-title">
          There&apos;s Still One More Surprise...
        </Reveal>
        <Reveal
          as="div"
          className="gift-wrap"
          threshold={0.15}
          id="gift-box"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
        >
          <div className="gift-glow" />
          <div className="gift-base">
            <div className="gift-ribbon-v" />
          </div>
          <div className="gift-lid">
            <div className="gift-ribbon-h" />
            <span className="gift-bow">🎀</span>
          </div>
        </Reveal>
        <p className="gift-hint">Tap the box to open it</p>
        <div className={`gift-reveal glass${opened ? " show" : ""}`} id="gift-reveal">
          <p>{birthdayData.giftMessage}</p>
        </div>
      </div>
    </section>
  );
}
