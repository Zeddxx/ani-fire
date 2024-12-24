import { cn } from "@/lib/utils";
import * as React from "react";
import { FaClosedCaptioning } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "lg";
  type?: string;
  episodes?: {
    sub?: number;
    dub?: number;
  };
}

const Badge = React.forwardRef<
  HTMLDivElement,
  React.PropsWithoutRef<BadgeProps>
>(({ className, size = "sm", type, episodes, ...props }, ref) => {
  if (!type && !episodes?.dub && !episodes?.sub) return null;

  return (
    <div
      ref={ref}
      className={"flex gap-px overflow-hidden text-base"}
      {...props}
    >
      {episodes?.sub && (
        <span
          className={cn(
            "flex items-center gap-1 rounded-bl rounded-tl bg-green px-2 py-1 font-medium text-black",
            size === "sm" && "px-1.5 py-0.5 text-xs",
          )}
        >
          <FaClosedCaptioning className="h-3 w-3" />
          {episodes.sub}
        </span>
      )}

      {episodes?.dub && (
        <span
          className={cn(
            "flex items-center gap-1 rounded-br rounded-tr bg-blue p-1 font-medium text-black",
            size === "sm" && "px-1.5 py-0.5 text-xs",
          )}
        >
          <FaMicrophone />
          {episodes.dub}
        </span>
      )}

      {type && (
        <>
          <span className="mx-2 my-auto h-1 w-1 rounded-full bg-white/50"></span>
          <span className="my-auto text-sm text-white/50">{type}</span>
        </>
      )}
    </div>
  );
});

Badge.displayName = "Badge";

export { Badge };
