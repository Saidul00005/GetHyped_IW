"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import AdaptiveVideo from "@/components/Homepage/sections/shared/AdaptiveVideo";
import FeatureCard from "@/components/Homepage/sections/shared/FeatureCard";
import SectionTag from "@/components/Homepage/sections/shared/SectionTag";
import { expertiseData } from "@/lib/data/homepage-data";

gsap.registerPlugin(ScrollTrigger);

export default function Expertises() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".exp-card");
      if (!cards.length) return;

      if (window.innerWidth < 768) {
        gsap.from(cards, {
          y: 90,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            once: true,
          },
        });
        return;
      }

      cards.forEach((card, idx) => {
        gsap.set(card, {
          yPercent: idx === 0 ? 0 : 112,
          opacity: 1,
          zIndex: idx + 1,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: () => {
            const navHeight =
              document.querySelector("header")?.getBoundingClientRect()
                .height ?? 96;
            return `top top+=${Math.max(Math.round(navHeight * 0.45), 24)}`;
          },
          end: () => {
            const step = Math.max(window.innerHeight * 1.05, 700);
            return `+=${(cards.length - 1) * step}`;
          },
          scrub: 1.25,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0.8,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 1; index < cards.length; index += 1) {
        timeline
          .to(
            cards[index],
            { yPercent: 0, duration: 1.7, ease: "none" },
            `step-${index}`,
          )
          .to(
            cards[index - 1],
            { opacity: 0, duration: 0.8, ease: "none" },
            `step-${index}+=0.42`,
          );
      }
    },
    { scope: rootRef },
  );

  return (
    <section id="expertises" ref={rootRef} className="px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-400 flex-col gap-6 md:relative md:h-[calc(100vh-6rem)] md:overflow-hidden">
        {expertiseData.map((item, index) => (
          <FeatureCard
            key={item.num}
            className={`exp-card ${item.bg} transition-shadow duration-200 hover:shadow-[0_22px_60px_rgba(0,0,0,0.08)] md:absolute md:inset-0 md:h-full`}
          >
            <Link
              href={item.href}
              aria-label={`${item.name} - ${item.cta}`}
              className="absolute inset-0 z-0 rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gh-orange/45"
            />
            <div className="relative z-10 pointer-events-none flex h-full flex-col">
              <div className="mb-2 flex items-center justify-between md:mb-3">
                <SectionTag>Expertise</SectionTag>
                <span
                  className={`text-6xl leading-none font-extrabold tracking-tighter xl:text-8xl ${
                    index === 0 || index === 1
                      ? "text-black/25"
                      : "text-white/55"
                  }`}
                >
                  {item.num}
                </span>
              </div>

              <h2 className="text-display leading-[0.95] font-extrabold tracking-tighter text-gh-black">
                {item.name}
              </h2>

              <div className="mt-auto grid grid-cols-1 items-end gap-6 md:grid-cols-2 md:gap-8 pt-8 md:pt-10">
                <div>
                  <h3 className="text-3xl leading-tight font-extrabold tracking-tight text-gh-black md:text-4xl xl:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-xl leading-[1.3] font-semibold text-black/85 md:text-2xl xl:text-3xl">
                    {item.desc}
                  </p>
                  <div className="pointer-events-auto">
                    <ActionLink
                      href={item.href}
                      label={item.cta}
                      variant={item.ctaVariant}
                      className="mt-5 md:mt-6"
                    />
                  </div>
                </div>

                <div className="relative ml-auto w-full max-w-95 overflow-hidden rounded-[28px] border-4 border-white bg-black/10 h-[45vh] min-h-55 max-h-130">
                  <AdaptiveVideo
                    src={item.videoSrc}
                    label={item.videoLabel}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}
