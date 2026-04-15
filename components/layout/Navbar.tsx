"use client";

import { gsap } from "gsap";
import { Flame, Menu } from "lucide-react";
import Link from "next/link";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ActionLink from "@/components/Homepage/sections/shared/ActionLink";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { scrollToSection as scrollToSectionById } from "@/lib/scroll-to-section";
import { companyName, navLinks } from "@/lib/data/site-data";
import { cn } from "@/lib/utils";

const desktopCtaClassName =
  "border-fuchsia-200 bg-fuchsia-200 text-gh-black hover:bg-fuchsia-200/90";

const mobileLinkClassName =
  "rounded-2xl border border-black/8 bg-white/78 px-4 py-3 text-lg font-semibold shadow-[0_10px_24px_rgba(0,0,0,0.04)] hover:bg-white";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isClosingRef = useRef(false);
  const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const desktopLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const desktopHighlightRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const menuHeaderRef = useRef<HTMLDivElement>(null);
  const menuCtaRef = useRef<HTMLDivElement>(null);
  const menuLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      prefersReducedMotionRef.current = motionQuery.matches;
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    updateMotionPreference();
    handleScroll();

    motionQuery.addEventListener("change", updateMotionPreference);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const highlights = desktopHighlightRefs.current.filter(
      (node): node is HTMLSpanElement => Boolean(node),
    );

    gsap.set(highlights, {
      autoAlpha: 0,
      scaleX: 0.72,
      x: -8,
      transformOrigin: "left center",
    });

    return () => {
      gsap.killTweensOf([
        ...desktopLinkRefs.current.filter(Boolean),
        ...highlights,
      ]);
    };
  }, []);

  const scrollToSection = useCallback((href: string) => {
    if (!href.startsWith("#")) return false;

    return scrollToSectionById(href.replace(/^#/, ""), {
      offset: 12,
      duration: 1.05,
    });
  }, []);

  const finishClose = useCallback(() => {
    isClosingRef.current = false;
    openTimelineRef.current?.kill();
    openTimelineRef.current = null;
    setOpen(false);
  }, []);

  const animateMenuClose = useCallback(() => {
    if (isClosingRef.current) return;

    const menuPanel = sheetContentRef.current;
    if (!menuPanel || prefersReducedMotionRef.current) {
      finishClose();
      return;
    }

    isClosingRef.current = true;
    openTimelineRef.current?.kill();

    const menuLinks = menuLinkRefs.current.filter(
      (link): link is HTMLAnchorElement => Boolean(link),
    );

    const closeTimeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: finishClose,
    });

    closeTimeline
      .to(menuCtaRef.current, { y: 16, autoAlpha: 0, duration: 0.16 }, 0)
      .to(
        [...menuLinks].reverse(),
        { x: 28, autoAlpha: 0, duration: 0.2, stagger: 0.04 },
        0.02,
      )
      .to(menuHeaderRef.current, { y: 20, autoAlpha: 0, duration: 0.2 }, 0)
      .to(menuPanel, { x: 40, autoAlpha: 0, duration: 0.32 }, 0.08);

    openTimelineRef.current = closeTimeline;
  }, [finishClose]);

  const handleSheetOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        isClosingRef.current = false;
        setOpen(true);
        return;
      }

      if (!open) {
        setOpen(false);
        return;
      }

      animateMenuClose();
    },
    [animateMenuClose, open],
  );

  const createNavClickHandler = useCallback(
    (href: string, shouldCloseMenu = false) =>
      (event: MouseEvent<HTMLAnchorElement>) => {
        const didScroll = scrollToSection(href);
        if (!didScroll) return;

        event.preventDefault();

        if (shouldCloseMenu) {
          animateMenuClose();
        }
      },
    [animateMenuClose, scrollToSection],
  );

  const animateDesktopNavHover = useCallback(
    (index: number, isEntering: boolean) => {
      const link = desktopLinkRefs.current[index];
      const highlight = desktopHighlightRefs.current[index];

      if (!link || !highlight) return;

      gsap.killTweensOf([link, highlight]);

      if (prefersReducedMotionRef.current) {
        gsap.set(link, { color: "var(--gh-black)" });
        gsap.set(highlight, {
          autoAlpha: isEntering ? 1 : 0,
          scaleX: isEntering ? 1 : 0.72,
          x: isEntering ? 0 : -8,
        });
        return;
      }

      gsap.to(link, {
        y: isEntering ? -1 : 0,
        color: "var(--gh-black)",
        duration: isEntering ? 0.16 : 0.12,
        ease: "power2.out",
      });
      gsap.to(highlight, {
        autoAlpha: isEntering ? 1 : 0,
        scaleX: isEntering ? 1 : 0.72,
        x: isEntering ? 0 : -8,
        duration: isEntering ? 0.18 : 0.12,
        ease: "power2.out",
      });
    },
    [],
  );

  useEffect(() => {
    if (!open || isClosingRef.current) return;

    const rafId = window.requestAnimationFrame(() => {
      const menuPanel = sheetContentRef.current;
      if (!menuPanel) return;

      const menuLinks = menuLinkRefs.current.filter(
        (link): link is HTMLAnchorElement => Boolean(link),
      );
      const animatedTargets = [
        menuPanel,
        menuHeaderRef.current,
        menuCtaRef.current,
        ...menuLinks,
      ].filter(Boolean);

      openTimelineRef.current?.kill();
      gsap.killTweensOf(animatedTargets);

      if (prefersReducedMotionRef.current) {
        gsap.set(menuPanel, {
          x: 0,
          autoAlpha: 1,
          clearProps: "transform,opacity,visibility",
        });
        gsap.set([menuHeaderRef.current, menuCtaRef.current, ...menuLinks], {
          x: 0,
          y: 0,
          autoAlpha: 1,
          clearProps: "transform,opacity,visibility",
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        menuPanel,
        { x: 48, autoAlpha: 1 },
        { x: 0, autoAlpha: 1, duration: 0.56, clearProps: "transform" },
      )
        .fromTo(
          menuHeaderRef.current,
          { y: 18, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.34,
            clearProps: "transform,opacity,visibility",
          },
          0.1,
        )
        .fromTo(
          menuLinks,
          { x: 26, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.32,
            stagger: 0.08,
            clearProps: "transform,opacity,visibility",
          },
          0.16,
        )
        .fromTo(
          menuCtaRef.current,
          { y: 18, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.28,
            clearProps: "transform,opacity,visibility",
          },
          0.38,
        );

      openTimelineRef.current = tl;
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      openTimelineRef.current?.kill();
    };
  }, [open]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-6 pt-5 md:px-10">
      <div className="mx-auto flex w-full max-w-400 items-center justify-between gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
        <Link
          href="/"
          aria-label="Get Hyped home"
          className="justify-self-start text-4xl leading-none font-extrabold tracking-tighter whitespace-nowrap text-gh-black md:text-5xl"
        >
          {companyName}
        </Link>

        <NavigationMenu
          viewport={false}
          className={cn(
            "hidden rounded-2xl border border-black/10 bg-white px-3 py-1.5 xl:flex",
            scrolled && "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
          )}
        >
          <NavigationMenuList className="gap-4">
            {navLinks.map((link, index) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild className="text-sm! xl:text-base!">
                  <Link
                    ref={(node) => {
                      desktopLinkRefs.current[index] = node;
                    }}
                    href={link.href}
                    onClick={createNavClickHandler(link.href)}
                    onMouseEnter={() => {
                      animateDesktopNavHover(index, true);
                    }}
                    onMouseLeave={() => {
                      animateDesktopNavHover(index, false);
                    }}
                    onFocus={() => {
                      animateDesktopNavHover(index, true);
                    }}
                    onBlur={() => {
                      animateDesktopNavHover(index, false);
                    }}
                    className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-3 py-2 font-semibold text-gh-black will-change-transform"
                  >
                    <span
                      ref={(node) => {
                        desktopHighlightRefs.current[index] = node;
                      }}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-xl bg-[linear-gradient(110deg,var(--gh-pink)_0%,var(--gh-orange)_100%)]"
                    />
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <ActionLink
          href="#contact"
          label="Get Results"
          icon={<Flame className="h-4 w-4" aria-hidden="true" />}
          variant="ghSolid"
          onClick={createNavClickHandler("#contact")}
          className={cn(
            "hidden justify-self-end xl:inline-flex",
            desktopCtaClassName,
          )}
        />

        <Sheet open={open} onOpenChange={handleSheetOpenChange}>
          <SheetTrigger asChild>
            <Button
              variant="ghOutline"
              size="icon-lg"
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              className="rounded-2xl border-black/20 bg-white/95 shadow-[0_12px_30px_rgba(0,0,0,0.08)] xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            ref={sheetContentRef}
            side="right"
            className="w-[86vw] max-w-sm border-l border-black/10 bg-gh-white/95 px-0 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl data-open:animate-none data-closed:animate-none"
          >
            <div ref={menuHeaderRef}>
              <SheetHeader className="pb-3">
                <SheetTitle className="font-heading text-3xl tracking-tight">
                  Menu
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Jump to sections on the Get Hyped landing page.
                </SheetDescription>
              </SheetHeader>
            </div>

            <nav className="flex flex-col gap-3 px-6 pt-2 pb-6">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  ref={(node) => {
                    menuLinkRefs.current[index] = node;
                  }}
                  href={link.href}
                  onClick={createNavClickHandler(link.href, true)}
                  className={mobileLinkClassName}
                >
                  {link.label}
                </Link>
              ))}

              <div ref={menuCtaRef} className="pt-2">
                <ActionLink
                  href="#contact"
                  label="Get Results"
                  icon={<Flame className="h-3.5 w-3.5" aria-hidden="true" />}
                  variant="ghSolid"
                  onClick={createNavClickHandler("#contact", true)}
                  className="mt-1 w-fit border-fuchsia-200 bg-fuchsia-200 text-gh-black hover:bg-fuchsia-200/90"
                />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
