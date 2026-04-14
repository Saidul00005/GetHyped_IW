"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  "Tho",
  "De Talententuin",
  "Zwarte Cross",
  "Bullit",
  "Morssinkhof",
  "KNLTB",
  "SRHK",
] as const;

export default function BrandMarquee() {
  const rootRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useGSAP(
    () => {
      gsap.from(".brand-title", {
        y: 35,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 76%",
          once: true,
        },
      });

      gsap.from(".brand-row", {
        opacity: 0,
        y: 25,
        duration: 0.8,
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
    <section ref={rootRef} className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-400">
        <h2 className="brand-title max-w-150 text-display leading-[0.9] font-extrabold tracking-tighter text-gh-black">
          These brands got hyped.
        </h2>
      </div>

      <div className="brand-row relative right-1/2 left-1/2 -mx-[50vw] mt-10 w-screen overflow-hidden py-7">
        <Marquee
          autoFill
          speed={34}
          gradient={false}
          pauseOnHover
          play={!prefersReducedMotion}
        >
          {brands.map((name) => (
            <Card
              key={name}
              className="mr-4 h-70 w-[320px] rounded-2xl border-0 bg-white py-0 shadow-none ring-0"
            >
              <CardContent className="flex h-full items-center justify-center px-6">
                <span className="text-center text-5xl font-extrabold tracking-tight text-gh-black">
                  {name}
                </span>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
