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

const LENIS_EASING = (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time));

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
        duration: 1.15,
        easing: LENIS_EASING,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.2,
        wheelMultiplier: 1,
      });
      const updateScrollTrigger = () => {
        ScrollTrigger.update();
      };
      const updateLenis = (time: number) => {
        lenis.raf(time * 1000);
      };

      window.__lenis = lenis;
      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      // Recalculate pinned sections and trigger offsets after Lenis mounts.
      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      cleanupLenis = () => {
        gsap.ticker.remove(updateLenis);
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
