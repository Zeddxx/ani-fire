"use client";

import { getAnimeEpisodesById } from "@/api/anime";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SpotlightAnimes } from "@/types/anime";
import { useQueries } from "@tanstack/react-query";
import AutoPlay from "embla-carousel-autoplay";
import { Calendar, Captions, Clock, Info, Mic, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const AnimeSpotlightCarousel = ({
  spotlightAnimes,
}: {
  spotlightAnimes: SpotlightAnimes[];
}) => {
  const results = useQueries({
    queries: spotlightAnimes.map((anime) => ({
      queryKey: ["ANIME_EPISODES_BY_ID", anime.id],
      queryFn: () => getAnimeEpisodesById(anime.id),
    })),
  });

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        AutoPlay({
          delay: 5000,
        }),
      ]}
      className="wrapper-container"
    >
      <CarouselContent className="">
        {spotlightAnimes.map((anime, idx) => (
          <CarouselItem
            key={anime.id}
            className="h-[60vw] max-h-[600px] min-h-44 w-full pl-0"
          >
            <div className="relative z-10 flex h-full w-full">
              <div className="flex h-full max-w-3xl flex-col justify-end p-10">
                <h4 className="text-sm font-semibold text-primary md:text-lg">
                  #{anime.rank} Spotlight
                </h4>
                <h2 className="line-clamp-2 text-[clamp(1.4rem,6vw,4rem)] font-bold leading-tight">
                  {anime.name}
                </h2>

                <div className="my-4 hidden items-center gap-3 text-muted-foreground md:flex">
                  <span className="inline-flex items-center gap-x-2">
                    <PlayCircle className="h-4 w-4" />
                    {anime.otherInfo[0]}
                  </span>

                  <span className="inline-flex items-center gap-x-2">
                    <Clock className="h-4 w-4" />
                    {anime.otherInfo[1]}
                  </span>

                  <span className="inline-flex items-center gap-x-2">
                    <Calendar className="h-4 w-4" />
                    {anime.otherInfo[2]}
                  </span>

                  <span className="inline-flex items-center gap-x-2 rounded bg-primary px-2 text-sm">
                    {anime.otherInfo[3]}
                  </span>

                  <div className="flex gap-x-px overflow-hidden rounded text-sm font-bold text-secondary-foreground">
                    <span className="inline-flex items-center gap-x-1 bg-primary px-1">
                      <Captions className="h-4 w-4" />
                      {anime.episodes.sub}
                    </span>

                    <span className="inline-flex items-center gap-x-1 bg-primary-foreground px-1 text-secondary">
                      <Mic className="h-3 w-3" />
                      {anime.episodes.dub}
                    </span>
                  </div>
                </div>
                <p className="hidden w-full text-muted-foreground md:!line-clamp-2 lg:block xl:!line-clamp-3">
                  {anime.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/watch/${results[idx].data?.episodes[0].episodeId}`}
                    className={buttonVariants({
                      className: "flex items-center gap-x-3 text-xs md:text-sm",
                    })}
                  >
                    <PlayCircle className="h-4 w-4 shrink-0" />
                    <p className="">Watch Now</p>
                  </Link>

                  <Link
                    href={`/${anime.id}`}
                    className={buttonVariants({
                      variant: "secondary",
                      className: "flex items-center gap-x-3 text-xs md:text-sm",
                    })}
                  >
                    <Info className="h-4 w-4 shrink-0" />
                    Details
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 -z-10 h-full w-full self-end brightness-50 [mask-image:linear-gradient(90deg,transparent,white,transparent)] lg:w-[75%]">
                <Image
                  src={anime.poster}
                  alt={anime.name}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default memo(AnimeSpotlightCarousel);
