"use client";

import { getAnimeInfoByAnimeId } from "@/api/anime";

import { AddionalInfo } from "@/app/(main)/[animeId]/_components/additional-info";
import InfoActionRow from "@/app/(main)/[animeId]/_components/info-action-row";
import AnimeCard from "@/components/shared/anime-card";
import HoveredContent from "@/components/shared/hovered-content";
import HomeLayout from "@/components/shared/layouts/home-layout";
import OtherInfos from "@/components/shared/other-infos";
import AnimeInfoSkeleton from "@/components/skeleton/anime-info-skeleton";
import { Badge } from "@/components/ui/badge";
import { CustomImage } from "@/components/ui/image";
import Description from "@/components/ui/info/description";
import Separator from "@/components/ui/separator";
import { QUERY_KEY } from "@/lib/query-key";
import { generateRandomColor } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import PromotionVideos from "./_components/promotion-videos";
import VCActors from "./_components/vc-actors";

export default function Page({
  params,
}: {
  params: Promise<{ animeId: string }>;
}) {
  const { animeId } = use(params);

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.ANIME_INFO, animeId],
    queryFn: () => getAnimeInfoByAnimeId(animeId),
    enabled: !!animeId,
  });

  if (isLoading) return <AnimeInfoSkeleton />;

  if (isError || !data) {
    throw new Error("Invalid Anime ID!");
  }

  const {
    anime: {
      info: {
        name,
        poster,
        stats,
        description,
        charactersVoiceActors,
        promotionalVideos,
      },
      moreInfo,
    },
    recommendedAnimes,
    relatedAnimes,
    seasons,
  } = data;

  return (
    <>
      <section className="relative h-auto xl:mt-16">
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
                <h1 className="line-clamp-2 text-center text-3xl font-medium !leading-tight md:text-start xl:text-5xl">
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

              <div className="flex items-center gap-4">
                <p className="text-[13px] font-medium">Genres:</p>
                <div className="flex flex-wrap gap-1.5">
                  {moreInfo.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="flex h-7 items-center rounded-full border border-muted-foreground/30 px-3 text-xs"
                      style={{
                        color: generateRandomColor(idx),
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

      {/* VOICE ACTORS */}
      <>
        <VCActors characters={charactersVoiceActors} />
      </>

      {/* PROMOTION VIDEOS */}
      <>
        <PromotionVideos videos={promotionalVideos} />
      </>

      {(!!seasons.length as boolean) && (
        <div className="wrapper-container mt-12 w-full space-y-4 px-4">
          <HomeLayout heading="More Seasons">
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7 xl:grid-cols-5">
              {seasons.map((anime, idx) => (
                <Link
                  key={anime.id}
                  href={`/${anime.id}`}
                  data-current={anime.isCurrent as boolean}
                  className="relative grid h-16 w-full place-items-center overflow-hidden rounded-xl px-4 data-[current=true]:border-2 data-[current=true]:border-secondary"
                >
                  <Image
                    src={anime.poster}
                    alt={anime.name + idx}
                    fill
                    className="-z-10 h-full w-full object-cover blur-sm brightness-[.3]"
                  />
                  <h6
                    data-current={anime.isCurrent as boolean}
                    className="line-clamp-1 text-sm font-medium data-[current=true]:text-secondary"
                  >
                    {anime.title}
                  </h6>
                </Link>
              ))}
            </div>
          </HomeLayout>
        </div>
      )}
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
}
