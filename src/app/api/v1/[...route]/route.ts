import {
  fetchAnimeByCategories,
  fetchAnimeEpisodesById,
  fetchAnimeEpisodeServers,
  fetchAnimeInfoByAnimeId,
  fetchAnimeScheduleByDate,
  fetchAnimeStreamingLinksByEpisodeId,
  fetchSearchedAnimeByName,
  getAnimeHomePage,
} from "@/app/api/v1/controller/anime";
import { QUERY_KEY } from "@/lib/query-key";
import { createRoutePath, generateUniqueKey } from "@/lib/utils";
import { storeOrGetFromRedis } from "@/redis";
import {
  AnimeEpisodes,
  AnimeInfo,
  AnimeStreamingLinks,
  HomePage,
} from "@/types/anime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ route: string[] }> },
) {
  const route = (await params).route;
  const searchParams = req.nextUrl.searchParams;

  const pathname = createRoutePath(route);

  switch (pathname) {
    // fetch anime homepage...
    case "/home": {
      const data = await storeOrGetFromRedis<HomePage>(
        QUERY_KEY.ANIME_HOME_PAGE,
        getAnimeHomePage,
      );
      return NextResponse.json(data, { status: 200 });
    }

    // fetch anime info...
    case "/anime": {
      const animeId = searchParams.get("id");

      if (!animeId) {
        return NextResponse.json({ message: "Invalid Id!" }, { status: 500 });
      }

      const animeInfo = await storeOrGetFromRedis<AnimeInfo>(
        generateUniqueKey(QUERY_KEY.ANIME_INFO, animeId),
        async () => await fetchAnimeInfoByAnimeId(animeId),
        2.628e6, // 1month
      );
      return NextResponse.json(animeInfo, { status: 200 });
    }

    case "/episodes": {
      const animeId = searchParams.get("id");

      if (!animeId) {
        return NextResponse.json({ message: "Invalid Id!" }, { status: 500 });
      }

      const animeEpisodes = await storeOrGetFromRedis<AnimeEpisodes>(
        generateUniqueKey(QUERY_KEY.ANIME_EPISODES_BY_ID, animeId),
        async () => fetchAnimeEpisodesById(animeId),
        7200, // 2hours
      );

      return NextResponse.json(animeEpisodes, { status: 200 });
    }

    // anime streaming links
    case "/anime/sources": {
      const episodeId = searchParams.get("episodeId");
      const category = searchParams.get("category");
      const server = searchParams.get("server");

      const constructedId = `${episodeId}&category=${category}&server=${server}`;

      if (!episodeId) {
        return NextResponse.json(
          { message: "Invalid Episode ID!" },
          { status: 500 },
        );
      }

      const response = await storeOrGetFromRedis<AnimeStreamingLinks>(
        generateUniqueKey(
          QUERY_KEY.WATCH_ANIME_BY_EPISODE_ID,
          `${episodeId}:${category}:${server}`,
        ),
        async () => fetchAnimeStreamingLinksByEpisodeId(constructedId),
        1.296e6, // 15d
      );

      return NextResponse.json(response, { status: 200 });
    }
    case "/anime/episode/servers": {
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({ message: "Invalid Id!" }, { status: 500 });
      }

      const servers = await storeOrGetFromRedis(
        generateUniqueKey(QUERY_KEY.ANIME_EPISODE_SERVERS, id),
        async () => await fetchAnimeEpisodeServers(id),
        1.296e6, // 15d
      );

      return NextResponse.json(servers, { status: 200 });
    }
    case "/anime/schedule": {
      const date = searchParams.get("date");

      if (!date) {
        return NextResponse.json(
          { message: "Date is required!" },
          { status: 500 },
        );
      }

      const scheduledAnime = await storeOrGetFromRedis(
        generateUniqueKey(QUERY_KEY.UPCOMING_SCHEDULE, date),
        async () => await fetchAnimeScheduleByDate(date),
        86400, // 1d
      );

      return NextResponse.json(scheduledAnime, { status: 200 });
    }
    case "/anime/search": {
      const keyword = searchParams.get("keyword");
      const page = searchParams.get("page");

      if (!keyword) {
        return NextResponse.json(
          { message: "Searced keyword is required!" },
          { status: 500 },
        );
      }

      const searchedAnimes = await storeOrGetFromRedis(
        generateUniqueKey(QUERY_KEY.SEARCHED_ANIMES, keyword) + `:PAGE-${page}`,
        async () =>
          fetchSearchedAnimeByName({
            keyword,
            page: Number(page),
          }),
        604800, //1week
      );

      return NextResponse.json(searchedAnimes, { status: 200 });
    }
    case "/anime/category": {
      const slug = searchParams.get("slug");
      const page = searchParams.get("page");

      if (!slug) {
        return NextResponse.json(
          { message: "Slug is required!" },
          { status: 500 },
        );
      }

      const animes = await storeOrGetFromRedis(
        generateUniqueKey(QUERY_KEY.CATEGORY, slug) + `:PAGE-${page}`,
        async () => fetchAnimeByCategories(slug, Number(page)),
        2.628e6, // 1month
      );

      return NextResponse.json(animes, { status: 200 });
    }

    default:
      return NextResponse.json({ message: "Unknown route" });
  }
}
