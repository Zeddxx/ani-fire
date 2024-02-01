'use client';

import { Episode, LatestAnimeProps } from "@/types"
import AnimeCard from "./anime-card"
import useGetLatestAnimeLinks from "@/hooks/useGetLatestLink";
import { useEffect, useState } from "react";

const LatestAnimes = ({ latestEpisodes, id } :{ latestEpisodes: LatestAnimeProps[], id: string[] }) => {
  const { episodes } = useGetLatestAnimeLinks(id)
  const [lastEpisodeArray, setLastEpisodeArray] = useState<Episode[]>([]);

  useEffect(() => {
    // Check if episodes are available and log the last episode details
    if(episodes) {
        const lastEpisodes: Episode[] = [];

        id.forEach((animeId) => {
            if (episodes[animeId]) {
                lastEpisodes.push(episodes[animeId]!);
                // You can access lastEpisode properties such as lastEpisode.episodeId, lastEpisode.isFiller, etc.
              }
        })

        setLastEpisodeArray(lastEpisodes)
    }
  }, [episodes, id]);

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
          {latestEpisodes.map((anime, index) => {
            const lastEpisode = lastEpisodeArray[index]?.episodeId;

            return(
              <AnimeCard type="Latest" latestLink={lastEpisode} key={anime.id} anime={anime} />
            )
          })}
        </div>
  )
}
export default LatestAnimes