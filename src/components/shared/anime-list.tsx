import HoveredContent from "@/components/shared/hovered-content";
import { Badge } from "@/components/ui/badge";
import { CustomImage } from "@/components/ui/image";
import {
  SharedAnimeType,
  Top10Animes as Top10AnimesTypes,
} from "@/types/anime";
import Link from "next/link";
import { useState } from "react";

const selectTypes = ["today", "week", "month"] as const;

interface BaseAnimeProps {
  heading: string;
}

type Top10AnimesProps = {
  animes: Top10AnimesTypes;
  type: "top10Animes";
} & BaseAnimeProps;

type RegularAnimesProps = {
  animes: SharedAnimeType[];
  type: "regular";
} & BaseAnimeProps;

type AnimeProps = Top10AnimesProps | RegularAnimesProps;

export default function AnimeLists({ animes, type, heading }: AnimeProps) {
  const [selectedType, setSelectedType] =
    useState<(typeof selectTypes)[number]>("today");

  if (type === "regular") {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full justify-between">
          <h3 className="text-2xl font-semibold text-secondary">{heading}</h3>
        </div>

        <div className="w-full bg-white/5 px-4 py-8">
          <div className="flex flex-col gap-6">
            {animes.map((anime) => (
              <div key={anime.id} className="flex w-full items-center gap-4">
                <div className="flex w-full grow gap-4">
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

                  <div className="flex w-full flex-col justify-center space-y-1.5 border-b border-white/10 py-4">
                    <Link
                      href={`/${anime.id}`}
                      className="line-clamp-1 text-sm font-medium text-secondary-foreground hover:text-secondary"
                    >
                      {anime.name}
                    </Link>

                    <Badge episodes={anime.episodes} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-between">
        <h3 className="text-2xl font-semibold text-secondary">Top 10</h3>

        <div className="flex overflow-hidden rounded bg-white/5">
          {selectTypes.map((type) => (
            <button
              key={type}
              data-active={type === selectedType}
              className="px-3.5 py-1 text-xs capitalize text-white data-[active=true]:bg-secondary data-[active=true]:font-medium data-[active=true]:text-black"
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full bg-white/5 px-4 py-8">
        <div className="flex flex-col gap-6">
          {animes[selectedType].map((anime) => (
            <div key={anime.id} className="flex w-full items-center gap-4">
              <p className="relative flex w-8 items-center justify-center py-1.5 text-center text-xl font-semibold text-white before:absolute before:bottom-0 before:h-1 before:w-full before:bg-secondary">
                {Number(anime.rank) > 9 ? anime.rank : `0${anime.rank}`}
              </p>
              <div className="flex w-full grow gap-4">
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

                <div className="flex w-full flex-col justify-center space-y-1.5 border-b border-white/10 py-4">
                  <Link
                    href={`/${anime.id}`}
                    className="line-clamp-1 text-sm font-medium text-secondary-foreground hover:text-secondary"
                  >
                    {anime.name}
                  </Link>

                  <Badge episodes={anime.episodes} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
