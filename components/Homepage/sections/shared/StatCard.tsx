"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  number: string;
  label: string;
  sub: string;
  className?: string;
};

export default function StatCard({
  number,
  label,
  sub,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "hero-card min-h-88 rounded-[30px] py-7 md:min-h-96 xl:min-h-120",
        className,
      )}
    >
      <CardContent className="flex h-full flex-col justify-between px-7">
        <p className="text-7xl leading-none font-extrabold tracking-tighter">
          {number}
        </p>
        <div>
          <p className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {label}
          </p>
          <p className="mt-2 text-base font-medium opacity-80 md:text-xl">
            {sub}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
