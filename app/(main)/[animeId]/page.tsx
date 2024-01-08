"use client";

import AnimeCard from "@/components/shared/anime-card";
import { useGetAnimeEpisodes, useGetAnimeInfo } from "@/lib/query-api";
import Image from "next/image";

import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimeInfo from "@/components/anime-info";

const AnimePage = ({ params }: { params: { animeId: string } }) => {
  const { data, isLoading, isError } = useGetAnimeInfo(params.animeId);
  const { data: episode } = useGetAnimeEpisodes(params.animeId);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error..</p>;

  console.log({ data, episode });

  const description = data?.anime.info.description || "";

  return (
    <section className="relative h-auto">
      <div className="absolute w-full h-full -z-10">
        <Image
          src={data?.anime.info.poster!}
          alt="anime poster"
          fill
          className="h-full w-full opacity-20 blur-lg object-cover"
        />
      </div>
      {/* Anime general information */}
      <AnimeInfo data={data!} description={description} episode={episode!} />

        <div className="flex max-w-[1420px] mx-auto w-full xl:px-0 px-4 gap-3 flex-wrap">
            {data?.seasons.map((season) => (
              <a href={`/${season.id}`} className={cn("relative px-2 h-[30vw] max-h-[4rem] min-h-[1rem] py-2 w-[30vw] max-w-[6rem] sm:max-w-[12rem] min-w-[8rem] overflow-hidden bg-dotted-pattern bg-contain flex items-center rounded-lg", season.isCurrent && "outline outline-rose-600 text-rose-100")} key={season.id}>
                <Image src={season.poster} alt="season poster" fill className="h-full blur-md w-full -z-10 opacity-60 object-cover" />
                <p className="text-xs font-medium h-auto w-full z-20 text-center leading-4">{season.name.length > 30 ? season.name.slice(0, 30) + "..." : season.name}</p>
              </a>
            ))}
        </div>
      <div className="max-w-[1420px] flex xl:flex-row flex-col gap-x-4 xl:px-0 px-4 mx-auto w-full my-10 h-auto">
        <div className="w-full h-auto">
          <h3 className="text-2xl font-semibold">Recommanded Animes</h3>
          <div className="grid lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 my-6 gap-4 w-full">
            {data?.recommendedAnimes.map((anime) => (
              <AnimeCard anime={anime} key={anime.id} />
            ))}
          </div>
        </div>

        <div className="xl:max-w-xs w-full my-4">
          <h4 className="text-2xl">Related Animes</h4>
          <div className="w-full p-6 bg-stone-950 flex flex-col gap-6 rounded-2xl">
            {data?.relatedAnimes.map((anime) => (
              <div className="w-full h-auto" key={anime.id}>
                <div className="flex justify-between px-3">
                  <div className="flex gap-x-6">
                    <div className="rounded-xl flex-shrink-0 overflow-hidden relative h-28 w-20">
                    <Image
                      src={anime.poster}
                      alt="anime poster"
                      fill
                      className="h-full w-full object-cover"
                    />
                    </div>
                    <div className="flex-shrink-0 flex-1 xl:text-sm text-wrap">
                      <h5>{anime.name}</h5>
                      <div className="flex rounded-xl h-5 mt-2 items-center overflow-hidden text-xs">
                        <p className="bg-rose-600 text-xs px-2 py-1 font-bold">
                          CC: {anime.episodes.sub || 0}
                        </p>
                        <p className="text-xs flex bg-black px-2 items-center gap-x-1">
                          <Mic className="h-4 w-4" />
                          {anime.episodes.dub || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default AnimePage;
