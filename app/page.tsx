import Navbar from "@/components/layout/Navbar";
import Expertises from "@/components/sections/Expertises";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Statement />
      <Expertises />
    </main>
  );
}
