"use client";

import AnimeLibraryAutoScroller from "@/components/(marketing)/anime-library-auto-scroller";
import GridPattern from "@/components/ui/grid-pattern";
import { merge } from "@/lib/utils";
import SpacingText from "@/components/ui/spacing-text";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

export default function Marketing() {
  return (
    <div className="min-h-[calc(100dvh-80px)] w-full relative px-4">
      <GridPattern
        height={60}
        width={60}
        strokeDasharray={"4 2"}
        className={merge(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] -z-10"
        )}
      />

      <div className="wrapper-container text-wrap min-h-[calc(100dvh-80px)] z-10 py-20 h-full flex flex-col items-center">
        <SpacingText text="Last Updated - 22 Oct 2024" className="text-muted" />
        <SpacingText
          text="WATCH ANIME"
          className="font-semibold leading-tight text-[clamp(2.8rem,10vw,12rem)] capitalize"
        />
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={merge(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Explore Animes
          </span>
        </AnimatedGradientText>

        <div className="grid md:grid-cols-6 w-full gap-y-5 max-w-screen-xl mx-auto my-36">
          <div className="md:col-span-2 w-full">
            <h3 className="text-base text-muted">Whats on Anifire V2?</h3>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-4xl leading-snug font-medium">
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
