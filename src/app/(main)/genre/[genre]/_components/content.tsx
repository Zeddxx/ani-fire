"use client";

import { getAnimeByGenre } from "@/app/api/v1/controller/anime";
import AnimeCard from "@/components/shared/anime-card";
import AnimeLists from "@/components/shared/anime-list";
import HomeLayout from "@/components/shared/layouts/home-layout";
import CategorySkeleton from "@/components/skeleton/category-skeleton";
import usePagination from "@/hooks/use-pagination";
import { GENRES } from "@/lib/constants";
import { generateRandomColor } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function Content({ genre }: { genre: string }) {
  const [showAllGenre, setShowAllGenre] = useState<boolean>(false);

  const [currentPage] = useQueryState("page", {
    clearOnDefault: true,
    defaultValue: 1,
    parse: Number,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["ANIME_GENRE", genre, currentPage],
    queryFn: () => {
      return getAnimeByGenre(genre, currentPage);
    },
  });

  const pages = usePagination({
    currentPage: data?.currentPage as number,
    totalPages: data?.totalPages as number,
    hasNextPage: data?.hasNextPage as boolean,
  });

  if (isLoading) {
    return <CategorySkeleton category={`Genre: ${genre}`} />;
  }

  return (
    <>
      <div className="xl:basis-[75%]">
        <HomeLayout heading={`Genre:`} italic={genre}>
          <div className="mt-6 grid grid-cols-2 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
            {data?.animes.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        </HomeLayout>

        <div className="mx-auto my-10 flex w-fit items-center gap-2">
          {currentPage !== 1 && (
            <>
              <Link
                href={`/genre/${genre}`}
                className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 hover:text-secondary"
              >
                <MdKeyboardDoubleArrowLeft className="h-3 w-3" />
              </Link>
              <Link
                href={`/genre/${genre}?page=${currentPage - 1}`}
                className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 hover:text-secondary"
              >
                <MdKeyboardArrowLeft className="h-3 w-3" />
              </Link>
            </>
          )}
          {pages.map((page) => (
            <Link
              href={`/genre/${genre}?page=${page}`}
              data-current={page === currentPage}
              key={page}
              className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 duration-200 hover:text-secondary data-[current=true]:bg-secondary data-[current=true]:text-black"
            >
              {page}
            </Link>
          ))}
          {!pages.includes(data?.totalPages as number) && (
            <>
              <Link
                href={`/genre/${genre}?page=${currentPage + 1}`}
                className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 hover:text-secondary"
              >
                <MdKeyboardArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href={`/genre/${genre}?page=${data?.totalPages}`}
                className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 hover:text-secondary"
              >
                <MdKeyboardDoubleArrowRight className="h-3 w-3" />
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="xl:basis-[25%]">
        <AnimeLists
          type="regular"
          animes={data?.topAiringAnimes!}
          heading="Most Popular"
        />
        <div className="mt-12 w-full space-y-5">
          <h3 className="text-2xl font-semibold text-secondary">Genres</h3>
          <div className="bg-white/5 px-4 py-6">
            <div className="grid w-full grid-cols-3 gap-2">
              {GENRES.slice(0, showAllGenre ? GENRES.length : 24).map(
                (genre, idx) => (
                  <Link
                    href={`/genre/${genre}`}
                    key={genre}
                    style={{
                      color: generateRandomColor(idx),
                    }}
                    className="rounded px-3 py-2.5 text-sm font-medium capitalize hover:bg-white/10"
                  >
                    {genre.replaceAll("-", " ")}
                  </Link>
                ),
              )}
            </div>

            <button
              onClick={() => setShowAllGenre(!showAllGenre)}
              className="mt-4 w-full rounded bg-white/10 px-3 py-3 text-sm"
            >
              Show {showAllGenre ? "less" : "more"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
