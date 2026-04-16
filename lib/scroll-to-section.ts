type LenisWindow = Window & {
  __lenis?: {
    scrollTo: (
      target: number | string | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
      },
    ) => void;
  };
};

type ScrollToSectionOptions = {
  offset?: number;
  duration?: number;
  headerSelector?: string;
  headerFallbackHeight?: number;
};

const PENDING_SECTION_KEY = "__pendingSectionScroll";

export function scrollToSection(
  sectionId: string,
  {
    offset = 12,
    duration = 1.05,
    headerSelector = "header",
    headerFallbackHeight = 96,
  }: ScrollToSectionOptions = {},
) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const win = window as LenisWindow;
  const headerHeight =
    document.querySelector(headerSelector)?.getBoundingClientRect().height ??
    headerFallbackHeight;
  const scrollOffset = -(headerHeight + offset);

  if (win.__lenis) {
    win.__lenis.scrollTo(target, {
      offset: scrollOffset,
      duration,
    });
    return true;
  }

  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: Math.max(0, targetTop + scrollOffset),
    behavior: "auto",
  });

  return true;
}

export function queueSectionScroll(sectionId: string) {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(PENDING_SECTION_KEY, sectionId);
}

export function consumeQueuedSectionScroll() {
  if (typeof window === "undefined") return null;

  const sectionId = window.sessionStorage.getItem(PENDING_SECTION_KEY);
  if (!sectionId) return null;

  window.sessionStorage.removeItem(PENDING_SECTION_KEY);
  return sectionId;
}
