import Buffet from "@/components/Buffet";
import Day from "@/components/Day";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Location from "@/components/Location";
import Reservation from "@/components/Reservation";
import Spaces from "@/components/Spaces";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Spaces />
        <Day />
        <Buffet />
        <Location />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
