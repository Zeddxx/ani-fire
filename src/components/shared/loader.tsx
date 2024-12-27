import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BeatLoaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  childClassName?: string;
}

export default function BeatLoader({
  className,
  childClassName,
  ...props
}: BeatLoaderProps) {
  return (
    <div
      className={cn(
        "flex h-[30px] w-max items-center justify-between gap-1",
        className,
      )}
      {...props}
    >
      <div
        className={cn("beat h-2 w-2 rounded-full bg-white", childClassName)}
      />
      <div
        className={cn("beat h-2 w-2 rounded-full bg-white", childClassName)}
      />
      <div
        className={cn("beat h-2 w-2 rounded-full bg-white", childClassName)}
      />
    </div>
  );
}
