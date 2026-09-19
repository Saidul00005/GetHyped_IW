import { gsap } from "@/lib/gsap/register";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function getPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

const revealState = {
  opacity: 1,
  y: 0,
  yPercent: 0,
  x: 0,
  rotation: 0,
  scale: 1,
  clearProps: "transform",
} as const;

export function getRefElements<T extends Element>(
  refs: ReadonlyArray<T | null | undefined>,
): T[] {
  return refs.filter((element): element is T => Boolean(element));
}

/** Skip entrance animations: leave content in its final visible state. */
export function revealElements(
  elements: ReadonlyArray<Element | null | undefined>,
) {
  const targets = getRefElements(elements);
  if (!targets.length) return;

  gsap.set(targets, revealState);
}

/** @deprecated Prefer `revealElements` with refs. */
export function revealScoped(selector: string, scope?: Element | null) {
  const root = scope ?? document.documentElement;
  revealElements(Array.from(root.querySelectorAll(selector)));
}

export function getScrollY() {
  return window.__lenis?.scroll ?? window.scrollY;
}

type ScrollHandler = () => void;

/** Prefer Lenis scroll events when smooth scrolling is active. */
export function subscribeScroll(handler: ScrollHandler) {
  handler();

  const lenis = window.__lenis;
  if (lenis) {
    lenis.on("scroll", handler);
    return () => {
      lenis.off("scroll", handler);
    };
  }

  window.addEventListener("scroll", handler, { passive: true });

  let lenisCleanup: (() => void) | undefined;
  const attachLenis = () => {
    const activeLenis = window.__lenis;
    if (!activeLenis) return;

    window.removeEventListener("scroll", handler);
    activeLenis.on("scroll", handler);
    lenisCleanup = () => {
      activeLenis.off("scroll", handler);
    };
  };

  const attachTimer = window.setTimeout(attachLenis, 0);

  return () => {
    window.clearTimeout(attachTimer);
    window.removeEventListener("scroll", handler);
    lenisCleanup?.();
  };
}
