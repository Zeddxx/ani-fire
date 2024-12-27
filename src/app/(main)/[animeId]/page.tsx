"use client";

import { getAnimeInfoByAnimeId } from "@/api/anime";
import { AddionalInfo } from "@/components/main/info/additional-info";
import InfoActionRow from "@/components/main/info/info-action-row";
import HomeLayout from "@/components/main/layout/home-layout";
import OtherInfos from "@/components/main/other-infos";
import HoveredContent from "@/components/shared/hovered-content";
import { Badge } from "@/components/ui/badge";
import { CustomImage } from "@/components/ui/image";
import Description from "@/components/ui/info/description";
import Separator from "@/components/ui/separator";
import { COLORS } from "@/lib/constants";
import { QUERY_KEY } from "@/lib/query-key";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import AnimeCard from "../_components/shared/anime-card";

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

  if (isLoading) return <p>is info loading...</p>;

  if (!data) return <p>Something went wrong!</p>;

  const {
    anime: {
      info: { name, poster, stats, description, id },
      moreInfo,
    },
    recommendedAnimes,
    relatedAnimes,
  } = data;

  return (
    <>
      <section className="relative mt-16 h-auto">
        <div className="absolute -z-10 h-full w-full overflow-hidden brightness-50">
          <Image
            src={poster}
            alt={name}
            fill
            objectFit="cover"
            className="absolute opacity-55 blur-lg grayscale"
          />
        </div>
        <div className="z-20 mx-auto flex w-full max-w-screen-3xl flex-col gap-8 xl:flex-row xl:px-8 xl:pl-24">
          <div className="flex flex-col gap-x-6 gap-y-6 px-8 py-12 md:flex-row lg:gap-x-16 lg:py-32 xl:basis-[70%] xl:px-0">
            <div className="relative mx-auto aspect-anime-image h-64 w-44 shrink-0 overflow-hidden shadow">
              <Image
                draggable={false}
                src={poster}
                alt={name}
                fill
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex w-full flex-col items-center gap-6 md:items-start">
              <div className="hidden w-full items-center gap-2 text-sm font-normal text-muted-foreground xl:flex">
                <p className="text-white">Home</p>
                <Separator type="dot" />
                <p className="text-white">{stats.type}</p>
                <Separator type="dot" />
                <p className="text-white/80">{name}</p>
              </div>

              <div className="">
                <h1 className="line-clamp-2 text-center text-3xl font-medium !leading-tight lg:text-start xl:text-5xl">
                  {name}
                </h1>
              </div>

              {/* Others Infos */}
              <div className="">
                <OtherInfos {...stats} />
              </div>

              {/* Anime Info Action CTA */}
              <div className="">
                <InfoActionRow animeId={animeId} />
              </div>

              <Description description={description} />
            </div>
          </div>

          <div className="flex items-center bg-primary-100/40 p-8 backdrop-blur-xl xl:basis-[30%]">
            <div className="w-full space-y-2">
              {Object.entries(moreInfo).map(([title, description], idx) => {
                if (
                  title === "studios" ||
                  title === "producers" ||
                  title === "genres"
                )
                  return;
                return (
                  <AddionalInfo key={idx} title={title} desc={description} />
                );
              })}

              <span className="block h-px w-full bg-muted-foreground/50" />

              <div className="flex items-start gap-4">
                <p>Genres:</p>
                <div className="flex flex-wrap gap-1.5">
                  {moreInfo.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="flex h-7 items-center rounded-full border border-muted-foreground/30 px-3 text-xs"
                      style={{
                        color: COLORS[Number(idx) % COLORS.length],
                      }}
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <span className="block h-px w-full bg-muted-foreground/50" />

              <AddionalInfo title="Studios" desc={moreInfo.studios} />
              <AddionalInfo title="Producers" desc={moreInfo.producers} />
            </div>
          </div>
        </div>
      </section>
      <div className="wrapper-container flex flex-col gap-9 px-4 xl:flex-row">
        <div className="w-full py-10 xl:basis-[75%]">
          <HomeLayout heading="Recommended for you">
            <div className="mt-6 grid grid-cols-2 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {recommendedAnimes.map((anime) => (
                <AnimeCard key={anime.id} {...anime} />
              ))}
            </div>
          </HomeLayout>
        </div>

        <div className="space-y-6 py-10 xl:basis-[25%]">
          <h4 className="text-2xl font-medium text-secondary">Related Anime</h4>

          <div className="space-y-4 bg-primary-100 px-4 py-6">
            {relatedAnimes.slice(0, 6).map((anime) => (
              <div
                key={anime.id}
                className="flex w-full items-center gap-x-4 border-b border-white/10 pb-4 last:border-0"
              >
                <HoveredContent animeId={anime.id}>
                  <div className="relative h-[4.8rem] w-14 shrink-0">
                    <CustomImage
                      src={anime.poster}
                      alt={anime.name}
                      loading="lazy"
                      fill
                      className="overflow-hidden rounded-md object-cover"
                    />
                  </div>
                </HoveredContent>

                <div className="flex flex-col justify-center space-y-1.5">
                  <Link
                    href={`/${anime.id}`}
                    className="line-clamp-1 text-sm font-medium text-secondary-foreground hover:text-secondary"
                  >
                    {anime.name}
                  </Link>

                  <Badge episodes={anime.episodes} type={anime.type} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeInfo;
