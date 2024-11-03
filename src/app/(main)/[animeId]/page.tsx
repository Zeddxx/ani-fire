"use client";

import { getAnimeEpisodesById, getAnimeInfoByAnimeId } from "@/api/anime";
import OtherInfos from "@/components/home/other-infos";
import { buttonVariants } from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import { QUERY_KEY } from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AnimeInfo = ({
  params: { animeId },
}: {
  params: { animeId: string };
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ANIME_INFO, animeId],
    queryFn: () => getAnimeInfoByAnimeId(animeId),
    enabled: !!animeId,
  });

  const { data: animeEpisodes } = useQuery({
    queryKey: [QUERY_KEY.ANIME_EPISODES_BY_ID, animeId],
    queryFn: () => getAnimeEpisodesById(animeId),
    enabled: !!animeId,
  });

  if (isLoading) return <p>is info loading...</p>;

  if (!data) return <p>Something went wrong!</p>;

  const {
    anime: { info, moreInfo },
  } = data;

  return (
    <section className="relative">
      <div className="absolute -z-10 w-full h-full brightness-50">
        <Image
          src={info.poster}
          alt={info.name}
          fill
          objectFit="cover"
          className="grayscale absolute"
        />
        <div className="absolute h-full w-full bg-primary/15 backdrop-blur-lg" />
      </div>
      <div className="max-w-screen-2xl w-full mx-auto flex xl:flex-row flex-col px-4">
        <div className="xl:basis-[70%] py-14 flex lg:flex-row flex-col gap-8">
          <div className="relative aspect-anime-image h-72 w-48 shrink-0 mx-auto rounded overflow-hidden shadow">
            <Image
              draggable={false}
              src={info.poster}
              alt={info.name}
              fill
              className="h-full w-full object-cover"
            />
          </div>

          <div className="w-full flex flex-col gap-6 lg:items-start items-center">
            <div className="xl:flex hidden items-center text-muted font-normal text-sm gap-2 w-full">
              <p className="">Home</p>
              <Separator type="dot" />
              <p>{info.stats.type}</p>
              <Separator type="dot" />
              <p className="text-white/50">{info.name}</p>
            </div>

            <div className="">
              <h1 className="xl:text-5xl text-4xl font-semibold line-clamp-2">
                {info.name}
              </h1>
            </div>

            <div className="">
              <OtherInfos {...info.stats} />
            </div>

            <div className="flex gap-3 items-center">
              <Link
                href={`/watch/${animeEpisodes?.episodes[0].episodeId}`}
                className={buttonVariants({
                  className:
                    "flex items-center !rounded-full text-white text-base shadow",
                })}
              >
                <Play className="h-4 w-4" />
                Watch now - Ep 1
              </Link>
            </div>

            <div className="">
              <p className="line-clamp-4 text-sm">{info.description}</p>
            </div>
          </div>
        </div>

        <div className="xl:basis-[30%]"></div>
      </div>
    </section>
  );
};

export default AnimeInfo;
