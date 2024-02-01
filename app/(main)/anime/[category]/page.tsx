'use client';

import AnimeCard from "@/components/shared/anime-card";
import AnimePagination from "@/components/shared/pagination";
import { useGetAnimeByCategory } from "@/lib/query-api";
import { useSearchParams } from "next/navigation";

const CategoryAnimesPage = ({ params } : { params : { category: string }}) => {
  const query = params.category;
  const pagination = useSearchParams()
  const page = Number(pagination.get("page")) || 1;
  const { data, isLoading, isError } = useGetAnimeByCategory(query, page)

  if (isLoading) return <p>Loading anime...</p>

  if(isError) return <p>Error...</p>

  if(!!data && data.animes.length <= 0) return(
    <section className="h-[calc(100svh-64px)] w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-5">No {query} found! 🥲</h1>
      <img src="/assets/empty.gif" alt="empty gif" height={320} width={360} />
    </section>
  )

  return (
    <section className="max-w-screen-2xl mx-auto px-4 pt-4">
        <h1 className="capitalize text-2xl font-semibold text-primary">{query.split("-").join(" ")}</h1>    

        <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
          {data?.animes.map((anime, index) => (
            <AnimeCard type="Normal" key={anime.id + index} anime={anime} />
          ))}
        </div>

        <AnimePagination
        paginate="Category"
        currentPage={data?.currentPage!}
        hasNextPage={data?.hasNextPage!}
        page={page}
        query={query}
        totalPages={data?.totalPages!}
        />
    </section>
  )
}
export default CategoryAnimesPage