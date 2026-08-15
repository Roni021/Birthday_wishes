import { birthdayData } from "@/lib/birthdayData";
import Reveal from "@/components/Reveal";

export default function PhotoWall() {
  return (
    <section id="wall-section" className="section" style={{ background: "var(--midnight-deep)" }}>
      <div className="container center">
        <Reveal as="p" className="eyebrow">
          One Last Look
        </Reveal>
        <Reveal as="h2" className="section-title">
          <span id="wall-name">{birthdayData.name}</span>&apos;s Beautiful Moments ❤️
        </Reveal>
        <div className="wall" id="photo-wall">
          {birthdayData.photos.map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p.src} src={p.src} alt={p.cap} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
