import { cn } from "@/lib/utils";
import { memo } from "react";

interface SeparatorProps {
  className?: string;
  type?: "dot" | "line";
}

const Separator = ({ type = "dot", className }: SeparatorProps) => {
  if (type === "dot") {
    return (
      <span
        className={cn("h-1 w-1 rounded-full bg-muted-foreground", className)}
      />
    );
  }

  return <span className={cn("h-1 w-full bg-muted-foreground", className)} />;
};

export default memo(Separator);
