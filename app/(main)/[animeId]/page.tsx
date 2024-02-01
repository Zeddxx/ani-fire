"use client";

import AnimeCard from "@/components/shared/anime-card";
import { useGetAnimeEpisodes, useGetAnimeInfo } from "@/lib/query-api";
import { FaClosedCaptioning } from "react-icons/fa";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimeInfo from "@/components/anime-info";
import { Separator } from "@/components/ui/separator";
import AnimeInfoLoading from "@/components/loaders/anime-info-loader";

const AnimePage = ({ params }: { params: { animeId: string } }) => {
  const { data, isLoading, isError } = useGetAnimeInfo(params.animeId);
  const { data: episode } = useGetAnimeEpisodes(params.animeId);

  if (isLoading) return <AnimeInfoLoading />;

  if (isError) return <p>Error..</p>;

  const description = data?.anime.info.description || "";
  return (
    <section className="relative h-auto">
      <div className="absolute w-full h-full -z-10">
        <img
          src={data?.anime.info.poster!}
          alt="anime poster"
          loading="lazy"
          className="h-full w-full opacity-20 blur-lg object-cover"
        />
      </div>
      {/* Anime general information */}
      <AnimeInfo page="AnimePage" data={data!} description={description} episode={episode!} />

      <div className="flex max-w-screen-2xl mx-auto w-full xl:px-0 px-4 gap-3 flex-wrap">
        {data?.seasons.map((season, index) => (
          <a
            href={`/${season.id}`}
            className={cn(
              "relative px-2 h-[30vw] max-h-[4rem] min-h-[1rem] py-2 w-[30vw] max-w-[6rem] sm:max-w-[12rem] min-w-[8rem] overflow-hidden bg-dotted-pattern bg-contain flex items-center rounded-lg",
              season.isCurrent && "outline outline-rose-600 text-rose-100"
            )}
            key={season.id + index}
          >
            <img
              src={season.poster}
              alt="season poster"
              loading="lazy"
              className="h-full blur-md w-full absolute -z-10 opacity-60 object-cover"
            />
            <p className="text-xs font-medium h-auto w-full z-20 text-center leading-4">
              {season.name.length > 30
                ? season.name.slice(0, 30) + "..."
                : season.name}
            </p>
          </a>
        ))}
      </div>
      <div className="max-w-screen-2xl flex xl:flex-row flex-col gap-x-4 px-4 mx-auto w-full my-10 h-auto">
        <div className="w-full h-auto">
          <h3 className="text-2xl font-semibold">Recommanded Animes</h3>
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
            {data?.recommendedAnimes.map((anime, index) => (
              <AnimeCard type="Normal" anime={anime} key={anime.id + index} />
            ))}
          </div>
        </div>

        <div className="xl:max-w-xs w-full">
          <h4 className="text-2xl mb-5 text-primary font-semibold">Related Animes ☺️</h4>
          <div className="w-full py-6 px-2 bg-slate-100 dark:bg-stone-950 border border-muted flex flex-col">
            {data?.relatedAnimes.slice(0, 6).map((anime, index) => (
              <div className="w-full h-auto" key={anime.id + index}>
                <div className="flex justify-between px-3">
                  <div className="flex gap-x-6">
                    <div className="rounded-md flex-shrink-0 overflow-hidden relative h-28 w-20">
                      <img
                        src={anime.poster}
                        alt="anime poster"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-shrink-0 flex-1 xl:text-sm text-wrap">
                      <a href={`/${anime.id}`} className="w-fit hover:text-primary">
                      <h5 className="text-sm font-semibold leading-tight">
                        👉 {anime.name}
                      </h5>
                      </a>
                      <div className="flex h-5 mt-2 items-center border w-fit pr-2 overflow-hidden text-xs">
                        <p className="bg-rose-600 dark:text-black text-white flex items-center text-xs px-2 py-1 font-normal">
                          <span><FaClosedCaptioning size={17} className="mr-1" /></span> {anime.episodes.sub || 0}
                        </p>
                        <p className="text-xs flex dark:bg-black px-2 items-center gap-x-1">
                          <Mic className="h-4 w-4" />
                          {anime.episodes.dub || 0}
                        </p>

                        <span className="h-1 w-1 flex rounded-full mr-2 bg-muted-foreground"></span>

                        <p>{anime.type}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator
                  className={cn(
                    "my-5",
                    index === data.relatedAnimes.length - 1 && "hidden"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default AnimePage;
