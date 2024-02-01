"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

type CurrentlyWatching = {
  episodeId: string;
  title: string;
  poster: string;
  episodeNumber: number;
};

const RecentlyWatched = () => {
  const { getAnimeWatched, deleteAnime } = useLocalStorage();
  const [watchedData, setWatchedData] = useState<CurrentlyWatching[] | null>(
    null
  );

  useEffect(() => {
    const initialWatchedData = getAnimeWatched();
    setWatchedData(initialWatchedData);
  }, []);

  const handleDeleteWatched = (id: string) => {
    deleteAnime(id);

    setWatchedData(getAnimeWatched());
  };

  if (watchedData && watchedData?.length <= 0) return null;

  return (
    <section className="px-4">
      <h3 className="text-2xl text-primary font-semibold">Continue Watching</h3>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
        {watchedData
          ?.map((anime) => (
            <div className="flex flex-col relative" key={anime.episodeId}>
              <a
                href={`/watch/${anime.episodeId}`}
                className="rounded-md w-full h-[30vw] max-h-80 lg:max-h-80 min-h-60 overflow-hidden relative"
              >
                <img
                  src={anime.poster}
                  alt="recently watched anime"
                  className="h-full peer duration-150 hover:blur-md w-full object-cover"
                />
                <p className="bg-rose-600 text-xs px-2 py-1 font-semibold absolute bottom-2 rounded-md left-2 text-white">
                  EPISODE : {anime.episodeNumber}
                </p>
              </a>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteWatched(anime.episodeId);
                }}
                className="absolute top-2 right-2"
                size="icon"
              >
                <Trash size={16} />
              </Button>
              <a
                href={`/watch/${anime.episodeId}`}
                className="mt-1.5 truncate w-full hover:text-rose-500"
              >
                {anime.title}
              </a>
            </div>
          ))
          .reverse()}
      </div>
    </section>
  );
};
export default RecentlyWatched;
