'use client';

// useGetLatestAnimeLinks.ts
import { getAnimeEpisodes } from "@/lib/function";
import { Episode } from "@/types";
import { useEffect, useState } from "react";

export default function useGetLatestAnimeLinks(animeIds: string[]) {
  const [episodes, setEpisodes] = useState<Record<string, Episode | null> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = animeIds.map(async (animeId) => {
          const animeEpisodes = await getAnimeEpisodes(animeId);

          // Ensure episodes array is not empty
          if (animeEpisodes!.episodes.length > 0) {
            // Find the last episode
            const lastEpisode = animeEpisodes!.episodes[animeEpisodes!.episodes.length - 1];

            return { [animeId]: lastEpisode };
          }

          return null;
        });

        const animeLastEpisodes = await Promise.all(dataPromises);

        // Filter out potential null values
        const validLastEpisodes = animeLastEpisodes.filter((animeData) => animeData !== null);

        const episodesData: Record<string, Episode | null> = {};

        validLastEpisodes.forEach((animeData) => {
          const animeId = Object.keys(animeData!)[0];
          episodesData[animeId] = animeData![animeId];
        });

        setEpisodes(episodesData);
      } catch (error) {
        console.error("Error fetching anime episodes:", error);
      }
    };

    fetchData();
  }, [animeIds]);

  return {
    episodes,
  };
}
