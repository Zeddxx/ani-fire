"use client";

import AnimeCard from "@/components/shared/anime-card";
import AnimePagination from "@/components/shared/pagination";
import { useGetAnimeByGenres } from "@/lib/query-api";
import { useSearchParams } from "next/navigation";

const GenrePage = ({ params }: { params: { name: string } }) => {
  const para = useSearchParams();
  const page = Number(para.get('page'));

  const { data, isLoading, isError } = useGetAnimeByGenres(params.name, page);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="max-w-screen-2xl mx-auto w-full px-4">
      <h1 className="text-2xl font-semibold text-primary mb-3">
        {data?.genreName}
      </h1>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
        {data?.animes.map((anime, index) => (
          <AnimeCard type="Normal" anime={anime} key={anime.id + index} />
        ))}
      </div>

      <AnimePagination
        paginate="Genre"
        totalPages={data?.totalPages!}
        currentPage={data?.currentPage!}
        hasNextPage={data?.hasNextPage!}
        query={params.name!}
        page={page}
      />
    </section>
  );
};
export default GenrePage;
