"use client";

import type * as React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeatureCardProps = React.ComponentProps<typeof Card>;

export default function FeatureCard({
  children,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <Card
      {...props}
      className={cn(
        "expertise-card relative overflow-hidden rounded-[28px] px-8 py-8 ring-0 md:py-14 md:px-14",
        className,
      )}
    >
      {children}
    </Card>
  );
}
