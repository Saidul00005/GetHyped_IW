"use client";

import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { useCallback, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
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
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      prefersReducedMotionRef.current = motionQuery.matches;
    };

    updateMotionPreference();
    gsap.set(buttonRef.current, { transformOrigin: "left center" });
    gsap.set(iconRef.current, { transformOrigin: "center center" });
    motionQuery.addEventListener("change", updateMotionPreference);

    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
      gsap.killTweensOf([buttonRef.current, iconRef.current]);
    };
  }, []);

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
        onClick={onClick}
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
