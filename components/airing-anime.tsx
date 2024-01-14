import { HomeAnimeProps } from "@/types";
import Image from "next/image";
import { FaClosedCaptioning } from "react-icons/fa";
import { IoIosMic } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";

const AiringAnime = ({ anime }: { anime: HomeAnimeProps }) => {
  return (
    <>
      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">Top Airing</h3>
        <div className="">
          {anime?.topAiringAnimes.slice(0, 5).map((anime, index) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <Image
                src={anime.poster}
                alt="anime poster"
                height={70}
                className="rounded-xl"
                width={60}
              />

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium text-sm hover:text-primary duration-200"
                >
                  {anime.name}
                </a>
                <p className="text-muted-foreground mt-2 text-sm">
                  {anime.otherInfo}
                </p>
              </div>
            </div>
          ))}

          <div className="py-4">
            <a
              href="/top-airing"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>

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
              <Image
                src={anime.poster}
                alt="anime poster"
                height={70}
                className="rounded-xl"
                width={60}
              />

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium hover:text-primary duration-200 text-sm"
                >
                  {anime.name}
                </a>
                <div className="flex w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary px-2 py-1 flex items-center">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.episodes.sub || 0}
                  </p>
                  <p className="flex items-center">
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
              href="/top-airing"
              className="hover:text-primary text-sm w-fit flex items-center gap-x-2 duration-200"
            >
              Show more
              <MdArrowForwardIos />
            </a>
          </div>
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-2xl font-semibold text-primary my-3">
          Most Favorite
        </h3>
        <div className="">
          {anime?.top10Animes.month.slice(5, 10).map((anime, index) => (
            <div
              className="flex gap-x-4 py-4 border-b-muted border-b"
              key={anime.id + index}
            >
              <Image
                src={anime.poster}
                alt="anime poster"
                height={70}
                className="rounded-xl"
                width={60}
              />

              <div className="">
                <a
                  href={`/${anime.id}`}
                  className="font-medium hover:text-primary duration-200 text-sm"
                >
                  {anime.name}
                </a>
                <div className="flex w-fit gap-1 font-semibold text-xs border-muted border items-center mt-2">
                  <p className="bg-primary px-2 py-1 flex items-center">
                    <FaClosedCaptioning className="mr-1 h-4 w-4" />{" "}
                    {anime.episodes.sub || 0}
                  </p>
                  <p className="flex items-center">
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
              href="/top-airing"
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
