"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { memo } from "react";
import { SpotlightAnimes } from "@/types/anime";
import { buttonVariants } from "@/components/ui/button";
import { useQueries } from "@tanstack/react-query";
import { getAnimeEpisodesById } from "@/api/anime";
import { Calendar, Captions, Clock, Info, Mic, PlayCircle } from "lucide-react";
import AutoPlay from "embla-carousel-autoplay";

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
            className="w-full pl-0 min-h-44 h-[60vw] max-h-[600px] "
          >
            <div className="relative w-full h-full flex z-10">
              <div className="flex flex-col max-w-3xl h-full justify-end p-10">
                <h4 className="md:text-lg text-sm font-semibold text-primary">
                  #{anime.rank} Spotlight
                </h4>
                <h2 className="text-[clamp(1.4rem,6vw,4rem)] line-clamp-2 leading-tight font-bold">
                  {anime.name}
                </h2>

                <div className="md:flex hidden items-center gap-3 my-4 text-muted-foreground">
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

                  <span className="inline-flex items-center gap-x-2 px-2 text-sm rounded bg-primary">
                    {anime.otherInfo[3]}
                  </span>

                  <div className="flex gap-x-px rounded overflow-hidden text-sm font-bold text-secondary-foreground">
                    <span className="inline-flex items-center gap-x-1 bg-primary px-1">
                      <Captions className="h-4 w-4" />
                      {anime.episodes.sub}
                    </span>

                    <span className="inline-flex items-center gap-x-1 bg-primary-foreground text-secondary px-1">
                      <Mic className="h-3 w-3" />
                      {anime.episodes.dub}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground w-full lg:block hidden md:!line-clamp-2 xl:!line-clamp-3">
                  {anime.description}
                </p>

                <div className="flex gap-3 mt-6">
                  <Link
                    href={`/watch/${results[idx].data?.episodes[0].episodeId}`}
                    className={buttonVariants({
                      className: "flex items-center gap-x-3 md:text-sm text-xs",
                    })}
                  >
                    <PlayCircle className="h-4 w-4 shrink-0" />
                    <p className="">Watch Now</p>
                  </Link>

                  <Link
                    href={`/${anime.id}`}
                    className={buttonVariants({
                      variant: "secondary",
                      className: "flex items-center gap-x-3 md:text-sm text-xs",
                    })}
                  >
                    <Info className="h-4 w-4 shrink-0" />
                    Details
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 -z-10 self-end lg:w-[75%] w-full h-full [mask-image:linear-gradient(90deg,transparent,white,transparent)] brightness-50">
                <Image
                  src={anime.poster}
                  alt={anime.name}
                  fill
                  className="w-full h-full object-cover"
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
