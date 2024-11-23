import { SharedAnimeType } from "@/types/anime";
import { CaptionsIcon, ChevronRight, Mic } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GenreAnime({
  animes,
  title,
}: {
  animes: SharedAnimeType[];
  title: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-semibold text-primary">{title}</h2>
      {animes.map((anime) => (
        <>
          <div key={anime.id} className="flex w-full gap-3">
            <div className="relative h-32 w-20">
              <Image
                src={anime.poster}
                alt={anime.name}
                loading="lazy"
                fill
                objectFit="cover"
                className="shrink-0 overflow-hidden rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Link
                href={`/${anime.id}`}
                className="line-clamp-1 font-medium text-secondary-foreground hover:text-primary"
              >
                {anime.name}
              </Link>

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
        </>
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
