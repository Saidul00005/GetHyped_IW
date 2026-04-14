"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type * as React from "react";

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

  return (
    <Button
      asChild
      variant={variant}
      size="lg"
      className={cn("gap-2 px-4 py-2 text-lg font-semibold", className)}
    >
      <Link href={href} onClick={onClick}>
        {label}
        <span
          className={cn(
            "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold",
            isSolid ? "bg-white text-gh-orange" : "bg-gh-black text-white",
          )}
        >
          {icon ?? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
        </span>
      </Link>
    </Button>
  );
}
