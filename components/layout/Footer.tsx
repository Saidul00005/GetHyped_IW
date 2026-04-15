"use client";

import { gsap } from "gsap";
import { type LucideIcon, Music2 } from "lucide-react";
import Link from "next/link";
import { type MouseEvent, useCallback, useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import {
  companyName,
  contactInfo,
  footerMeta,
  navLinks,
} from "@/lib/data/site-data";
import { scrollToSection } from "@/lib/scroll-to-section";

const socialLinks: Array<{
  label: string;
  href: string;
  icon: LucideIcon;
}> = [
  { label: "LinkedIn", href: "#", icon: Music2 },
  { label: "TikTok", href: "#", icon: Music2 },
  { label: "Instagram", href: "#", icon: Music2 },
  { label: "YouTube", href: "#", icon: Music2 },
];

export default function Footer() {
  const prefersReducedMotionRef = useRef(false);
  const footerNavLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const footerNavHighlightRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      prefersReducedMotionRef.current = motionQuery.matches;
    };
    const highlights = footerNavHighlightRefs.current.filter(
      (node): node is HTMLSpanElement => Boolean(node),
    );

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    gsap.set(highlights, {
      autoAlpha: 0,
      scaleX: 0.72,
      x: -8,
      transformOrigin: "left center",
    });

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
      gsap.killTweensOf([
        ...footerNavLinkRefs.current.filter(Boolean),
        ...highlights,
      ]);
    };
  }, []);

  const createNavClickHandler = useCallback(
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;

      const didScroll = scrollToSection(href.replace(/^#/, ""), {
        offset: 12,
        duration: 1.05,
      });

      if (!didScroll) return;

      event.preventDefault();
    },
    [],
  );

  const animateFooterNavHover = useCallback(
    (index: number, isEntering: boolean) => {
      const link = footerNavLinkRefs.current[index];
      const highlight = footerNavHighlightRefs.current[index];

      if (!link || !highlight) return;

      gsap.killTweensOf([link, highlight]);

      if (prefersReducedMotionRef.current) {
        gsap.set(link, { y: 0, color: "var(--gh-black)" });
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

  return (
    <footer className="footer-slope bg-[#ece7d8] px-6 pt-30 pb-8 md:px-10">
      <div className="mx-auto grid max-w-400 grid-cols-1 gap-10 md:grid-cols-[minmax(280px,1fr)_minmax(0,720px)] md:items-end">
        <div className="pb-1">
          <div className="inline-flex rounded-2xl border-2 border-black bg-white px-4 py-2">
            <p className="text-[clamp(2.4rem,5.2vw,5.5rem)] leading-[0.82] font-extrabold tracking-tighter text-black">
              {companyName}
            </p>
          </div>
        </div>

        <div className="grid gap-6 pb-2 md:grid-cols-[minmax(0,1fr)_220px] md:gap-x-12">
          <div className="grid content-start gap-6">
            <div className="flex flex-wrap items-center gap-2">
              {navLinks.map((link, index) => (
                <Badge
                  key={link.label}
                  variant="outline"
                  asChild
                  className="h-auto rounded-lg border-black/15 bg-white px-3 py-1.5 text-sm font-semibold text-gh-black"
                >
                  <Link
                    ref={(node) => {
                      footerNavLinkRefs.current[index] = node;
                    }}
                    href={link.href}
                    onClick={createNavClickHandler(link.href)}
                    onMouseEnter={() => {
                      animateFooterNavHover(index, true);
                    }}
                    onMouseLeave={() => {
                      animateFooterNavHover(index, false);
                    }}
                    onFocus={() => {
                      animateFooterNavHover(index, true);
                    }}
                    onBlur={() => {
                      animateFooterNavHover(index, false);
                    }}
                    className="relative inline-flex items-center overflow-hidden rounded-lg px-3 py-1.5 will-change-transform"
                  >
                    <span
                      ref={(node) => {
                        footerNavHighlightRefs.current[index] = node;
                      }}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-lg bg-[linear-gradient(110deg,var(--gh-pink)_0%,var(--gh-orange)_100%)] opacity-0 transform-[translateX(-8px)_scaleX(0.72)] origin-[left_center] will-change-transform"
                    />
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </Badge>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xl font-extrabold tracking-tight text-black">
                Follow us
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-70"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-2 pt-0.5 text-sm font-medium text-black/55">
              <span>{footerMeta.copyrightLabel}</span>
              <a
                href={footerMeta.designCreditHref}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gh-orange text-sm transition-colors"
              >
                {footerMeta.designCreditLabel}
              </a>
            </div>
          </div>

          <div className="grid content-start gap-4 text-sm font-semibold text-black">
            <div>
              <p className="text-xl font-extrabold tracking-tight">Contact</p>
              <Link
                href={contactInfo.emailHref}
                className="block w-fit hover:text-gh-orange transition-colors"
              >
                {contactInfo.email}
              </Link>
              <Link
                href={contactInfo.phoneHref}
                className="block w-fit hover:text-gh-orange transition-colors"
              >
                {contactInfo.phoneDisplay}
              </Link>
            </div>
            <div>
              <p className="text-xl font-extrabold tracking-tight">Adres</p>
              <Link
                href={contactInfo.mapHref}
                target="_blank"
                rel="noreferrer"
                className="block w-fit hover:text-gh-orange transition-colors"
              >
                {contactInfo.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </Link>
            </div>
            <Link
              href="#"
              className="pt-1 text-sm font-medium text-black/55 hover:text-gh-orange transition-colors"
            >
              Privacyvoorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
