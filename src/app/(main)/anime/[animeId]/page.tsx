"use client";

import { getAnimeInfoByAnimeId } from "@/api/anime";
import { useQuery } from "@tanstack/react-query";

export default function AnimeInfo({
  params: { animeId },
}: {
  params: { animeId: string };
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["ANIME_INFO", animeId],
    queryFn: () => getAnimeInfoByAnimeId(animeId),
  });

  if(isLoading) return <p>is info loading...</p>

  return (
    <section className="wrapper-container px-4">
      <div className=""></div>
    </section>
  )
}
