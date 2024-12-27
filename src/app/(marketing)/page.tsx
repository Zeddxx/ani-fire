"use client";

import BeatLoader from "@/components/shared/loader";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOP_SEARCHES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function Marketing() {
  return (
    <div className="w-full md:px-4">
      <BeatLoader />
      <div className="relative mx-auto h-auto w-full max-w-[1360px] overflow-hidden bg-white/5 px-8 py-14 backdrop-blur-md md:rounded-card">
        <div className="mx-auto w-full max-w-[37.5rem] space-y-7 text-center md:mx-0 md:p-14 md:text-start xl:p-20">
          <Link href="/home" className="text-4xl font-semibold text-white">
            AniFire
          </Link>

          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Search Anime..."
              className="h-12 rounded-xl text-base"
            />
            <Button variant="secondary" className="h-12 w-12">
              <Search className="!h-6 !w-6 text-black" />
            </Button>
          </div>

          <div className="text-start text-sm leading-[1.885]">
            <span className="font-semibold">Top search:</span>{" "}
            {TOP_SEARCHES.map((keyword, idx) => {
              const isLastIndex = idx === TOP_SEARCHES.length - 1;
              return (
                <Link
                  key={idx}
                  href={`/search?keyword=${keyword}`}
                  className="tracking-wide text-white transition-colors duration-300 hover:text-secondary"
                >
                  {keyword}
                  {!isLastIndex ? ", " : "."}
                </Link>
              );
            })}
          </div>

          <Link
            href="/home"
            className={cn(
              buttonVariants({
                variant: "secondary",
                className: "w-full !px-10 !py-7 text-xl font-medium md:w-max",
              }),
            )}
          >
            Watch anime
            <FaCircleArrowRight className="ml-4 !h-5 !w-5" />
          </Link>
        </div>

        <img
          src="https://hianime.to/images/anw-min.webp?v=0.1"
          alt="HiAnime image"
          className="absolute right-0 top-0 -z-10 hidden h-full w-full object-cover opacity-50 [mask-image:linear-gradient(90deg,transparent,#fff,#fff)] md:block lg:max-w-2xl"
        />
        <img
          src="https://hianime.to/images/anw-min.webp?v=0.1"
          alt="HiAnime image"
          className="absolute right-0 top-0 -z-10 hidden h-full w-full object-cover opacity-50 [mask-image:linear-gradient(90deg,transparent,#fff,#fff)] md:block lg:max-w-2xl"
        />
      </div>
    </div>
  );
}
