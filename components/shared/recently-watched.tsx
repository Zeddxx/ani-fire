"use client";

import useLocalStorage from "@/hooks/useLocalStorage";

const RecentlyWatched = () => {
  const { getAnimeWatched } = useLocalStorage();
  const anime = getAnimeWatched();

  if (!anime) return null;

  return (
    <section className="px-4">
      <h3 className="text-2xl text-primary font-semibold">Continue Watching</h3>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
        {anime?.map((anime) => (
          <div className="flex flex-col" key={anime.episodeId}>
            <a
              href={`/watch/${anime.episodeId}`}
              className="rounded-md w-full h-[30vw] max-h-80 lg:max-h-64 min-h-60 overflow-hidden relative"
            >
              <img
                src={anime.poster}
                alt="recently watched anime"
                className="h-full peer duration-150 hover:blur-md w-full object-cover"
              />
              <p className="bg-rose-600 text-xs px-2 py-1 font-semibold absolute bottom-2 rounded-md left-2 text-white">
            EP : {anime.episodeNumber}
          </p>
            </a>
            <a
              href={`/watch/${anime.episodeId}`}
              className="mt-1.5 truncate w-full hover:text-rose-500"
            >
              {anime.title}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
export default RecentlyWatched;
