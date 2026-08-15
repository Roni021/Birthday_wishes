# Happy Birthday, Roni ❤️ — Next.js Edition

A faithful Next.js (App Router) + TypeScript conversion of the original single-file HTML birthday
website. Same layout, same colors, same animations, same interactions — now as a proper,
componentized, type-safe React project.

## 1. Install

```bash
npm install
```

## 2. Run in development

```bash
npm run dev
```

Visit http://localhost:3000

## 3. Where to replace images

Put your real photos in `public/images/`, using these exact filenames (referenced from
`lib/birthdayData.ts`):

- `hero.jpg` — hero background
- `photo-1.jpg` … `photo-6.jpg` — gallery + photo wall
- `timeline-1.jpg` … `timeline-4.jpg` — timeline section
- `video-poster.jpg` — poster image shown before the memory video plays

The project currently ships with generated placeholder JPEGs labeled "Replace me" so you can see
the layout immediately — swap them out with your own photos (same filenames, any reasonable
resolution — the gallery uses each photo's natural aspect ratio for its masonry layout, so photos
don't need to be identically sized).

## 4. Where to replace the video

Put your video at:

```
public/videos/memories.mp4
```

## 5. Where to replace the music

Put your audio file at:

```
public/music/birthday.mp3
```

## 6. Where to edit website content

Everything editable — name, birthday date, message text, photo captions, timeline entries, quiz
questions, "Open When" letters, share text — lives in one place:

```
lib/birthdayData.ts
```

Edit that file and the whole site updates. No need to touch component code for content changes.

## 7. Build for production

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx       — root layout, SEO metadata, global providers
  page.tsx          — assembles all sections in order
  globals.css        — all original CSS, preserved as-is
components/          — one component per section/feature (Hero, Countdown, Gallery,
                        Lightbox, Timeline, Cake, BirthdayMessage, GiftBox, AmazingCards,
                        Quiz, MemoryVideo, OpenWhen, FinalSurprise, PhotoWall, MusicPlayer,
                        ShareButton, Footer, Confetti, ScrollProgress, SecretMessage,
                        KonamiListener, Reveal)
lib/
  birthdayData.ts    — all editable content, typed
  useReveal.ts        — scroll-reveal + reduced-motion hooks
  effectsBus.ts       — lightweight event bus for confetti/secret-message triggers
  MusicContext.tsx    — shared background-audio state (Hero's Start button + the music widget)
public/
  images/, videos/, music/, fonts/
```

## Preserved features

Every interaction from the original HTML site works the same way:

- Scroll-progress bar, scroll-reveal animations on every section
- Hero floating particles, pulsing Start button, 5-click title easter egg
- Live countdown to the birthday date (auto-switches to "Today is your day!")
- Masonry photo gallery with lightbox (keyboard arrows, swipe, double-tap heart burst)
- Alternating-side timeline
- Interactive candles (tap or blow into your mic) with wish-granted confetti
- Typewriter birthday message with expandable "Read More"
- Clickable gift box reveal
- Flip cards ("Why You're Amazing")
- 5-question quiz with scored result screen
- Custom video player with play overlay
- "Open When…" envelope letters modal
- Fireworks on the final surprise section (triggered on scroll into view)
- Rotated photo wall
- Floating music player (loop, play/pause) and share button (WhatsApp / copy link / native share)
- Footer text easter egg + Konami code easter egg
- `prefers-reduced-motion` respected throughout (particles/typewriter/confetti/fireworks disable
  themselves)

## Notes

- All browser-only APIs (`window`, `document`, `navigator`, `Audio`, `Canvas`,
  `IntersectionObserver`, `MediaDevices`, `navigator.share`) are confined to `"use client"`
  components and wrapped in `useEffect`, so there are no hydration or SSR errors.
- Fonts are loaded via the same Google Fonts URLs as the original site (an `@import` at the top of
  `globals.css`), so typography matches exactly.
- No Tailwind was introduced — the original hand-written CSS was preserved wholesale to guarantee
  a pixel-faithful result.
