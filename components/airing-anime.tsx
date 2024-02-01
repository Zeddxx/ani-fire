"use client";

import { useGetAnimeByCategory } from "@/lib/query-api";
import { HomeAnimeProps } from "@/types";
import { FaClosedCaptioning } from "react-icons/fa";
import { IoIosMic } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";

const AiringAnime = ({ anime }: { anime: HomeAnimeProps }) => {
  const { data: completedAnime } = useGetAnimeByCategory("completed", 1);
  const { data: topAiring } = useGetAnimeByCategory("top-airing", 1)

  if(!topAiring) return null;

  return (
    <>
    {/* Top airing animes */}
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">Top Airing</h3>
        <div className="">
          {topAiring?.animes.slice(0, 5).map((anime, index) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <div className="h-24 w-16 flex-shrink-0 relative">
                <img
                  src={anime.poster}
                  alt="anime poster"
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium text-sm hover:text-primary dark:text-primary-foreground text-secondary-foreground duration-200"
                >
                  {anime.name}
                </a>
                <div className="flex text-white w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary px-2 py-1 flex items-center">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.episodes.sub || 0}
                  </p>
                  <p className="flex items-center text-black dark:text-white text-secondary-foreground dark:text-secondary">
                    <IoIosMic className="mr-1 h-4 w-4" />
                    {anime.episodes.dub || 0}
                  </p>
                  <span className="h-1 w-1 mx-2 rounded-full bg-muted-foreground flex" />
                  <p className="text-xs text-muted-foreground font-medium pr-2">
                    TV
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <a
              href="/anime/top-airing"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>

      {/* Most popular animes */}
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">
          Most Popular
        </h3>
        <div className="">
          {anime?.top10Animes.month.slice(0, 5).map((anime, index) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <div className="h-24 w-16 flex-shrink-0 relative">
                <img
                  src={anime.poster}
                  alt="anime poster"
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium hover:text-primary dark:text-primary-foreground text-secondary-foreground duration-200 text-sm"
                >
                  {anime.name}
                </a>
                <div className="flex w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary text-white px-2 py-1 flex items-center">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.episodes.sub || 0}
                  </p>
                  <p className="flex items-center dark:text-white text-black text-secondary-foreground dark:text-secondary">
                    <IoIosMic className="mr-1 h-4 w-4" />
                    {anime.episodes.dub || 0}
                  </p>
                  <span className="h-1 w-1 mx-2 rounded-full bg-muted-foreground flex" />
                  <p className="text-xs text-muted-foreground font-medium pr-2">
                    TV
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <a
              href="/anime/most-popular"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>

      {/* Most favorite anime */}
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">
          Most Favorite
        </h3>
        <div className="h-fit">
          {anime?.top10Animes.month.slice(5, 10).map((anime, index) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <div className="h-24 w-16 flex-shrink-0 relative">
                <img
                  src={anime.poster}
                  alt="anime poster"
                  loading="lazy"
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium text-secondary-foreground dark:text-primary-foreground hover:text-primary duration-200 text-sm"
                >
                  {anime.name}
                </a>
                <div className="flex w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary px-2 py-1 text-white flex items-center">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.episodes.sub || 0}
                  </p>
                  <p className="flex items-center text-black dark:text-white text-secondary-foreground dark:text-secondary">
                    <IoIosMic className="mr-1 h-4 w-4" />
                    {anime.episodes.dub || 0}
                  </p>
                  <span className="h-1 w-1 mx-2 rounded-full bg-muted-foreground flex" />
                  <p className="text-xs text-muted-foreground font-medium pr-2">
                    TV
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <a
              href="/anime/most-favorite"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>

      {/* Completed animes */}
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">
          Completed Anime
        </h3>
        <div className="">
          {completedAnime?.animes.slice(5, 10).map((anime, index) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <div className="h-24 w-16 flex-shrink-0 relative">
                <img
                  src={anime.poster}
                  loading="lazy"
                  alt="anime poster"
                  className="rounded-xl h-full w-full object-cover"
                />
              </div>

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium text-secondary-foreground dark:text-primary-foreground hover:text-primary duration-200 text-sm"
                >
                  {anime.name}
                </a>
                <div className="flex w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary px-2 text-white py-1 flex items-center">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.episodes.sub || 0}
                  </p>
                  <p className="flex items-center text-black dark:text-white text-secondary-foreground dark:text-secondary">
                    <IoIosMic className="mr-1 h-4 w-4" />
                    {anime.episodes.dub || 0}
                  </p>
                  <span className="h-1 w-1 mx-2 rounded-full bg-muted-foreground flex" />
                  <p className="text-xs text-muted-foreground font-medium pr-2">
                    TV
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="py-4">
            <a
              href="/anime/completed"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default AiringAnime;
