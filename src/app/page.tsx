import Buffet from "@/components/Buffet";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Location from "@/components/Location";
import Opening from "@/components/Opening";
import Reservation from "@/components/Reservation";
import SpaceSection from "@/components/SpaceSection";
import { spaces } from "@/content/site";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Opening />
        {spaces.map((space) => (
          <SpaceSection key={space.id} space={space} />
        ))}
        <Buffet />
        <Location />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
