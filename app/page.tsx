import type { Metadata } from "next";

import BrandMarquee from "@/components/Homepage/sections/BrandMarquee";
import CTA from "@/components/Homepage/sections/CTA";
import Expertises from "@/components/Homepage/sections/Expertises";
import Hero from "@/components/Homepage/sections/Hero";
import Statement from "@/components/Homepage/sections/Statement";
import Work from "@/components/Homepage/sections/Work";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  getHomepageJsonLdString,
  getHomepageMetadata,
} from "@/lib/seo/homepage-seo";

export const metadata: Metadata = getHomepageMetadata();

const homepageJsonLd = getHomepageJsonLdString();

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Next.js recommends inline sanitized JSON-LD for structured data.
        dangerouslySetInnerHTML={{ __html: homepageJsonLd }}
      />
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
