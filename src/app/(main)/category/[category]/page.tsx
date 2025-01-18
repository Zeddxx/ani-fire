"use client";

import { getAnimeByCategories } from "@/api/anime";
import AnimeCard from "@/components/shared/anime-card";
import AnimeLists from "@/components/shared/anime-list";
import HomeLayout from "@/components/shared/layouts/home-layout";
import CategorySkeleton from "@/components/skeleton/category-skeleton";
import usePagination from "@/hooks/use-pagination";
import { catagories, GENRES } from "@/lib/constants";
import { generateRandomColor } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useQueryState } from "nuqs";
import { use, useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

export default function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const [showAllGenre, setShowAllGenre] = useState<boolean>(false);

  const [currentPage] = useQueryState("page", {
    clearOnDefault: true,
    defaultValue: 1,
    parse: Number,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["CATEGORY", category, currentPage],
    queryFn: () => {
      if (!catagories.includes(category)) {
        throw new Error("Category not found");
      }

      return getAnimeByCategories(category, currentPage);
    },
  });

  const pages = usePagination({
    currentPage: data?.currentPage as number,
    totalPages: data?.totalPages as number,
    hasNextPage: data?.hasNextPage as boolean,
  });

  if (!catagories.includes(category)) {
    notFound();
  }

  if (isLoading) {
    return <CategorySkeleton category={category} />;
  }

  if (!data) {
    throw new Error("Something went wrong!");
  }

  return (
    <>
      <div className="wrapper-container flex flex-col gap-7 px-4 py-4 xl:mt-14 xl:flex-row">
        <div className="xl:basis-[75%]">
          <HomeLayout heading={data?.category}>
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
                  href={`/category/${category}`}
                  className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 hover:text-secondary"
                >
                  <MdKeyboardDoubleArrowLeft className="h-3 w-3" />
                </Link>
                <Link
                  href={`/category/${category}?page=${currentPage - 1}`}
                  className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 hover:text-secondary"
                >
                  <MdKeyboardArrowLeft className="h-3 w-3" />
                </Link>
              </>
            )}
            {pages.map((page) => (
              <Link
                href={`/category/${category}?page=${page}`}
                data-current={page === data?.currentPage}
                key={page}
                className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 duration-200 hover:text-secondary data-[current=true]:bg-secondary data-[current=true]:text-black"
              >
                {page}
              </Link>
            ))}
            {!pages.includes(data?.totalPages as number) && (
              <>
                <Link
                  href={`/category/${category}?page=${currentPage + 1}`}
                  className="grid aspect-square h-10 place-items-center rounded-full bg-white/5 font-medium text-white/70 hover:text-secondary"
                >
                  <MdKeyboardArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href={`/category/${category}?page=${data?.totalPages}`}
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
            heading="Top 10"
            type="top10Animes"
            animes={data?.top10Animes!}
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
      </div>
    </>
  );
}
