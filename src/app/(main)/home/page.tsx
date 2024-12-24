"use client";

import { getAnimeHomePage } from "@/api/anime";
import AnimeSpotlightCarousel from "@/components/main/carousel/anime-spotlight-carousel";
import TrendingCarousel from "@/components/main/carousel/trending-carousel";
import ContinueWatching from "@/components/main/continue-watching";
import HomeLayout from "@/components/main/layout/home-layout";
import Schedule from "@/components/main/schedule";
import GenreAnime from "@/components/shared/genre-anime";
import LatestEpisodes from "@/components/shared/latest-episodes";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: animes, isLoading } = useQuery({
    queryKey: ["ANIME_HOME_PAGE"],
    queryFn: () => getAnimeHomePage(),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Is loading...</p>;

  if (!animes) return <p>Something went wrong!</p>;

  const {
    spotlightAnimes,
    trendingAnimes,
    latestCompletedAnimes,
    mostPopularAnimes,
    mostFavoriteAnimes,
    topAiringAnimes,
    latestEpisodeAnimes,
  } = animes;

  return (
    <div className="h-auto w-full">
      <div className="">
        <AnimeSpotlightCarousel spotlightAnimes={spotlightAnimes} />
      </div>

      <div className="wrapper-container my-6 px-4">
        <HomeLayout heading="Trending">
          <TrendingCarousel animes={trendingAnimes} />
        </HomeLayout>
      </div>

      {/* Latest watching */}
      <div className="">
        <HomeLayout>
          <ContinueWatching />
        </HomeLayout>
      </div>

      <div className="wrapper-container my-8 grid w-full grid-cols-1 gap-6 px-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Completed anime */}
        <GenreAnime title="Completed Anime" animes={latestCompletedAnimes} />

        {/* Most Popular */}
        <GenreAnime title="Most Popular" animes={mostPopularAnimes} />

        {/* Most Favorite */}
        <GenreAnime title="Most Favorite" animes={mostFavoriteAnimes} />

        {/* Top Airing */}
        <GenreAnime title="Top Airing" animes={topAiringAnimes.slice(0, 5)} />
      </div>

      <div className="wrapper-container space-y-6 px-4">
        <HomeLayout heading="Latest Episode">
          <LatestEpisodes animes={latestEpisodeAnimes} />
        </HomeLayout>
      </div>

      <div className="wrapper-container my-8 px-4">
        <HomeLayout>
          <Schedule />
        </HomeLayout>
      </div>
    </div>
  );
}
