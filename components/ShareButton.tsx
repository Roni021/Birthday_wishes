"use client";

import { useEffect, useState } from "react";
import { birthdayData } from "@/lib/birthdayData";

export default function ShareButton() {
  const [open, setOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `${birthdayData.hashtagShareText} ${pageUrl}`
  )}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(pageUrl).catch(() => {});
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: document.title, text: birthdayData.hashtagShareText, url: pageUrl }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div id="share-fab" className={open ? "open" : ""}>
      <div className="share-options">
        <a
          className="share-opt glass"
          id="fab-whatsapp"
          title="Share on WhatsApp"
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          🟢
        </a>
        <a className="share-opt glass" id="fab-copy" title="Copy link" onClick={handleCopy} role="button" tabIndex={0}>
          🔗
        </a>
        <a className="share-opt glass" id="fab-native" title="Share" onClick={handleNativeShare} role="button" tabIndex={0}>
          📤
        </a>
      </div>
      <button className="share-main" id="share-toggle" onClick={() => setOpen((o) => !o)} aria-label="Share">
        🎁
      </button>
    </div>
  );
}
