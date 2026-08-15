"use client";

import { birthdayData } from "@/lib/birthdayData";
import { showSecret } from "@/lib/effectsBus";

export default function Footer() {
  return (
    <footer>
      <span
        className="script"
        onClick={() => showSecret(birthdayData.secretMessages.footer)}
        role="button"
        tabIndex={0}
      >
        Made with love, just for you
      </span>
      Happy Birthday ❤️
    </footer>
  );
}
