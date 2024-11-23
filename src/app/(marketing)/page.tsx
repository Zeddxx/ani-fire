"use client";

import AnimeLibraryAutoScroller from "@/components/landing/anime-library-auto-scroller";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import GridPattern from "@/components/ui/grid-pattern";
import SpacingText from "@/components/ui/spacing-text";
import { merge } from "@/lib/utils/index";

export default function Marketing() {
  return (
    <div className="relative min-h-[calc(100dvh-80px)] w-full px-4">
      <GridPattern
        height={60}
        width={60}
        strokeDasharray={"4 2"}
        className={merge(
          "-z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />

      <div className="wrapper-container z-10 flex h-full min-h-[calc(100dvh-80px)] flex-col items-center text-wrap py-20">
        <SpacingText
          text="Last Updated - 22 Oct 2024"
          className="text-muted-foreground"
        />
        <SpacingText
          text="WATCH ANIME"
          className="text-[clamp(2.8rem,10vw,12rem)] font-semibold capitalize leading-tight"
        />
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={merge(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Explore Animes
          </span>
        </AnimatedGradientText>

        <div className="mx-auto my-36 grid w-full max-w-screen-xl gap-y-5 md:grid-cols-6">
          <div className="w-full md:col-span-2">
            <h3 className="text-base text-secondary-foreground">
              Whats on Anifire V2?
            </h3>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-4xl font-medium leading-snug">
              The old version was way to simple and had some glitches so i
              thought of creating a new version of it.
            </h4>
          </div>
        </div>

        <div className="w-full">
          <AnimeLibraryAutoScroller />
        </div>
      </div>
    </div>
  );
}
