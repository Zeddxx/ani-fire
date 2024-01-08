"use client";

import { Button } from "@/components/ui/button";
import { useGetAllAnime, useGetSearchedAnime } from "@/lib/query-api";
import { useSearchParams } from "next/navigation";
import AnimeCard from "@/components/shared/anime-card";

const SearchPage = () => {
  const params = useSearchParams();
  const query = params.get("keyword");
  console.log(query);

  const { data, isLoading, isError } = useGetSearchedAnime(query!, 1);
  const { data: genres, isLoading: isGenreLoading } = useGetAllAnime();

  if (isLoading && isGenreLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  console.log(data);

  return (
    <>
      <div className="h-full max-w-[1420px] mx-auto flex w-full gap-x-4 mt-8 xl:px-0 px-4">
        <div className="flex-1 h-auto">
          <div className="w-full h-auto xl:py-10 p-6 bg-stone-800 rounded-xl">
            <h1 className="mb-6 text-xl">Genre</h1>
            <div className="flex flex-wrap gap-2">
              {genres?.genres.map((genre) => (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  key={genre}
                >
                  {genre}
                </Button>
              ))}
            </div>

            <Button
              className="mt-6 bg-[#FF003D] hover:bg-[#FF003D]/80 text-md w-40"
              size="sm"
            >
              Filter
            </Button>
          </div>

          <div className="my-8 max-w-[1420px] w-full mx-auto">
            <h2 className="text-xl text-muted-foreground font-semibold">
              Search results for:{" "}
              <span className="italic text-[#FF003D]">{query}</span>
            </h2>
            {data?.animes.length! > 0 ? (
              <div className="grid lg:grid-cols-5 sm:grid-cols-4 grid-cols-3 my-6 gap-4 w-full">
                {data?.animes.map((anime) => (
                  <AnimeCard anime={anime} key={anime.id} />
                ))}
              </div>
            ) : (
              <div className="w-full my-8 h-auto">
                <h1 className="text-3xl text-center">
                  No such keyword found! 🫸
                </h1>
              </div>
            )}
          </div>
        </div>

        <aside className="max-w-xs w-full hidden xl:block bg-black"></aside>
      </div>
    </>
  );
};
export default SearchPage;
