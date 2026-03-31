import { NavBar } from "./components/NavBar";
import { MusicPlayer } from "./components/MusicPlayer";
import { HeroSection } from "./sections/HeroSection";
import { TogetherPhoto } from "./sections/TogetherPhoto";
import { StoryTimeline } from "./sections/StoryTimeline";
import { WhyILoveYou } from "./sections/WhyILoveYou";
import { SecretLetters } from "./sections/SecretLetters";
import { FinalSurprise } from "./sections/FinalSurprise";
import { Footer } from "./sections/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <NavBar />
      <HeroSection />
      <TogetherPhoto />
      <StoryTimeline />
      <WhyILoveYou />
      <SecretLetters />
      <FinalSurprise />
      <Footer />
      <MusicPlayer />
    </main>
  );
}

