"use client";

import { useHistory } from "@/store/history";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const ContinueWatching = () => {
  const { allAnimeWatched } = useHistory();

  // sorting anime by its latest watch date in descending order.
  const sortedAnime = allAnimeWatched.sort((a, b) => b.date - a.date);

  return (
    <div className="wrapper-container z-10 my-6 px-4">
      <h2 className="text-2xl font-semibold text-secondary">
        Recently Watching
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {sortedAnime.map((anime) => {
          const progress =
            Number((anime.currentTime / anime.duration).toFixed(2)) * 100;
          return (
            <div key={anime.id} className="flex flex-col gap-2">
              <Link
                href={`/watch/${anime.episodeId}`}
                className="group relative aspect-[10/12] w-full overflow-hidden sm:aspect-[12/16]"
              >
                <Image
                  src={anime.imgSrc}
                  alt={`${anime.title} poster`}
                  fill
                  className="h-full w-full object-cover duration-200 [mask-image:linear-gradient(180deg,#fff,#fff,#fff,transparent)] group-hover:blur-md"
                />

                <FaPlay className="invisible absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 group-hover:visible" />

                <div className="absolute bottom-3 left-1/2 h-1 w-[90%] -translate-x-1/2 rounded-full bg-secondary/40">
                  <div
                    style={{
                      width: progress + "%",
                    }}
                    className="absolute left-0 h-full rounded-full bg-secondary"
                  />
                </div>

                <div className="absolute left-2 top-2 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-black">
                  Episode: {anime.currentEp}
                </div>
              </Link>
              <Link
                href={`/watch/${anime.episodeId}`}
                className="line-clamp-1 w-full text-[15px] font-medium hover:text-secondary"
              >
                {anime.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContinueWatching;
