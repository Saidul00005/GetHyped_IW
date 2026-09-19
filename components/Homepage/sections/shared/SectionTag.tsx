"use client";

import type * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionTagProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTag({ children, className }: SectionTagProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto rounded-[10px] border-black/15 bg-white px-2.5 py-1.5 text-[18px] leading-none font-medium text-gh-black",
        className,
      )}
    >
      {children}
    </Badge>
  );
}
