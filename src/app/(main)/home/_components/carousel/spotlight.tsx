"use client";

import { getAnimeEpisodesById } from "@/api/anime";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SpotlightAnimes } from "@/types/anime";
import { useQueries } from "@tanstack/react-query";
import AutoPlay from "embla-carousel-autoplay";
import { Calendar, Clock, Info, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { FaPlayCircle } from "react-icons/fa";

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
          delay: 8000,
        }),
      ]}
      className="wrapper-container relative"
    >
      <CarouselContent className="">
        {spotlightAnimes.map((anime, idx) => (
          <CarouselItem
            key={anime.id}
            className="h-[70vw] max-h-[600px] min-h-80 w-full pl-0"
          >
            <div className="relative z-10 flex h-full w-full">
              <div className="flex h-full max-w-3xl flex-col justify-end p-10">
                <h4 className="text-xs text-secondary sm:text-sm sm:font-semibold md:text-lg">
                  #{anime.rank} Spotlight
                </h4>
                <h2 className="mt-3 line-clamp-2 text-lg font-semibold leading-tight sm:text-[clamp(1.2rem,6vw,3rem)]">
                  {anime.name}
                </h2>

                <div className="my-4 hidden items-center gap-3 text-white md:flex">
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

                  <span className="inline-flex items-center gap-x-2 rounded bg-secondary px-2 text-sm text-primary">
                    {anime.otherInfo[3]}
                  </span>

                  <Badge episodes={anime.episodes} size="sm" />
                </div>
                <p className="hidden w-full text-sm leading-relaxed text-white md:!line-clamp-2 lg:block lg:text-base xl:!line-clamp-3">
                  {anime.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/watch/${results[idx].data?.episodes[0].episodeId}`}
                    className={buttonVariants({
                      variant: "secondary",
                      className:
                        "!rounded-full text-sm xl:!px-5 xl:!py-5 xl:!text-base",
                    })}
                  >
                    <FaPlayCircle className="h-4 w-4 shrink-0" />
                    <p className="">Watch Now</p>
                  </Link>

                  <Link
                    href={`/${anime.id}`}
                    className={buttonVariants({
                      className:
                        "xl !rounded-full bg-primary font-normal xl:bg-white/5 xl:!px-4 xl:!py-5 xl:!text-base xl:hover:bg-white/10",
                    })}
                  >
                    <Info className="h-4 w-4 shrink-0" />
                    Detail
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 -z-10 h-full w-full self-end object-bottom brightness-50 [mask-image:linear-gradient(180deg,white,transparent)] md:[mask-image:radial-gradient(ellipse,white,transparent_85%,transparent_80%)] lg:w-[75%]">
                <Image
                  src={anime.poster}
                  alt={anime.name}
                  fill
                  priority
                  className="h-full w-full object-cover object-top [mask-image:linear-gradient(90deg,transparent,white,transparent)]"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute bottom-12 right-0 flex -translate-x-16 flex-col">
        <CarouselNext className="h-10 w-10 rounded bg-white/20 text-white hover:bg-white/25" />
        <CarouselPrevious className="h-10 w-10 rounded bg-white/20 text-white hover:bg-white/25" />
      </div>
    </Carousel>
  );
};

export default memo(AnimeSpotlightCarousel);
