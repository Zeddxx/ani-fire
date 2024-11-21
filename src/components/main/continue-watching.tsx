"use client";

import { useHistory } from "@/store/history";
import { AnimeEntry } from "@/types/anime";
import Image from "next/image";
import { memo, useMemo } from "react";

const ContinueWatching = () => {
  const { latestAnimeWatched } = useHistory();

  const watching = useMemo(
    () => latestAnimeWatched as AnimeEntry,
    [latestAnimeWatched]
  );

  return (
    <div className="wrapper-container px-4 my-6">
      <h2 className="text-3xl font-semibold text-primary">Recently Watching</h2>

      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
        <div key={watching.id} className="flex flex-col w-auto relative">
          <p className="bg-primary text-xs px-2 py-1 font-medium absolute rounded-md top-2 left-2 z-10 pointer-events-none">
            Episode: {watching.currentEp}
          </p>
          <a
            href={`/watch/${watching.episodeId}`}
            className="rounded-md w-full h-[30vw] max-h-80 lg:max-h-80 min-h-72 overflow-hidden relative"
          >
            <Image
              src={watching.imgSrc}
              loading="lazy"
              alt={watching.title}
              fill
              className="h-full peer duration-150 hover:blur-md w-full object-cover"
            />
            <div className="flex text-white dark:text-black z-20 absolute rounded-md overflow-hidden bottom-2 left-2">
              <p className="bg-primary text-xs px-2 py-1 font-bold">
                CC: {watching.totalEpisodes || 0}
              </p>
              <p className="text-xs flex bg-black dark:text-white px-2 items-center gap-x-1">
                {watching.type || "TV"}
              </p>
            </div>
          </a>
          <a
            href={`/watch/${watching.episodeId}`}
            className="mt-1.5 truncate w-full hover:text-primary"
          >
            {watching.title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(ContinueWatching);
