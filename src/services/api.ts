import {
  AnimeEpisodes,
  AnimeEpisodeServers,
  AnimeInfo,
  AnimeStreamingLinks,
  HomePage,
  ScheduledAnimes,
  SharedAnimeType,
  Top10Animes,
  TopUpcomingAnime,
} from "@/types/anime";

async function fetchUrl<T>(url: string): Promise<T> {
  const res = (await fetch(url).then((res) => res.json())) as T;
  return res;
}

export async function getAnimeInfoById(id: string) {
  const data = await fetchUrl<AnimeInfo>(`/api/v1/anime?id=${id}`);
  return data;
}

export async function getAnimeHome() {
  const data = await fetchUrl<HomePage>("/api/v1/home");
  return data;
}

export async function getAnimeEpisodesById(id: string) {
  const data = await fetchUrl<AnimeEpisodes>(`/api/v1/episodes?id=${id}`);
  return data;
}

export async function getAnimeStreamingLinksByEpisodeId(episodeId: string) {
  const data = await fetchUrl<AnimeStreamingLinks>(
    `/api/v1/anime/sources?episodeId=${episodeId}`,
  );

  return data;
}

export async function getAnimeEpisodeServers(id: string) {
  const data = await fetchUrl<AnimeEpisodeServers>(
    `/api/v1/anime/episode/servers?id=${id}`,
  );
  return data;
}

export async function getAnimeScheduleByDate(date: string) {
  const animes = await fetchUrl<ScheduledAnimes>(
    `/api/v1/anime/schedule?date=${date}`,
  );

  return animes;
}

export async function getSearchedAnimeByName(keyword: string, page: number) {
  const animes = await fetchUrl<{
    animes: TopUpcomingAnime[];
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    mostPopularAnimes: SharedAnimeType[];
  }>(`/api/v1/anime/search?keyword=${keyword}&page=${page}`);

  return animes;
}

export async function getAnimeByCategories(category: string, page: number) {
  const animes = fetchUrl<{
    category: string;
    animes: TopUpcomingAnime[];
    genres: string[];
    top10Animes: Top10Animes;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  }>(`/api/v1/anime/category?slug=${category}&page=${page}`);

  return animes;
}
