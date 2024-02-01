"use client";

import SearchPageLoading from "@/components/loaders/search-page-loading";
import AnimeCard from "@/components/shared/anime-card";
import AnimePagination from "@/components/shared/pagination";
import { Button } from "@/components/ui/button";
import { useGetAllAnime, useGetSearchedAnime } from "@/lib/query-api";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchPage = () => {
  const params = useSearchParams();
  const query = params.get("keyword");
  const page = Number(params.get("page")) || 1;

  const { data: genres, isLoading: isGenreLoading } = useGetAllAnime();
  const { data, isLoading, isError } = useGetSearchedAnime(query!, page);
  const [isActiveGenre, setIsActiveGenre] = useState<string>("")

  if (isGenreLoading && isLoading) return <SearchPageLoading />;

  if(isError) return (
    <p className="mt-24">
      Something happened! 🥲
    </p>
  )

  const handleClick = (genre: string) => {
    window.location.assign(`/genre/${genre}?page=1`)
  }
  return (
    <>
      <div className="h-full max-w-[1420px] pt-20 mx-auto flex w-full gap-x-4 mt-8 xl:px-0 px-4">
        <div className="flex-1 h-auto">
          <div className="w-full h-auto xl:py-10 p-6 border border-muted rounded-xl">
            <h1 className="mb-6 text-xl">Genre</h1>
            <div className="flex flex-wrap gap-2">
              {genres?.genres.map((genre) => {
                const isActive = isActiveGenre === genre;
                return(
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("bg-transparent text-xs", isActive && "bg-muted underline")}
                    key={genre}
                    onClick={() => setIsActiveGenre(genre.toLowerCase())}
                  >
                    {genre}
                  </Button>
                )
              })}
            </div>

            <Button
              className="mt-6 bg-[#FF003D] hover:bg-[#FF003D]/80 text-md w-40"
              size="sm"
              disabled={!isActiveGenre}
              onClick={() => handleClick(isActiveGenre)}
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
              <>
                <div className="grid lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
                  {data?.animes.map((anime) => (
                    <AnimeCard type="Normal" key={anime.id} anime={anime} />
                  ))}
                </div>
                <AnimePagination
                  paginate="Search"
                  totalPages={data?.totalPages!}
                  currentPage={data?.currentPage!}
                  hasNextPage={data?.hasNextPage!}
                  query={query!}
                  page={page}
                />
              </>
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
