"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import FeatureCard from "@/components/Homepage/sections/shared/FeatureCard";
import SectionTag from "@/components/Homepage/sections/shared/SectionTag";

gsap.registerPlugin(ScrollTrigger);

const expertises = [
  {
    num: "01",
    name: "Social strategy",
    title: "Slimme strategie. Sterke start.",
    desc: "We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die echt impact maken.",
    cta: "Meer over social strategie",
    ctaVariant: "ghSolid",
    bg: "bg-white",
  },
  {
    num: "02",
    name: "Content creation",
    title: "Content die opvalt en raakt.",
    desc: "We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek.",
    cta: "Meer over content creatie",
    ctaVariant: "ghOutline",
    bg: "bg-[#ffc3ff]",
  },
  {
    num: "03",
    name: "Activation",
    title: "Zichtbaar waar en wanneer het telt.",
    desc: "De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is.",
    cta: "Meer over activatie",
    ctaVariant: "ghOutline",
    bg: "bg-gh-green",
  },
  {
    num: "04",
    name: "Data",
    title: "Inzichten die impact maken.",
    desc: "We duiken in de cijfers om te snappen wat echt werkt en sturen jouw content scherp bij.",
    cta: "Meer over data",
    ctaVariant: "ghOutline",
    bg: "bg-gh-blue",
  },
] as const;

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
          yPercent: idx === 0 ? 0 : 125,
          autoAlpha: 1,
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
            return `top top+=${Math.round(navHeight + 8)}`;
          },
          end: () => {
            const step = Math.max(window.innerHeight * 1.05, 700);
            return `+=${(cards.length - 1) * step}`;
          },
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let index = 1; index < cards.length; index += 1) {
        timeline
          .to(cards[index], { yPercent: 0, duration: 1.85 }, `step-${index}`)
          .to(
            cards[index - 1],
            { autoAlpha: 0, duration: 0.8 },
            `step-${index}+=0.42`,
          );
      }
    },
    { scope: rootRef },
  );

  return (
    <section id="expertises" ref={rootRef} className="px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-400 flex-col gap-6 md:relative md:h-[calc(100vh-7.5rem)] md:overflow-hidden">
        {expertises.map((item, index) => (
          <FeatureCard
            key={item.num}
            className={`exp-card ${item.bg} md:absolute md:inset-0 md:h-full`}
          >
            <div className="mb-6 flex items-center justify-between">
              <SectionTag>Expertise</SectionTag>
              <span
                className={`text-8xl leading-none font-extrabold tracking-tighter ${
                  index === 0 || index === 1 ? "text-black/25" : "text-white/55"
                }`}
              >
                {item.num}
              </span>
            </div>

            <h2 className="text-display leading-[0.95] font-extrabold tracking-tighter text-gh-black">
              {item.name}
            </h2>

            <div className="mt-24 grid grid-cols-1 items-end gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-5xl leading-tight font-extrabold tracking-tight text-gh-black">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xl text-3xl leading-[1.2] font-semibold text-black/85">
                  {item.desc}
                </p>
                <ActionLink
                  href="#"
                  label={item.cta}
                  variant={item.ctaVariant}
                  className="mt-6"
                />
              </div>
              <div className="ml-auto h-90 w-full max-w-95 rounded-[28px] border-4 border-white bg-black/10" />
            </div>
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}
