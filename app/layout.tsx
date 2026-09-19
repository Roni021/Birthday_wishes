import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MusicProvider } from "@/lib/MusicContext";
import ScrollProgress from "@/components/ScrollProgress";
import Confetti from "@/components/Confetti";
import SecretMessage from "@/components/SecretMessage";
import KonamiListener from "@/components/KonamiListener";

export const metadata: Metadata = {
  // Update this to your real production URL once deployed (used to resolve OG/Twitter image URLs).
  metadataBase: new URL("http://localhost:3000"),
  title: "Happy Birthday, Saumya ❤️",
  description: "A little birthday surprise, made just for you.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Happy Birthday, Roni ❤️",
    description: "A little birthday surprise, made just for you.",
    images: ["/images/hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MusicProvider>
          <ScrollProgress />
          <Confetti />
          <SecretMessage />
          <KonamiListener />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
