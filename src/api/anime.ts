import { BASE_URL } from "@/lib/constants";
import {
  AnimeEpisodes,
  AnimeEpisodeServers,
  AnimeInfo,
  AnimeStreamingLinks,
  ApiResponse,
  HomePage,
  ScheduledAnimes,
  SharedAnimeType,
  Top10Animes,
  TopAiringAnime,
  TopUpcomingAnime,
} from "@/types/anime";
import axios from "axios";

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
        "Content-Type": "application/json",
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

/**
 * Fetch function to fetch the searched anime by its title or name.
 * @params query as String
 * @returns SearchAnimeResults[]
 */

interface SearchAnimeByName {
  keyword: string;
  page?: number;
  genres?: string;
  type?: string;
  sort?: string;
  season?: string;
  language?: string;
  status?: string;
  score?: string;
}
export const getSearchedAnimeByName = async ({
  keyword,
  page = 1,
  ...props
}: SearchAnimeByName) => {
  const { data } = await axios.get(BASE_URL() + `/search`, {
    params: {
      q: keyword,
      page,
      ...props,
    },
  });

  if (!data.success) {
    throw new Error("Something went wrong!");
  }

  return data.data as {
    animes: TopUpcomingAnime[];
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    mostPopularAnimes: SharedAnimeType[];
  };
};

export const getAnimeByCategories = async (category: string, page: number) => {
  const res = (await fetch(
    BASE_URL() + `/category/${category}?page=${page ?? 1}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((res) => res.json())) as ApiResponse<{
    category: string;
    animes: TopUpcomingAnime[];
    genres: string[];
    top10Animes: Top10Animes;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  }>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeByGenre = async (genre: string, page: number) => {
  const res = (await fetch(BASE_URL() + `/genre/${genre}?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())) as ApiResponse<{
    genreName: string;
    animes: TopUpcomingAnime[];
    genres: string[];
    topAiringAnimes: TopAiringAnime[];
    totalPages: number;
    hasNextPage: boolean;
    currentPage: number;
  }>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};
