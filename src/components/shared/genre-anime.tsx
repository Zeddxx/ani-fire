import { SharedAnimeType } from "@/types/anime";
import { CaptionsIcon, ChevronRight, Mic } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CustomImage } from "../ui/image";
import HoveredContent from "./hovered-content";

export default function GenreAnime({
  animes,
  title,
}: {
  animes: SharedAnimeType[];
  title: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      {animes.map((anime) => (
        <React.Fragment key={anime.id}>
          <div className="flex w-full gap-3">
            <HoveredContent animeId={anime.id}>
              <div className="relative h-28 w-20 shrink-0">
                <CustomImage
                  src={anime.poster}
                  alt={anime.name}
                  loading="lazy"
                  fill
                  className="overflow-hidden rounded-md object-cover"
                />
              </div>
            </HoveredContent>

            <div className="space-y-2">
              <HoveredContent animeId={anime.id}>
                <Link
                  href={`/${anime.id}`}
                  className="line-clamp-1 font-medium text-secondary-foreground hover:text-primary"
                >
                  {anime.name}
                </Link>
              </HoveredContent>

              <div className="flex h-6 w-fit items-center gap-px overflow-hidden rounded-md text-xs">
                <span className="flex h-full items-center gap-1 bg-primary px-2 text-white">
                  <CaptionsIcon className="h-5 w-5" /> {anime.episodes.sub}
                </span>
                <span className="flex h-full items-center gap-1 bg-secondary px-2 text-white">
                  <Mic className="h-4 w-4" /> {anime.episodes.dub ?? 0}
                </span>
                <span className="flex h-full items-center gap-1 bg-secondary px-2 text-white">
                  {anime.type}
                </span>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-muted" />
        </React.Fragment>
      ))}

      <Link
        href={`/`}
        className="flex w-fit items-center gap-1 text-sm text-muted-foreground"
      >
        Show more <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
