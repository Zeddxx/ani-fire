"use client";

// Api functions
import { getAnimeHomePage } from "@/api/anime";

// Shared Components imports
import GenreAnime from "@/components/shared/genre-anime";
import LatestEpisodes from "@/components/shared/latest-episodes";

// Utilities function imports
import { useQuery } from "@tanstack/react-query";

// Component Imports
import HomeLayout from "@/app/(main)/_components/shared/layout/home-layout";
import AnimeSpotlightCarousel from "@/app/(main)/home/_components/carousel/spotlight";
import TrendingCarousel from "@/app/(main)/home/_components/carousel/trending";
import ContinueWatching from "@/app/(main)/home/_components/continue-watching";
import Schedule from "@/app/(main)/home/_components/schedule";

export default function Home() {
  const { data: animes, isLoading } = useQuery({
    queryKey: ["ANIME_HOME_PAGE"],
    queryFn: () => getAnimeHomePage(),
    refetchOnMount: false,
  });

  // TODO: Adding a home skeleton
  if (isLoading) return <p>Is loading...</p>;

  // TODO: Error handleling
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
        {/* Most Favorite */}
        <GenreAnime title="Most Favorite" animes={mostFavoriteAnimes} />

        {/* Completed anime */}
        <GenreAnime title="Completed Anime" animes={latestCompletedAnimes} />

        {/* Most Popular */}
        <GenreAnime title="Most Popular" animes={mostPopularAnimes} />

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
