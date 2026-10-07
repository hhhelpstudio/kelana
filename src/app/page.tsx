import { StampDefs } from "@/components/Stamp";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Ladder } from "@/components/sections/Ladder";
import { Nav } from "@/components/sections/Nav";
import { PassportSection } from "@/components/sections/PassportSection";
import { Stays } from "@/components/sections/Stays";

export default function Home() {
  return (
    <>
      <StampDefs />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Ladder />
        <Stays />
        <PassportSection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
