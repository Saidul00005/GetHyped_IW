"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type * as React from "react";
import { useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";
import { REDUCED_MOTION_QUERY } from "@/lib/gsap/motion";
import { gsap, useGSAP } from "@/lib/gsap/register";
import { queueSectionScroll, scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

type ActionLinkProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  variant?: "ghOutline" | "ghSolid";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export default function ActionLink({
  href,
  label,
  icon,
  variant = "ghOutline",
  className,
  onClick,
}: ActionLinkProps) {
  const isSolid = variant === "ghSolid";
  const pathname = usePathname();
  const router = useRouter();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotionRef = useRef(false);

  useGSAP(
    () => {
      const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
      const updateMotionPreference = () => {
        prefersReducedMotionRef.current = motionQuery.matches;
      };

      updateMotionPreference();
      motionQuery.addEventListener("change", updateMotionPreference);

      if (buttonRef.current) {
        gsap.set(buttonRef.current, { transformOrigin: "left center" });
      }
      if (iconRef.current) {
        gsap.set(iconRef.current, { transformOrigin: "center center" });
      }

      return () => {
        motionQuery.removeEventListener("change", updateMotionPreference);
      };
    },
    { scope: buttonRef },
  );

  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotionRef.current || !buttonRef.current) return;

    gsap.killTweensOf([buttonRef.current, iconRef.current]);

    gsap.to(buttonRef.current, {
      rotation: -7,
      y: -1,
      duration: 0.16,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      x: 2,
      y: -3,
      rotation: 18,
      duration: 0.16,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return;

    gsap.killTweensOf([buttonRef.current, iconRef.current]);

    if (prefersReducedMotionRef.current) {
      gsap.set(buttonRef.current, { rotation: 0, y: 0 });
      gsap.set(iconRef.current, { x: 0, y: 0, rotation: 0 });
      return;
    }

    gsap.to(buttonRef.current, {
      rotation: 0,
      y: 0,
      duration: 0.12,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.12,
      ease: "power2.out",
    });
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      if (href.startsWith("/#")) {
        const sectionId = href.slice(2);
        if (!sectionId) return;

        event.preventDefault();

        if (pathname === "/" && scrollToSection(sectionId)) {
          return;
        }

        queueSectionScroll(sectionId);
        router.push("/");
        return;
      }

      if (href.startsWith("#")) {
        const sectionId = href.slice(1);
        if (!sectionId) return;

        const didScroll = scrollToSection(sectionId);
        if (!didScroll) return;

        event.preventDefault();
      }
    },
    [href, onClick, pathname, router],
  );

  return (
    <Button
      asChild
      variant={variant}
      size="lg"
      className={cn("gap-2 px-4 py-2 text-lg font-semibold", className)}
    >
      <Link
        ref={buttonRef}
        href={href}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className="will-change-transform"
      >
        {label}
        <span
          ref={iconRef}
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold will-change-transform",
            isSolid ? "bg-white text-gh-orange" : "bg-gh-black text-white",
          )}
        >
          {icon ?? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
        </span>
      </Link>
    </Button>
  );
}
