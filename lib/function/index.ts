import {
  AnimeByCategoryTypes,
  AnimeByGenreTypes,
  AnimeInfoTypeProps,
  AnimeStreamingProp,
  GetAnimeEpisodes,
  GetAnimeServerEpisodes,
  HomeAnimeProps,
  SearchedAnimeProps,
} from "@/types";

const primaryUrl = process.env.NODE_ENV !== "production" ? "http://localhost:4000" : process.env.NEXT_PUBLIC_ANIME_URL;
const backupUrl = "https://api-aniwatch.onrender.com";

export async function getAllAnime() {
  try {
    const res = await fetch(`${primaryUrl}/anime/home`);

    if (res.status === 429) {
      const backupRes = await fetch(`${backupUrl}/anime/home`);
      const backupData = await backupRes.json();
      return backupData as HomeAnimeProps;
    }

    const data = await res.json();
    return data as HomeAnimeProps;
  } catch (error) {
    console.log(error);
  }
}

export async function getAnimeInfoById(id: string) {
  try {
    const res = await fetch(`${primaryUrl}/anime/info?id=${id}`);

    if (res.status === 429) {
      const backupRes = await fetch(`${backupUrl}/anime/info?id=${id}`);
      const backupData = await backupRes.json();
      return backupData as AnimeInfoTypeProps;
    }

    const data = await res.json();
    return data as AnimeInfoTypeProps;
  } catch (error: unknown) {
    console.log("Error getting anime info: ", error);
  }
}

export async function getAnimeEpisodes(id: string) {
  try {
    const res = await fetch(`${primaryUrl}/anime/episodes/${id}`);

    if (res.status === 429) {
      const backupRes = await fetch(`${backupUrl}/anime/episodes/${id}`);
      const backupData = await backupRes.json();
      return backupData as GetAnimeEpisodes;
    }

    const data = await res.json();
    return data as GetAnimeEpisodes;
  } catch (error) {
    console.log("Cannot get anime episodes: ", error);
  }
}

export async function getAnimeEpisodeServer(id: string) {
  try {
    const res = await fetch(`${primaryUrl}/anime/servers?episodeId=${id}`)
    if(res.status === 429) {
      const backupRes = await fetch(`${backupUrl}/anime/servers?episodeId=${id}`)
      const backupData = await backupRes.json()
      return backupData as GetAnimeServerEpisodes
    }

    const data = await res.json()
    return data as GetAnimeServerEpisodes
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

    if(res.status === 429) {
      const backupRes = await fetch(`${backupUrl}/anime/episode-srcs?id=${id}&server=${server}&category=${category}`)
      const backupData = await backupRes.json()
      return backupData as AnimeStreamingProp
    }
    const data = await res.json();
    return data as AnimeStreamingProp
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchedAnime(query: string, pageNo: number) {
  try {
    const res = await fetch(
      `${primaryUrl}/anime/search?q=${query}&page=${pageNo}`
    );

    if(res.status === 429) {
      const res = await fetch(`${backupUrl}/anime/search?q=${query}&page=${pageNo}`)
      const data = await res.json();
      return data as SearchedAnimeProps;
    }
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

    if(res.status === 429){
      const res = await fetch(`${backupUrl}/anime/genre`)
      const data = await res.json();
      return data;
    }
  const data = await res.json();
  return data;
  } catch (error) {
    console.log(error);
    throw Error;
  }
}


export async function getAnimeByCategory(category: string, page: number){
  try {
    const res = await fetch(`${primaryUrl}/anime/${category}?page=${page}`)

  if(res.status === 429){
    const res = await fetch(`${backupUrl}/anime/${category}?page=${page}`)
    const data = await res.json()
    return data as AnimeByCategoryTypes;
  }

  const data = await res.json()
  return data as AnimeByCategoryTypes;
  } catch (error) {
    console.log(error);
    throw Error
  }
}

export async function getAnimeByGenres(name: string, page: number) {
  try {
    const res = await fetch(`${primaryUrl}/anime/genre/${name}?page=${page}`)

    if(res.status === 429) {
      const res = await fetch(`${backupUrl}/anime/genre/${name}?page=${page}`)
      const data = await res.json()
      return data as AnimeByGenreTypes;
    }

    const data = await res.json()
    return data as AnimeByGenreTypes;
  } catch (error) {
    throw Error
  }
}

export async function getAnimeSchedules(date: string) {
  try {
    const res = await fetch(`${primaryUrl}/anime/schedule?date=${date}`)

    if(res.status === 429) {
      const res = await fetch(`${backupUrl}/anime/schedule?date=${date}`)
      const data = await res.json()
      return data
    }

    const data = await res.json()
    return data
  } catch (error) {
    throw Error;
  }
}