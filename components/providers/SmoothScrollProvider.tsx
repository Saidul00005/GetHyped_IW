"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  consumeQueuedSectionScroll,
  scrollToSection,
} from "@/lib/scroll-to-section";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const LENIS_LERP = 0.11;

function isPageReload() {
  const navigationEntries = performance.getEntriesByType("navigation");
  const navigationEntry = navigationEntries[0] as
    | PerformanceNavigationTiming
    | undefined;

  if (navigationEntry) {
    return navigationEntry.type === "reload";
  }

  return false;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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

  useEffect(() => {
    if (!pathname) return;

    const queuedSection = consumeQueuedSectionScroll();
    const hash = window.location.hash.replace(/^#/, "");
    const targetSection = queuedSection ?? hash;
    if (!targetSection) {
      if (pathname !== "/" || !isPageReload()) return;

      const timers = [0, 120, 320].map((delay) =>
        window.setTimeout(() => {
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
            return;
          }

          window.scrollTo({ top: 0, behavior: "auto" });
        }, delay),
      );

      return () => {
        timers.forEach((timer) => {
          window.clearTimeout(timer);
        });
      };
    }

    const timers = [80, 220, 420].map((delay) =>
      window.setTimeout(() => {
        scrollToSection(targetSection, {
          offset: 12,
          duration: 1.05,
        });
      }, delay),
    );

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, [pathname]);

  return <>{children}</>;
}
