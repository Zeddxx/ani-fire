"use client";

import { getAnimeEpisodesById } from "@/api/anime";
import { QUERY_KEY } from "@/lib/query-key";
import { LatestEpisodeAnimes } from "@/types/anime";
import { useQueries } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import HoveredContent from "./hovered-content";

export default function LatestEpisodes({
  animes,
}: {
  animes: LatestEpisodeAnimes[];
}) {
  const results = useQueries({
    queries: animes.map((anime) => ({
      queryKey: [QUERY_KEY.LATEST_ANIME_EPISODES, anime.id],
      queryFn: () => getAnimeEpisodesById(anime.id),
    })),
  });

  const getLatestEpisode = (idx: number) => {
    const episodes = results[idx].data?.episodes;
    if (!episodes?.length) return null;

    const episodeLength = episodes?.length;

    return episodes[episodeLength - 1];
  };

  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {animes.map(({ name, poster, id, episodes }, idx) => (
        <div key={id} className="flex flex-col gap-2">
          <HoveredContent
            animeId={id}
            to={`/watch/${getLatestEpisode(idx)?.episodeId}`}
          >
            <Link
              href={`/watch/${getLatestEpisode(idx)?.episodeId}`}
              className="relative aspect-[8/10] h-72 w-full overflow-hidden sm:aspect-[12/16]"
            >
              <Image
                src={poster}
                alt={`${name} poster`}
                fill
                priority
                className="h-full w-full object-cover [mask-image:linear-gradient(180deg,#fff,#fff,#fff,transparent)]"
              />
              <div className="absolute bottom-2 left-2">
                <Badge episodes={episodes} />
              </div>
            </Link>
          </HoveredContent>
          <Link
            href={`/watch/${getLatestEpisode(idx)?.episodeId}`}
            className="line-clamp-1 w-full text-sm hover:text-secondary"
          >
            {name}
          </Link>
        </div>
      ))}
    </div>
  );
}
