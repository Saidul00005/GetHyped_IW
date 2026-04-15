"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Mail } from "lucide-react";
import { useRef } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import { ctaData } from "@/lib/data/homepage-data";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-line", {
        y: 70,
        opacity: 0,
        stagger: 0.08,
        duration: 0.85,
        ease: "power4.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="contact"
      ref={rootRef}
      className="px-6 pt-28 pb-14 text-center md:px-10 md:pt-36"
    >
      <div className="mx-auto max-w-400">
        <h2 className="text-cta leading-[0.9] font-extrabold tracking-tight text-gh-black">
          <span className="cta-line block">{ctaData.heading}</span>
        </h2>
        <div className="cta-actions mt-10 flex flex-wrap items-center justify-center gap-4">
          <ActionLink
            href={ctaData.primaryAction.href}
            label={ctaData.primaryAction.label}
            icon={<Mail className="h-3.5 w-3.5" aria-hidden="true" />}
          />
          <ActionLink
            href={ctaData.secondaryAction.href}
            label={ctaData.secondaryAction.label}
            variant="ghSolid"
            icon={<Flame className="h-3.5 w-3.5" aria-hidden="true" />}
          />
        </div>
      </div>
    </section>
  );
}
