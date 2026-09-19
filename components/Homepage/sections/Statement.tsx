"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import { Button } from "@/components/ui/button";
import { statementData } from "@/lib/data/homepage-data";
import { getPrefersReducedMotion, revealElements } from "@/lib/gsap/motion";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { scrollToSection } from "@/lib/scroll-to-section";

export default function Statement() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const handleScrollToExpertises = useCallback(() => {
    scrollToSection("expertises", {
      offset: 12,
      duration: 1.15,
    });
  }, []);

  useGSAP(
    () => {
      const title = titleRef.current;
      const rightColumn = rightColumnRef.current;
      const rightItems = rightColumn
        ? (Array.from(rightColumn.children) as HTMLElement[])
        : [];

      if (!title || !rightItems.length) return;

      if (getPrefersReducedMotion()) {
        revealElements([title, ...rightItems]);
        return;
      }

      gsap.from(title, {
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

      gsap.from(rightItems, {
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
        <h2
          ref={titleRef}
          className="max-w-312.5 text-[2.35rem] leading-[1.02] font-extrabold tracking-tight md:text-[3.6rem] xl:text-[4.3rem]"
        >
          {statementData.title}
        </h2>

        <div
          ref={rightColumnRef}
          className="mt-16 grid grid-cols-1 items-end gap-10 lg:grid-cols-[220px_minmax(0,1fr)_auto]"
        >
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
              aria-label="Go to the next section"
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
