import { SharedAnimeType } from "@/types/anime";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { CustomImage } from "../ui/image";
import HoveredContent from "./hovered-content";

export default function GenreAnime({
  animes,
  title,
}: {
  animes: SharedAnimeType[];
  title: string;
}) {
  const encodedTitle = title
    .replace(" ", "-")
    .toLowerCase()
    .replace("-anime", "");
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-medium text-secondary">{title}</h2>
      {animes.map((anime) => (
        <React.Fragment key={anime.id}>
          <div className="flex w-full gap-3">
            <HoveredContent animeId={anime.id}>
              <div className="relative h-[4.8rem] w-14 shrink-0">
                <CustomImage
                  src={anime.poster}
                  alt={anime.name}
                  priority
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

          <div className="h-px w-full bg-white/10" />
        </React.Fragment>
      ))}

      <Link
        href={`/category/${encodedTitle}`}
        className="flex w-fit items-center gap-1 text-sm text-white duration-200 hover:text-secondary"
      >
        View more <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
