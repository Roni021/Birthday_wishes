"use client";

import { useEffect, useRef, useState } from "react";
import { SECRET_EVENT } from "@/lib/effectsBus";

export default function SecretMessage() {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setText(detail);
      setShow(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShow(false), 3500);
    };
    window.addEventListener(SECRET_EVENT, handler);
    return () => {
      window.removeEventListener(SECRET_EVENT, handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div id="secret-msg" className={show ? "show" : ""}>
      {text}
    </div>
  );
}
