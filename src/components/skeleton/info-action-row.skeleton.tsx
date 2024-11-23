import { Skeleton } from "@/components/ui/skeleton";

export const InfoActionRowSkeleton = () => (
  <div className="flex items-center gap-3">
    <Skeleton className="h-10 w-32" />
    <Skeleton className="h-10 w-40" />
  </div>
);
