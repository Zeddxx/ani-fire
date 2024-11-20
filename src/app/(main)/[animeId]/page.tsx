"use client";

import { getAnimeInfoByAnimeId } from "@/api/anime";
import { AddionalInfo } from "@/components/main/anime-info/additional-info";
import InfoActionRow from "@/components/main/anime-info/info-action-row";
import OtherInfos from "@/components/main/other-infos";
import Separator from "@/components/ui/separator";
import { COLORS } from "@/constants";
import { QUERY_KEY } from "@/constants/query-key";
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
    recommendedAnimes
  } = data;

  return (
    <section className="relative">
      <div className="absolute -z-10 w-full h-full brightness-50 blur-xl max-h-[1200px]">
        <Image
          src={poster}
          alt={name}
          fill
          objectFit="cover"
          className="absolute -z-10 ![mask-image:linear-gradient(to_top,transparent,white)]"
        />
      </div>
      <div className="max-w-screen-2xl w-full mx-auto flex xl:flex-row flex-col px-4 gap-8">
        <div className="xl:basis-[70%] sm:py-32 py-16 flex lg:flex-row flex-col gap-8">
          <div className="relative aspect-anime-image h-72 w-48 shrink-0 mx-auto rounded overflow-hidden shadow">
            <Image
              draggable={false}
              src={poster}
              alt={name}
              fill
              className="h-full w-full object-cover"
            />
          </div>

          <div className="w-full flex flex-col gap-6 lg:items-start items-center">
            <div className="xl:flex hidden items-center text-muted-foreground font-normal text-sm gap-2 w-full">
              <p className="">Home</p>
              <Separator type="dot" />
              <p>{stats.type}</p>
              <Separator type="dot" />
              <p className="text-white/50">{name}</p>
            </div>

            <div className="">
              <h1 className="xl:text-5xl text-3xl lg:text-start text-center font-semibold line-clamp-2">
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

            <div className="">
              <p className="line-clamp-4 text-sm">{description}</p>
            </div>
          </div>
        </div>

        <div className="xl:basis-[30%] bg-secondary/10 backdrop-blur-xl p-6 flex items-center">
          <div className="space-y-4 w-full">
            {Object.entries(moreInfo).map(([title, description], idx) => {
              if (title === "studios" || title === "producers") return;
              return (
                <AddionalInfo key={idx} title={title} desc={description} />
              );
            })}

            <span className="block w-full h-px bg-muted-foreground/50" />

            <div className="flex items-start gap-4">
              <p>Genres:</p>
              <div className="flex gap-1.5 flex-wrap">
                {moreInfo.genres.map((genre, idx) => (
                  <span
                    key={idx}
                    className="h-7 rounded-full flex items-center px-3 border border-muted-foreground/30 text-xs"
                    style={{
                      color: COLORS[Number(idx) % COLORS.length],
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <span className="block w-full h-px bg-muted-foreground/50" />

            <AddionalInfo title="Studios" desc={moreInfo.studios} />
            <AddionalInfo title="Producers" desc={moreInfo.producers} />
          </div>
        </div>
      </div>

      <div className="wrapper-container px-4 grid grid-cols-7 gap-4">
        
      </div>
    </section>
  );
};

export default AnimeInfo;
