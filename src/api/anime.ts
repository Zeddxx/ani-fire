import { BASE_URL } from "@/lib/constants";
import {
  AnimeEpisodes,
  AnimeEpisodeServers,
  AnimeInfo,
  AnimeStreamingLinks,
  ApiResponse,
  HomePage,
} from "@/types/anime";

export const getAnimeHomePage = async (): Promise<HomePage> => {
  const res = (await fetch(BASE_URL + "/home").then((res) =>
    res.json()
  )) as ApiResponse<HomePage>;
  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeInfoByAnimeId = async (animeId: string) => {
  const res = (await fetch(BASE_URL + "/anime/" + animeId).then((res) =>
    res.json()
  )) as ApiResponse<AnimeInfo>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeEpisodesById = async (
  animeId: string
): Promise<AnimeEpisodes> => {
  const res = (await fetch(BASE_URL + "/anime/" + animeId + "/episodes").then(
    (res) => res.json()
  )) as ApiResponse<AnimeEpisodes>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeStreamingLinksByEpisodeId = async (
  episodeId: string
): Promise<AnimeStreamingLinks> => {
  const res = (await fetch(
    BASE_URL + "/episode/sources?animeEpisodeId=" + episodeId
  ).then((res) => res.json())) as ApiResponse<AnimeStreamingLinks>;

  if (!res.success) {
    throw new Error(res.message);
  }

  return res.data;
};

export const getAnimeEpisodeServers = async (episodeId: string): Promise<AnimeEpisodeServers> => {
  const res = (await fetch(
    BASE_URL + "/episode/servers?animeEpisodeId=" + episodeId
  ).then((res) => res.json())) as ApiResponse<AnimeEpisodeServers>;

  if(!res.success) {
    throw new Error (res.message)
  }

  return res.data;
}