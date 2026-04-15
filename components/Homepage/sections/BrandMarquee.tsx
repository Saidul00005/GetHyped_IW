"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger, Draggable);

const brands = [
  "Tho",
  "De Talententuin",
  "Zwarte Cross",
  "Bullit",
  "Morssinkhof",
  "KNLTB",
  "SRHK",
] as const;

const marqueeBrands = [
  ...brands.map((name) => ({ id: `${name}-set-1`, name })),
  ...brands.map((name) => ({ id: `${name}-set-2`, name })),
];
const MARQUEE_SPEED = 84;

export default function BrandMarquee() {
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
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

      const track = trackRef.current;
      const viewport = viewportRef.current;

      if (!track || !viewport) return;

      let currentX = 0;
      let setWidth = 0;
      let isDragging = false;

      const measure = () => {
        const items = Array.from(track.children) as HTMLElement[];
        if (!items.length) return;

        setWidth = items
          .slice(0, brands.length)
          .reduce((total, item) => total + item.offsetWidth, 0);

        if (!setWidth) return;

        currentX = gsap.utils.wrap(-setWidth, 0, currentX);
        gsap.set(track, { x: currentX });
      };

      const setWrappedX = (value: number) => {
        if (!setWidth) return;

        currentX = gsap.utils.wrap(-setWidth, 0, value);
        gsap.set(track, { x: currentX });
      };

      const tick = () => {
        if (prefersReducedMotion || isDragging || !setWidth) return;

        const deltaSeconds = gsap.ticker.deltaRatio(60) / 60;
        setWrappedX(currentX - MARQUEE_SPEED * deltaSeconds);
      };

      measure();
      window.addEventListener("resize", measure);
      gsap.ticker.add(tick);

      const [draggable] = Draggable.create(track, {
        type: "x",
        trigger: viewport,
        inertia: false,
        allowContextMenu: true,
        cursor: "grab",
        activeCursor: "grabbing",
        onPressInit() {
          isDragging = true;
          gsap.killTweensOf(track);
          this.update();
        },
        onDrag() {
          setWrappedX(this.x);
          this.x = currentX;
        },
        onRelease() {
          setWrappedX(this.x);
          this.x = currentX;
          isDragging = false;
        },
      });

      return () => {
        draggable.kill();
        gsap.ticker.remove(tick);
        window.removeEventListener("resize", measure);
      };
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section ref={rootRef} className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-400">
        <h2 className="brand-title max-w-150 text-display leading-[0.9] font-extrabold tracking-tighter text-gh-black">
          These brands got hyped.
        </h2>
      </div>

      <div className="brand-row relative right-1/2 left-1/2 -mx-[50vw] mt-10 w-screen overflow-hidden py-7">
        <div
          ref={viewportRef}
          className="cursor-grab overflow-hidden active:cursor-grabbing"
        >
          <div ref={trackRef} className="flex w-max touch-pan-y select-none">
            {marqueeBrands.map((brand) => (
              <Card
                key={brand.id}
                className="mr-4 h-70 w-[320px] shrink-0 rounded-2xl border-0 bg-white py-0 shadow-none ring-0"
              >
                <CardContent className="flex h-full items-center justify-center px-6">
                  <span className="text-center text-5xl font-extrabold tracking-tight text-gh-black">
                    {brand.name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
