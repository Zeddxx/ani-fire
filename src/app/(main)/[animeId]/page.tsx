"use client";

import { getAnimeInfoByAnimeId } from "@/api/anime";
import { AddionalInfo } from "@/components/main/info/additional-info";
import InfoActionRow from "@/components/main/info/info-action-row";
import OtherInfos from "@/components/main/other-infos";
import Description from "@/components/ui/info/description";
import Separator from "@/components/ui/separator";
import { COLORS } from "@/lib/constants";
import { QUERY_KEY } from "@/lib/query-key";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

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
  } = data;

  return (
    <section className="relative mt-16 h-auto">
      <div className="absolute -z-10 h-full w-full overflow-hidden brightness-50">
        <Image
          src={poster}
          alt={name}
          fill
          objectFit="cover"
          className="absolute opacity-55 blur-md grayscale"
        />
      </div>
      <div className="z-20 mx-auto flex w-full max-w-screen-3xl flex-col gap-8 px-4 xl:flex-row xl:pl-24">
        <div className="flex flex-col gap-x-16 gap-y-6 py-16 sm:py-32 lg:flex-row xl:basis-[70%]">
          <div className="relative mx-auto aspect-anime-image h-72 w-48 shrink-0 overflow-hidden rounded shadow">
            <Image
              draggable={false}
              src={poster}
              alt={name}
              fill
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex w-full flex-col items-center gap-6 lg:items-start">
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

        <div className="flex items-center bg-white/5 p-6 backdrop-blur-xl xl:basis-[30%]">
          <div className="w-full space-y-4">
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

      <div className="wrapper-container grid grid-cols-7 gap-4 px-4"></div>
    </section>
  );
};

export default AnimeInfo;
