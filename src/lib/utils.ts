import { AnimeEpisodes, EpisodesDetails } from "@/types/anime";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEpisodeNavigation(
  animeEpisodes: AnimeEpisodes,
  currentId: string
) {
  const { episodes, totalEpisodes } = animeEpisodes;
  const currentIndex = episodes.findIndex((ep) => ep.episodeId === currentId);

  if (currentIndex !== -1) {
    const nextIndex = currentIndex + 1;
    const prevIndex = currentIndex - 1;

    const nextEpisodeId =
      nextIndex < totalEpisodes ? episodes[nextIndex].episodeId : false;
    const prevEpisodeId =
      prevIndex >= 0 ? episodes[prevIndex].episodeId : false;

    return {
      next: nextEpisodeId,
      prev: prevEpisodeId,
    };
  } else {
    return {
      next: false,
      prev: false,
    };
  }
}
