"use client";

import AnimeCarousel from "@/components/shared/anime-carousel";
import { Badge } from "@/components/ui/badge";
import { useGetAllAnime } from "@/lib/query-api";
import Image from "next/image";

const HomeSection = () => {
  const { data, isLoading } = useGetAllAnime();

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-4 h-full w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white">Home</h1>
        {/* <p className="text-white">watch list</p> */}
      </div>

      <AnimeCarousel trendingAnimes={data?.trendingAnimes!} />

      <div className="text-white my-4 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Latest Episodes</h1>
        </div>

        <div className="flex gap-x-4 h-full scroll-hidden my-2 overflow-x-scroll">
          {data?.latestEpisodeAnimes.map((anime) => {
            const hideAnime = anime.episodes.sub === null;

            if(hideAnime) return null;
            return(
              <a href={`/watch/${anime.id}`} className="w-40" key={anime.id}>
              <div className="w-full h-52 rounded-md overflow-hidden relative shrink-0">
                <Image
                  src={anime.poster}
                  alt={anime.id}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="truncate w-40 mt-1 text-white">{anime.name}</p>
              <Badge variant="secondary">
                Sub: {anime.episodes.sub || "0"}
              </Badge>
              <Badge variant="secondary" className="ml-1">
                Dub: {anime.episodes.dub || "0"}
              </Badge>
            </a>
            )
          })}
        </div>
      </div>
    </div>
  );
};
export default HomeSection;
