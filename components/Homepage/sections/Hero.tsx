"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

import StatCard from "@/components/Homepage/sections/shared/StatCard";

type HeroStatCard = {
  id: string;
  number?: string;
  label?: string;
  sub?: string;
  videoSrc?: string;
  videoLabel?: string;
  color: string;
};

const statCards: HeroStatCard[] = [
  {
    id: "views",
    number: "10M+",
    label: "Organische views",
    sub: "Groei door slimme content",
    color: "bg-gh-blue",
  },
  {
    id: "brands-video",
    videoSrc: "/videos/Homepage/Hero/video1.mp4",
    videoLabel: "Autoplay brand showcase video",
    color: "bg-gh-orange text-white",
  },
  {
    id: "campaigns",
    number: "60+",
    label: "Campagnes per maand",
    sub: "Altijd live. Altijd doorpakken.",
    color: "bg-gh-green",
  },
  {
    id: "creative-video",
    videoSrc: "/videos/Homepage/Hero/video2.mp4",
    videoLabel: "Autoplay creative energy video",
    color: "bg-[#1f2937] text-white",
  },
];

const layoutPresets = [
  [
    { x: 16, y: 4, rotation: -5, scale: 1, z: 40 },
    { x: 30, y: 10, rotation: -7, scale: 1, z: 30 },
    { x: 44, y: 16, rotation: -9, scale: 0.99, z: 20 },
    { x: 58, y: 22, rotation: -11, scale: 0.98, z: 10 },
  ],
  [
    { x: -16, y: 4, rotation: 5, scale: 1, z: 40 },
    { x: -30, y: 10, rotation: 7, scale: 1, z: 30 },
    { x: -44, y: 16, rotation: 9, scale: 0.99, z: 20 },
    { x: -58, y: 22, rotation: 11, scale: 0.98, z: 10 },
  ],
  [
    { x: -8, y: -14, rotation: 0, scale: 1, z: 40 },
    { x: -2, y: 8, rotation: 0, scale: 1, z: 30 },
    { x: 4, y: -10, rotation: 0, scale: 1, z: 20 },
    { x: 10, y: 10, rotation: 0, scale: 1, z: 10 },
  ],
  [
    { x: -10, y: 12, rotation: 0, scale: 1, z: 40 },
    { x: -4, y: -10, rotation: 0, scale: 1, z: 30 },
    { x: 2, y: 10, rotation: 0, scale: 1, z: 20 },
    { x: 8, y: -12, rotation: 0, scale: 1, z: 10 },
  ],
] as const;

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const slots = gsap.utils.toArray<HTMLElement>(".stat-slot");
      let cleanupHandlers: Array<() => void> = [];

      if (window.innerWidth >= 1280 && slots.length === statCards.length) {
        const preset =
          layoutPresets[Math.floor(Math.random() * layoutPresets.length)];

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

      timeline
        .from(
          ".hero-line",
          {
            yPercent: 105,
            opacity: 0,
            stagger: 0.08,
            duration: 0.95,
            ease: "power4.out",
          },
          0,
        )
        .from(
          ".hero-sub",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45",
        )
        .from(
          ".hero-card",
          {
            y: 120,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.45",
        );

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
          <span className="hero-line block text-5xl md:text-7xl lg:text-9xl">
            Get Hyped. Get
          </span>
          <span className="hero-line block text-5xl md:text-7xl lg:text-9xl">
            Noticed. Get Results.
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <p className="hero-sub max-w-sm text-lg leading-[1.4] font-semibold tracking-tight text-gh-black md:max-w-md md:text-2xl lg:max-w-lg lg:text-4xl">
            Klaar met gokken op content die niets oplevert?
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {statCards.map((card, index) => (
            <div key={card.id} className="stat-slot will-change-transform">
              <StatCard
                number={card.number}
                label={card.label}
                sub={card.sub}
                videoSrc={card.videoSrc}
                videoLabel={card.videoLabel}
                className={card.color}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
