import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import Cake from "@/components/Cake";
import BirthdayMessage from "@/components/BirthdayMessage";
import GiftBox from "@/components/GiftBox";
import AmazingCards from "@/components/AmazingCards";
import Quiz from "@/components/Quiz";
import MemoryVideo from "@/components/MemoryVideo";
import OpenWhen from "@/components/OpenWhen";
import FinalSurprise from "@/components/FinalSurprise";
import PhotoWall from "@/components/PhotoWall";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import ShareButton from "@/components/ShareButton";

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown />
      {/* <Gallery /> */}
      {/* <Timeline /> */}
      <Cake />
      <BirthdayMessage />
      <GiftBox />
      <AmazingCards />
      {/* <Quiz /> */}
      {/* <MemoryVideo /> */}
      <OpenWhen />
      <FinalSurprise />
      <PhotoWall />
      <Footer />
      <MusicPlayer />
      <ShareButton />
    </>
  );
}
