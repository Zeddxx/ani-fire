"use client";

import { useHistory } from "@/store/history";
import { AnimeEntry } from "@/types/anime";
import Image from "next/image";
import { memo, useMemo } from "react";
import { FaClosedCaptioning } from "react-icons/fa";

const ContinueWatching = () => {
  const { latestAnimeWatched } = useHistory();

  const watching = useMemo(
    () => latestAnimeWatched as AnimeEntry,
    [latestAnimeWatched],
  );

  if (!Object.keys(watching).length) return null;

  return (
    <div className="wrapper-container z-10 my-6 px-4">
      <h2 className="text-2xl font-semibold text-secondary">
        Recently Watching
      </h2>

      <div className="my-6 flex w-full flex-wrap gap-4">
        <div
          key={watching.id}
          className="relative flex w-auto max-w-52 flex-col"
        >
          <p className="pointer-events-none absolute left-2 top-2 z-10 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-black">
            Episode: {watching.currentEp}
          </p>
          <a
            href={`/watch/${watching.episodeId}`}
            className="relative aspect-anime-image h-[30vw] max-h-72 min-h-72 w-full overflow-hidden"
          >
            <Image
              src={watching.imgSrc}
              alt={watching.title}
              fill
              className="peer h-full w-full object-cover duration-150 hover:blur-md"
            />
            <div className="absolute bottom-2 left-2 z-20 flex overflow-hidden rounded-md text-white dark:text-black">
              <p className="flex items-center bg-green px-2 py-1 text-xs font-semibold">
                <FaClosedCaptioning className="mr-1 h-3 w-3" />{" "}
                {watching.totalEpisodes || 0}
              </p>
              <p className="flex items-center gap-x-1 bg-blue px-2 text-xs font-semibold text-black">
                {watching.type || "TV"}
              </p>
            </div>
          </a>
          <a
            href={`/watch/${watching.episodeId}`}
            className="mt-1.5 w-full truncate hover:text-primary"
          >
            {watching.title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(ContinueWatching);
