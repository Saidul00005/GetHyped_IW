"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import AdaptiveVideo, {
  type AdaptiveVideoHandle,
} from "@/components/Homepage/sections/shared/AdaptiveVideo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { workData } from "@/lib/data/homepage-data";
import {
  getPrefersReducedMotion,
  getRefElements,
  revealElements,
} from "@/lib/gsap/motion";
import { gsap, useGSAP } from "@/lib/gsap/register";

/** Symmetric xl fan — same z at rest so opacity/stacking never hides side cards. */
const workCardLayout = [
  { x: -4, y: 8, rotation: -1.5, scale: 1 },
  { x: 0, y: 0, rotation: 0, scale: 1 },
  { x: 4, y: 8, rotation: 1.5, scale: 1 },
] as const;

const HOVER_LIFT = 12;
const ENTRANCE_OFFSET = 72;
const HOVER_MOTION_DURATION = 0.55;
const HOVER_Z_INDEX = 40;

export default function Work() {
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const workGridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<AdaptiveVideoHandle | null>>([]);
  const hasNavigableHref = (href: string) =>
    href.trim().length > 0 && href !== "#";

  const playVideo = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.play();
  }, []);

  const stopVideo = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.reset();
  }, []);

  useGSAP(
    () => {
      const header = headerRef.current;
      const grid = workGridRef.current;
      const cards = getRefElements(cardRefs.current);

      if (!header || !cards.length || !grid) return;

      if (getPrefersReducedMotion()) {
        revealElements([header, ...cards]);
        return;
      }

      gsap.from(header, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          once: true,
        },
      });

      gsap.set(cards, { opacity: 1, visibility: "visible" });

      const scrollTriggerConfig = {
        trigger: grid,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.set(cards, { opacity: 1 });
        },
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1280px)", () => {
        const layout = cards.map(
          (_, index) => workCardLayout[index] ?? workCardLayout[1],
        );

        cards.forEach((card, index) => {
          const base = layout[index];
          gsap.set(card, {
            opacity: 1,
            x: base.x,
            y: base.y,
            rotation: base.rotation,
            scaleX: base.scale,
            scaleY: base.scale,
            zIndex: 1,
            transformOrigin: "center bottom",
          });
        });

        gsap.from(cards, {
          y: (index) => layout[index].y + ENTRANCE_OFFSET,
          stagger: 0.09,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: scrollTriggerConfig,
        });

        let hoveredIndex: number | null = null;
        const zResetCalls: Array<gsap.core.Tween | null> = cards.map(() => null);

        const hoverCleanups = cards.map((card, index) => {
          const base = layout[index];
          const hoverY = base.y - HOVER_LIFT;
          const hoverRotation = base.rotation * 0.65;
          const hoverScale = 1.02;

          const quickConfig = {
            duration: HOVER_MOTION_DURATION,
            ease: "power3.out",
          };

          const quickToY = gsap.quickTo(card, "y", quickConfig);
          const quickToRotation = gsap.quickTo(card, "rotation", quickConfig);
          const quickToScaleX = gsap.quickTo(card, "scaleX", quickConfig);
          const quickToScaleY = gsap.quickTo(card, "scaleY", quickConfig);

          const setStackOrder = (activeIndex: number | null) => {
            cards.forEach((target, targetIndex) => {
              gsap.set(target, {
                zIndex: activeIndex === targetIndex ? HOVER_Z_INDEX : 1,
              });
            });
          };

          const onEnter = () => {
            zResetCalls.forEach((call) => {
              call?.kill();
            });
            hoveredIndex = index;
            setStackOrder(index);
            quickToY(hoverY);
            quickToRotation(hoverRotation);
            quickToScaleX(hoverScale);
            quickToScaleY(hoverScale);
          };

          const onLeave = () => {
            quickToY(base.y);
            quickToRotation(base.rotation);
            quickToScaleX(base.scale);
            quickToScaleY(base.scale);

            zResetCalls[index]?.kill();
            zResetCalls[index] = gsap.delayedCall(
              HOVER_MOTION_DURATION,
              () => {
                if (hoveredIndex === index) {
                  hoveredIndex = null;
                }
                if (hoveredIndex === null) {
                  setStackOrder(null);
                } else {
                  gsap.set(card, { zIndex: 1 });
                }
              },
            );
          };

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);

          return () => {
            zResetCalls[index]?.kill();
            card.removeEventListener("mouseenter", onEnter);
            card.removeEventListener("mouseleave", onLeave);
          };
        });

        return () => {
          hoverCleanups.forEach((dispose) => {
            dispose();
          });
        };
      });

      mm.add("(max-width: 1279px)", () => {
        gsap.set(cards, {
          opacity: 1,
          clearProps: "transform",
          zIndex: "auto",
        });

        gsap.from(cards, {
          y: ENTRANCE_OFFSET,
          stagger: 0.09,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: scrollTriggerConfig,
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <section id="work" ref={rootRef} className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-400">
        <div ref={headerRef} className="max-w-xl">
          <h2 className="text-[4rem] leading-[0.9] font-extrabold tracking-tighter md:text-[6rem]">
            {workData.heading}
          </h2>
          <p className="mt-5 max-w-xl text-[1.5rem] leading-[1.12] font-bold tracking-tight md:text-[2.2rem]">
            {workData.body}
          </p>
          <ActionLink
            href={workData.cta.href}
            label={workData.cta.label}
            className="mt-5 w-fit text-base md:text-lg"
          />
        </div>

        <div
          ref={workGridRef}
          className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 xl:grid-cols-3 xl:items-end xl:overflow-visible"
        >
          {workData.items.map((item, index) => {
            const isClickable = hasNavigableHref(item.href);

            return (
              <div key={item.title} className="relative xl:px-2">
                <div
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="relative will-change-transform"
                  onMouseEnter={() => {
                    playVideo(index);
                  }}
                  onMouseLeave={() => {
                    stopVideo(index);
                  }}
                  onFocusCapture={() => {
                    playVideo(index);
                  }}
                  onBlurCapture={() => {
                    stopVideo(index);
                  }}
                >
                  <Card
                    className={`work-card group relative block cursor-pointer overflow-hidden rounded-4xl border-[6px] ${item.border} transform-gpu bg-transparent py-0`}
                  >
                    {isClickable ? (
                      <Link
                        href={item.href}
                        aria-label={`${item.client} - ${item.title}`}
                        className="absolute inset-0 z-0 rounded-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gh-orange/45"
                      />
                    ) : null}
                    <div className="pointer-events-none relative z-10">
                      <div className="relative aspect-4/5 overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${item.media} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-xl:group-hover:scale-[1.03] xl:transition-none`}
                        />
                        <div className="pointer-events-auto absolute inset-0 cursor-pointer">
                          <AdaptiveVideo
                            ref={(node) => {
                              videoRefs.current[index] = node;
                            }}
                            src={item.videoSrc}
                            label={item.videoLabel}
                            desktopBehavior="manual"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/5" />
                      </div>
                      <CardContent
                        className={`info absolute right-3 bottom-3 left-3 rounded-[1.25rem] p-4 pt-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-xl:group-hover:-translate-y-1 sm:right-4 sm:bottom-4 sm:left-4 sm:pt-7 xl:transition-none ${item.panel}`}
                        style={{
                          clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)",
                        }}
                      >
                        <span className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gh-black">
                          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="mb-3 pr-12 sm:mb-4 sm:pr-13">
                          <h3 className="text-balance text-2xl leading-[0.98] font-extrabold tracking-tight md:text-3xl xl:text-4xl">
                            {item.title}
                          </h3>
                        </div>
                        <Badge
                          variant="outline"
                          className="h-auto rounded-md border-white/35 bg-white/20 px-3 py-1 text-sm font-semibold text-white sm:text-base"
                        >
                          {item.client}
                        </Badge>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
