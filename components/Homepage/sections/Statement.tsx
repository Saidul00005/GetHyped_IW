"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import { Button } from "@/components/ui/button";
import { statementData } from "@/lib/data/homepage-data";
import { scrollToSection } from "@/lib/scroll-to-section";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const rootRef = useRef<HTMLElement>(null);

  const handleScrollToExpertises = useCallback(() => {
    scrollToSection("expertises", {
      offset: 12,
      duration: 1.15,
    });
  }, []);

  useGSAP(
    () => {
      gsap.from(".statement-left", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".statement-right > *", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="about" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-400">
        <h2 className="statement-left max-w-312.5 text-[2.35rem] leading-[1.02] font-extrabold tracking-tight md:text-[3.6rem] xl:text-[4.3rem]">
          {statementData.title}
        </h2>

        <div className="statement-right mt-16 grid grid-cols-1 items-end gap-10 lg:grid-cols-[220px_minmax(0,1fr)_auto]">
          <div className="relative h-90 w-60 overflow-hidden rounded-2xl">
            <Image
              src={statementData.image.src}
              alt={statementData.image.alt}
              fill
              className="object-cover"
              sizes={statementData.image.sizes}
            />
          </div>

          <div className="max-w-175">
            <p className="text-xl leading-[1.2] font-bold tracking-tight md:text-3xl">
              {statementData.body}
            </p>
            <ActionLink
              href={statementData.cta.href}
              label={statementData.cta.label}
              className="mt-6"
            />
          </div>

          <div className="justify-self-start lg:justify-self-end">
            <Button
              variant="ghOutline"
              size="icon-lg"
              className="h-12 w-12 rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
              aria-label="Ga naar de volgende sectie"
              onClick={handleScrollToExpertises}
            >
              <ArrowDown className="h-4.5 w-4.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
