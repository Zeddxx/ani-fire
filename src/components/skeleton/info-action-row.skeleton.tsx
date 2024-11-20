import { Skeleton } from "@/components/ui/skeleton";

export const InfoActionRowSkeleton = () => (
  <div className="flex gap-3 items-center">
    <Skeleton className="h-10 w-32" />
    <Skeleton className="h-10 w-40 " />
  </div>
);
