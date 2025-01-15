"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid h-[100svh] w-full place-items-center px-4">
      <div className="space-y-3 text-center">
        <Image
          src="/assets/page/error.gif"
          alt="Confused error gif"
          width={200}
          height={200}
          className="mx-auto object-contain"
        />
        <h2 className="text-center text-3xl font-semibold">{error.message}</h2>
        <div className="flex flex-col items-center gap-1">
          <p className="text-secondary">
            Try refreshing the page! if error persist please contact developer.
          </p>
          <Button
            variant="secondary"
            onClick={() => reset()}
            className="underline"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
