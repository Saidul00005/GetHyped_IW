"use client";

import { useRef } from "react";

import StatCard from "@/components/Homepage/sections/shared/StatCard";
import { heroData } from "@/lib/data/homepage-data";
import {
  getPrefersReducedMotion,
  getRefElements,
  revealElements,
} from "@/lib/gsap/motion";
import { gsap, useGSAP } from "@/lib/gsap/register";

/** Single xl layout: light symmetric fan (no random skew — reads cleaner in a 4-col grid). */
const heroStatLayout = [
  { x: -6, y: 2, rotation: -3.5, scale: 1, z: 40 },
  { x: -2, y: 8, rotation: -1.5, scale: 1, z: 30 },
  { x: 2, y: 8, rotation: 1.5, scale: 0.99, z: 20 },
  { x: 6, y: 2, rotation: 3.5, scale: 0.98, z: 10 },
] as const;

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const statSlotRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const lines = getRefElements(lineRefs.current);
      const subheadline = subheadlineRef.current;
      const slots = getRefElements(statSlotRefs.current);

      if (getPrefersReducedMotion()) {
        revealElements([...lines, subheadline, ...slots]);
        return;
      }

      let cleanupHandlers: Array<() => void> = [];

      const getCardMotion = (index: number) => {
        const layout = heroStatLayout[index];
        const card = heroData.stats[index];
        const isCopyCard = Boolean(card.number);

        return {
          ...layout,
          rotation: isCopyCard
            ? Math.round(layout.rotation * 0.35)
            : layout.rotation,
          scale: isCopyCard ? 1 : layout.scale,
        };
      };

      if (window.innerWidth >= 1280 && slots.length === heroData.stats.length) {
        const preset = heroData.stats.map((_, index) => getCardMotion(index));

        slots.forEach((slot, idx) => {
          const layout = preset[idx];
          gsap.set(slot, {
            x: layout.x,
            y: layout.y,
            rotation: layout.rotation,
            scale: layout.scale,
            zIndex: layout.z,
            transformOrigin: "center bottom",
          });
        });

        cleanupHandlers = slots.map((slot, idx) => {
          const base = preset[idx];

          const onEnter = () => {
            gsap.to(slot, {
              y: base.y - 8,
              rotation: base.rotation * 0.7,
              scale: base.scale + 0.02,
              duration: 0.32,
              ease: "power2.out",
            });
          };

          const onLeave = () => {
            gsap.to(slot, {
              x: base.x,
              y: base.y,
              rotation: base.rotation,
              scale: base.scale,
              zIndex: base.z,
              duration: 0.38,
              ease: "power2.out",
            });
          };

          slot.addEventListener("mouseenter", onEnter);
          slot.addEventListener("mouseleave", onLeave);

          return () => {
            slot.removeEventListener("mouseenter", onEnter);
            slot.removeEventListener("mouseleave", onLeave);
          };
        });
      }

      const timeline = gsap.timeline({ delay: 0.15 });

      if (lines.length) {
        timeline.from(
          lines,
          {
            yPercent: 105,
            opacity: 0,
            stagger: 0.08,
            duration: 0.95,
            ease: "power4.out",
          },
          0,
        );
      }

      if (subheadline) {
        timeline.from(
          subheadline,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        );
      }

      if (slots.length) {
        timeline.from(
          slots,
          {
            y: 120,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.45",
        );
      }

      return () => {
        cleanupHandlers.forEach((dispose) => {
          dispose();
        });
      };
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden px-6 pt-36 pb-16 md:px-10 md:pt-44"
    >
      <div className="mx-auto max-w-400">
        <div className="leading-[0.92] font-extrabold tracking-tighter text-gh-black">
          {heroData.headlineLines.map((line, index) => (
            <span
              key={line}
              ref={(node) => {
                lineRefs.current[index] = node;
              }}
              className="hero-line block text-5xl md:text-7xl lg:text-9xl"
            >
              {line}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <p
            ref={subheadlineRef}
            className="hero-sub max-w-sm text-lg leading-[1.4] font-semibold tracking-tight text-gh-black md:max-w-md md:text-2xl lg:max-w-lg lg:text-4xl"
          >
            {heroData.subheadline}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {heroData.stats.map((card, index) => (
            <div
              key={card.id}
              ref={(node) => {
                statSlotRefs.current[index] = node;
              }}
              className="will-change-transform"
            >
              <StatCard
                number={card.number}
                label={card.label}
                sub={card.sub}
                videoSrc={card.videoSrc}
                videoLabel={card.videoLabel}
                className={card.color}
                copyClassName={card.number ? "transform-none" : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
