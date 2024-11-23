import { BASE_URL } from "@/lib/constants";
import {
  AnimeEpisodes,
  AnimeEpisodeServers,
  AnimeInfo,
  AnimeStreamingLinks,
  ApiResponse,
  HomePage,
  ScheduledAnimes,
} from "@/types/anime";

export const getAnimeHomePage = async (): Promise<HomePage> => {
  const res = (await fetch(BASE_URL() + "/home").then((res) =>
    res.json(),
  )) as ApiResponse<HomePage>;
  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeInfoByAnimeId = async (animeId: string) => {
  const res = (await fetch(BASE_URL() + "/anime/" + animeId).then((res) =>
    res.json(),
  )) as ApiResponse<AnimeInfo>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeEpisodesById = async (
  animeId: string,
): Promise<AnimeEpisodes> => {
  const res = (await fetch(BASE_URL() + "/anime/" + animeId + "/episodes").then(
    (res) => res.json(),
  )) as ApiResponse<AnimeEpisodes>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeStreamingLinksByEpisodeId = async (
  episodeId: string,
): Promise<AnimeStreamingLinks> => {
  const res = (await fetch(
    BASE_URL() + "/episode/sources?animeEpisodeId=" + episodeId,
    {
      headers: {
        "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
      },
    },
  ).then((res) => res.json())) as ApiResponse<AnimeStreamingLinks>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeEpisodeServers = async (
  episodeId: string,
): Promise<AnimeEpisodeServers> => {
  const res = (await fetch(
    BASE_URL() + "/episode/servers?animeEpisodeId=" + episodeId,
  ).then((res) => res.json())) as ApiResponse<AnimeEpisodeServers>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

/**
 * API function to fetch the estimated schedule of anime by dates in format: 'YYYY-MM-DD'
 * @return Array<ScheduleAnimes>
 */
export const getAnimeScheduleByDate = async (date: string) => {
  const res = (await fetch(BASE_URL() + `/schedule?date=${date}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())) as ApiResponse<ScheduledAnimes>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};
