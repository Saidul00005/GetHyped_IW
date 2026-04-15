"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const LENIS_LERP = 0.11;

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanupLenis: (() => void) | null = null;

    const syncLenisWithGsap = () => {
      if (motionQuery.matches) {
        window.__lenis = undefined;
        return;
      }

      const lenis = new Lenis({
        autoRaf: false,
        lerp: LENIS_LERP,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.1,
        wheelMultiplier: 0.9,
        overscroll: false,
      });
      const updateScrollTrigger = () => {
        ScrollTrigger.update();
      };
      const updateLenis = (time: number) => {
        lenis.raf(time * 1000);
      };
      const handleRefresh = () => {
        lenis.resize();
      };

      window.__lenis = lenis;
      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(updateLenis);
      ScrollTrigger.addEventListener("refresh", handleRefresh);

      // Recalculate pinned sections and trigger offsets after Lenis mounts.
      window.requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });

      cleanupLenis = () => {
        gsap.ticker.remove(updateLenis);
        ScrollTrigger.removeEventListener("refresh", handleRefresh);
        window.__lenis = undefined;
        lenis.destroy();
      };
    };

    const handleMotionChange = () => {
      cleanupLenis?.();
      cleanupLenis = null;
      syncLenisWithGsap();
    };

    syncLenisWithGsap();
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      cleanupLenis?.();
    };
  }, []);

  return <>{children}</>;
}
