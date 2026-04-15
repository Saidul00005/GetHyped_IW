import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BrandMarquee from "@/components/sections/BrandMarquee";
import CTA from "@/components/sections/CTA";
import Expertises from "@/components/sections/Expertises";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Statement />
      <Expertises />
      <Work />
      <BrandMarquee />
      <CTA />
      <Footer />
    </main>
  );
}
