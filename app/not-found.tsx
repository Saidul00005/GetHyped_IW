"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { companyDisplayName } from "@/lib/data/site-data";
import { queueSectionScroll, scrollToSection } from "@/lib/scroll-to-section";

export default function NotFound() {
  const router = useRouter();

  const handleContactClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const didScroll = scrollToSection("contact", {
        offset: 12,
        duration: 1.05,
      });

      event.preventDefault();

      if (didScroll) return;

      queueSectionScroll("contact");
      router.push("/");
    },
    [router],
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gh-white text-gh-black">
        <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-400">
            <div className="rounded-[2rem] border border-black/10 bg-white px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.06)] sm:px-8 sm:py-12 md:px-10 md:py-14">
              <Badge className="rounded-full bg-gh-orange px-3 py-1 text-sm font-semibold text-white hover:bg-gh-orange">
                404
              </Badge>

              <div className="mt-6 max-w-4xl">
                <p className="text-sm font-semibold tracking-[0.24em] text-gh-muted uppercase">
                  Page not found
                </p>
                <h1 className="mt-4 text-balance text-[clamp(3.5rem,8vw,7rem)] leading-[0.88] font-extrabold tracking-tighter">
                  This page got lost,
                  <br />
                  not your momentum.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-[1.4] font-medium text-gh-gray md:text-2xl">
                  The page you requested does not exist or has moved. Head back
                  to the homepage and keep exploring what {companyDisplayName}{" "}
                  can do.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ActionLink
                  href="/"
                  label="Back to homepage"
                  variant="ghSolid"
                />
                <Link
                  href="/"
                  onClick={handleContactClick}
                  className="text-base font-semibold text-gh-black underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Contact the team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
