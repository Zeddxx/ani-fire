"use client";

import AnimeCarousel from "@/components/shared/anime-carousel";
import { useGetAllAnime } from "@/lib/query-api";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { buttonVariants } from "@/components/ui/button";
import AiringAnime from "@/components/airing-anime";
import { MdArrowForwardIos } from "react-icons/md";
import HomeLoading from "@/components/loaders/home-loading";
import ScheduleAnime from "@/components/shared/schedule-anime";
import RecentlyWatched from "@/components/shared/recently-watched";
import LatestAnimes from "@/components/shared/latest-animes";

const HomePage = () => {
  const { data, isLoading, isError } = useGetAllAnime();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [id, setId] = useState<string[]>([])

  useEffect(() => {
    if(data?.latestEpisodeAnimes) {
      const ids = data.latestEpisodeAnimes.map(anime => anime.id)
      setId(ids)
    }
  }, [data?.latestEpisodeAnimes])

  if (isLoading && !data) return <HomeLoading />;

  if (isError) return "error";

  return (
    <div className="max-w-screen-2xl mx-auto w-full">
      <div className="relative">
        <AnimeCarousel animes={data?.spotlightAnimes} />
      </div>

      <div className="w-full px-4 my-10">
        <h2 className="text-2xl text-primary font-semibold mb-6">Trending</h2>

        <div className="relative lg:pr-16">
          <ReactSimplyCarousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={6}
            itemsToScroll={1}
            swipeTreshold={100}
            forwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              className:
                "hidden lg:block z-10 absolute right-0 bottom-0 h-[49%]",
              children: (
                <span
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "h-full w-full",
                    })
                  )}
                >
                  <GrFormNext className="h-5 w-5" />
                </span>
              ),
            }}
            backwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              className: "hidden lg:block z-10 absolute right-0 top-0 h-[49%]",
              children: (
                <span
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "h-full w-full",
                    })
                  )}
                >
                  <GrFormPrevious className="h-5 w-5" />
                </span>
              ),
            }}
            responsiveProps={[
              {
                itemsToShow: 6,
                itemsToScroll: 3,
                minWidth: 768,
                maxWidth: 1536,
              },
              {
                itemsToShow: 1,
                itemsToScroll: 1,
                minWidth: 130,
                maxWidth: 320,
              },
              {
                itemsToShow: 3,
                itemsToScroll: 1,
                minWidth: 320,
                maxWidth: 512,
              },
              {
                itemsToShow: 4,
                itemsToScroll: 2,
                minWidth: 512,
                maxWidth: 768,
              },
            ]}
            speed={400}
            infinite={false}
            easing="ease-in-out"
          >
            {data?.trendingAnimes.map((anime, index) => {
              const animeRank = anime.rank ? anime.rank : "00";
              return (
                <div
                  title={anime.name}
                  className={cn(
                    "flex items-end w-auto relative pl-3",
                    index === 0 && "pl-0"
                  )}
                  key={anime.id}
                >
                  <p
                    className={cn(
                      "absolute top-0 z-10 bg-primary text-white grid place-items-center w-8 h-8 md:hidden",
                      index === 0 ? "left-0" : "left-3"
                    )}
                  >
                    {animeRank}
                  </p>
                  <div className="select-none hidden md:block">
                    <p
                      className={cn(
                        "veritcal-text dark:text-white text-secondary-foreground truncate h-52 text-sm font-medium pr-2 pl-2",
                        index === 0 && "pr-0"
                      )}
                    >
                      {anime.name}
                    </p>
                    <p className="text-end pr-3 text-xl dark:text-white text-secondary-foreground mt-4 leading-none font-semibold">
                      {Number(animeRank) < 10 ? "0" + animeRank : animeRank}
                    </p>
                  </div>

                  <a
                    href={`/${anime.id}`}
                    className="w-48 user-drag select-none flex-shrink-0 h-64 relative"
                  >
                    <img
                      src={anime.poster}
                      draggable="false"
                      alt="anime-name"
                      className="object-cover absolute pointer-events-none select-none h-full w-full"
                    />
                  </a>
                </div>
              );
            })}
          </ReactSimplyCarousel>
        </div>
      </div>

      {/* Recently watched! */}
      <RecentlyWatched />

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 h-auto">
        <AiringAnime anime={data!} />
      </div>

      <div className="mt-6 w-full px-4">
        <div className="flex justify-between items-center">
          <h6 className="text-2xl text-primary font-semibold">
            Latest Episode
          </h6>
          <p className="flex items-center text-xs gap-x-4">
            View more <MdArrowForwardIos className="h-3 w-3" />
          </p>
        </div>

        <LatestAnimes id={id} latestEpisodes={data?.latestEpisodeAnimes!} />
      </div>

      {/* Schedule anime here! */}
      <div className="px-4">
        <ScheduleAnime />
      </div>
    </div>
  );
};
export default HomePage;
