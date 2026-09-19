"use client";

import Link from "next/link";
import { useRef } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import AdaptiveVideo from "@/components/Homepage/sections/shared/AdaptiveVideo";
import FeatureCard from "@/components/Homepage/sections/shared/FeatureCard";
import SectionTag from "@/components/Homepage/sections/shared/SectionTag";
import { expertiseData } from "@/lib/data/homepage-data";
import { getPrefersReducedMotion, getRefElements } from "@/lib/gsap/motion";
import { gsap, useGSAP } from "@/lib/gsap/register";

/** Desktop pin: scroll budget + timeline pacing (hold vs transition). */
const SCROLL_PER_CARD_VH = 3.25;
const MIN_SCROLL_PER_CARD_PX = 1400;
const EXPERTISES_SCRUB = 3.4;
const CARD_HOLD_DURATION = 5;
const CARD_TRANSITION_DURATION = 2.75;
const TRANSITION_EASE = "power2.inOut";
const PIN_TOP_OFFSET = 56;
const SNAP_EDGE_BUFFER = 0.07;

function getPinScrollLength(cardCount: number) {
  const step = Math.max(
    window.innerHeight * SCROLL_PER_CARD_VH,
    MIN_SCROLL_PER_CARD_PX,
  );
  return (cardCount - 1) * step;
}

export default function Expertises() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const cards = getRefElements(cardRefs.current);
      if (!cards.length) return;

      if (getPrefersReducedMotion()) {
        rootRef.current?.classList.add("expertises-reduced-motion");
        gsap.set(cards, { opacity: 1, yPercent: 0, clearProps: "transform" });
        return;
      }

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
          yPercent: idx === 0 ? 0 : 108,
          opacity: 1,
          scale: idx === 0 ? 1 : 0.97,
          zIndex: idx + 1,
          transformOrigin: "center top",
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: `top top+=${PIN_TOP_OFFSET}`,
          end: () => `+=${getPinScrollLength(cards.length)}`,
          scrub: EXPERTISES_SCRUB,
          fastScrollEnd: true,
          snap: {
            snapTo: (progress, scrollTrigger) => {
              if (
                progress < SNAP_EDGE_BUFFER ||
                progress > 1 - SNAP_EDGE_BUFFER
              ) {
                return progress;
              }

              if (!scrollTrigger) return progress;

              const animation = scrollTrigger.animation as
                | gsap.core.Timeline
                | undefined;
              if (!animation?.labels) return progress;

              const labelProgress = Object.values(animation.labels).map(
                (time) => time / animation.duration(),
              );

              return gsap.utils.snap(labelProgress, progress);
            },
            duration: { min: 0.55, max: 1.15 },
            delay: 0.12,
            ease: "power3.inOut",
          },
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
        },
      });

      timeline.addLabel("card-0", 0);
      let position = 0;

      timeline.to({}, { duration: CARD_HOLD_DURATION });
      position += CARD_HOLD_DURATION;

      for (let index = 1; index < cards.length; index += 1) {
        const outgoing = cards[index - 1];
        const incoming = cards[index];
        const overlap = CARD_TRANSITION_DURATION * 0.12;

        timeline
          .to(
            incoming,
            {
              yPercent: 0,
              scale: 1,
              duration: CARD_TRANSITION_DURATION,
              ease: TRANSITION_EASE,
            },
            position,
          )
          .to(
            outgoing,
            {
              yPercent: -14,
              scale: 0.98,
              opacity: 0,
              duration: CARD_TRANSITION_DURATION,
              ease: TRANSITION_EASE,
            },
            position + overlap,
          );

        position += CARD_TRANSITION_DURATION;
        timeline.addLabel(`card-${index}`, position);
        timeline.to({}, { duration: CARD_HOLD_DURATION }, position);
        position += CARD_HOLD_DURATION;
      }
    },
    { scope: rootRef },
  );

  return (
    <section id="expertises" ref={rootRef} className="px-6 py-10 md:px-10">
      <div className="expertises-stack mx-auto flex max-w-400 flex-col gap-6 md:relative md:h-[calc(100vh-6rem)] md:overflow-hidden">
        {expertiseData.map((item, index) => (
          <div
            key={item.num}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className="expertise-card-layer md:absolute md:inset-0 md:h-full"
          >
            <FeatureCard
              className={`h-full ${item.bg} transition-shadow duration-200 hover:shadow-[0_22px_60px_rgba(0,0,0,0.08)]`}
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
                    className={`text-6xl leading-none font-extrabold tracking-tighter xl:text-8xl ${index === 0 || index === 1
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
          </div>
        ))}
      </div>
    </section>
  );
}
