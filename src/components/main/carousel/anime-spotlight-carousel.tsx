"use client";

import { getAnimeEpisodesById } from "@/api/anime";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
          delay: 5000,
        }),
      ]}
      className="wrapper-container"
    >
      <CarouselContent className="">
        {spotlightAnimes.map((anime, idx) => (
          <CarouselItem
            key={anime.id}
            className="h-[80vw] max-h-[600px] min-h-80 w-full pl-0"
          >
            <div className="relative z-10 flex h-full w-full">
              <div className="flex h-full max-w-4xl flex-col justify-end p-10">
                <h4 className="text-sm font-normal text-secondary md:text-lg">
                  #{anime.rank} Spotlight
                </h4>
                <h2 className="line-clamp-2 text-[clamp(1.4rem,6vw,3rem)] font-semibold leading-tight">
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
                <p className="hidden w-full leading-relaxed text-white md:!line-clamp-2 lg:block xl:!line-clamp-3">
                  {anime.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/watch/${results[idx].data?.episodes[0].episodeId}`}
                    className={buttonVariants({
                      variant: "secondary",
                      className:
                        "!rounded-full text-sm xl:!px-4 xl:!py-5 xl:!text-base",
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
              <div className="absolute right-0 -z-10 h-full w-full self-end object-bottom brightness-50 [mask-image:linear-gradient(90deg,transparent,white,transparent)] lg:w-[75%]">
                <Image
                  src={anime.poster}
                  alt={anime.name}
                  fill
                  className="h-full w-full object-cover object-top"
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
