import { CommentSchema } from "@/lib/validation";
import {
  AnimeByCategoryTypes,
  AnimeByGenreTypes,
  AnimeInfoTypeProps,
  AnimeStreamingProp,
  GetAnimeEpisodes,
  GetAnimeServerEpisodes,
  HomeAnimeProps,
  ICommentsTypes,
  SearchedAnimeProps,
} from "@/types";
import { z } from "zod";
import { comment } from "@/actions/comment";
import { commentsCount, getComments } from "@/actions/get-comments";

const primaryUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000"
    : process.env.NEXT_PUBLIC_ANIME_URL;

export async function getAllAnime() {
  try {
    const res = await fetch(`${primaryUrl}/anime/home`);
    const data = await res.json();
    return data as HomeAnimeProps;
  } catch (error) {
    console.log(error);
  }
}

export async function getAnimeInfoById(id: string) {
  try {
    const res = await fetch(`${primaryUrl}/anime/info?id=${id}`);
    const data = await res.json();
    return data as AnimeInfoTypeProps;
  } catch (error: unknown) {
    console.log("Error getting anime info: ", error);
  }
}

export async function getAnimeEpisodes(id: string) {
  try {
    const res = await fetch(`${primaryUrl}/anime/episodes/${id}`);
    const data = await res.json();
    return data as GetAnimeEpisodes;
  } catch (error) {
    console.log("Cannot get anime episodes: ", error);
  }
}

export async function getAnimeEpisodeServer(id: string) {
  try {
    const res = await fetch(`${primaryUrl}/anime/servers?episodeId=${id}`);
    const data = await res.json();
    return data as GetAnimeServerEpisodes;
  } catch (error) {
    console.log(error);
  }
}

export async function getStreamEpisode(
  id: string,
  server: string,
  category: string
) {
  try {
    const res = await fetch(
      `${primaryUrl}/anime/episode-srcs?id=${id}&server=${server}&category=${category}`
    );

    const data = await res.json();
    return data as AnimeStreamingProp;
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchedAnime(query: string, pageNo: number) {
  try {
    const res = await fetch(
      `${primaryUrl}/anime/search?q=${query}&page=${pageNo}`
    );

    const data = await res.json();
    return data as SearchedAnimeProps;
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export async function getAllGenres() {
  try {
    const res = await fetch(`${primaryUrl}/anime/genre`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export async function getAnimeByCategory(category: string, page: number) {
  try {
    const res = await fetch(`${primaryUrl}/anime/${category}?page=${page}`);

    const data = await res.json();
    return data as AnimeByCategoryTypes;
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export async function getAnimeByGenres(name: string, page: number) {
  try {
    const res = await fetch(`${primaryUrl}/anime/genre/${name}?page=${page}`);

    const data = await res.json();
    return data as AnimeByGenreTypes;
  } catch (error) {
    throw Error;
  }
}

export async function getAnimeSchedules(date: string) {
  try {
    const res = await fetch(`${primaryUrl}/anime/schedule?date=${date}`);

    const data = await res.json();
    return data;
  } catch (error) {
    throw Error;
  }
}

/**
 * Getting the comments on particular animeId where:
 * @type { string } animeId
 * @description { anime id is important to find the particular comments on the unique}
 */

export async function getAnimeComments(animeId: string) {
  const comments = await getComments(animeId);
  return comments as ICommentsTypes[];
}

export async function postComment(values: z.infer<typeof CommentSchema>) {
  const res = await comment(values);
  return res.comment;
}

export async function getCommentsCount(animeId: string) {
  const counts = await commentsCount(animeId);
  return counts;
}
