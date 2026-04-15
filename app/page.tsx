import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BrandMarquee from "@/components/Homepage/sections/BrandMarquee";
import CTA from "@/components/Homepage/sections/CTA";
import Expertises from "@/components/Homepage/sections/Expertises";
import Hero from "@/components/Homepage/sections/Hero";
import Statement from "@/components/Homepage/sections/Statement";
import Work from "@/components/Homepage/sections/Work";

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
