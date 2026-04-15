"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    title: "Van nul naar vol, binnen 3 weken",
    client: "Bullit",
    border: "border-gh-orange",
    panel: "bg-gh-orange text-white",
    media: "from-[#1f0b08] via-[#27100b] to-[#130908]",
    offset: "xl:translate-y-14",
  },
  {
    title: "Zacht in smaak, sterk in beeld",
    client: "Roasta",
    border: "border-gh-blue",
    panel: "bg-gh-blue text-white",
    media: "from-[#102026] via-[#15323a] to-[#0d161a]",
    offset: "xl:translate-y-0",
  },
  {
    title: "Content die echt smaakt (en raakt)",
    client: "Loco",
    border: "border-gh-green",
    panel: "bg-gh-green text-white",
    media: "from-[#163026] via-[#1e4a3d] to-[#11261f]",
    offset: "xl:-translate-y-10",
  },
] as const;

export default function Work() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".work-header", {
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

      gsap.from(".work-card-anim", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section id="work" ref={rootRef} className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-400">
        <div className="work-header max-w-xl">
          <h2 className="text-[4rem] leading-[0.9] font-extrabold tracking-tighter md:text-[6rem]">
            Content dat scoort.
          </h2>
          <p className="mt-5 max-w-xl text-[1.5rem] leading-[1.12] font-bold tracking-tight md:text-[2.2rem]">
            Wij vertellen jouw verhaal. Op een manier die echt past bij jouw
            doelgroep. Met creatieve content die werkt en het verschil maakt.
          </p>
          <ActionLink
            href="#"
            label="Bekijk al ons werk"
            className="mt-5 w-fit text-base md:text-lg"
          />
        </div>

        <div className="work-grid mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 xl:grid-cols-3 xl:items-end">
          {works.map((item) => (
            <div key={item.title} className={`${item.offset} xl:px-2`}>
              <Card
                className={`work-card work-card-anim group relative block overflow-hidden rounded-4xl border-[6px] ${item.border} origin-bottom-left transform-gpu bg-transparent py-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:-translate-y-2 hover:-rotate-2`}
              >
                <Link href="#" className="block">
                  <div
                    className={`aspect-4/5 bg-linear-to-br ${item.media} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]`}
                  />
                  <CardContent
                    className={`info absolute right-3 bottom-3 left-3 rounded-[1.25rem] p-4 pt-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 sm:right-4 sm:bottom-4 sm:left-4 sm:pt-7 ${item.panel}`}
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
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
