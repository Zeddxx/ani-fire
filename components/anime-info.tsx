import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AnimeInfoTypeProps, GetAnimeEpisodes } from "@/types";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const AnimeInfo = ({
  data,
  episode,
  description,
  page,
  latest
}: {
  data: AnimeInfoTypeProps;
  episode?: GetAnimeEpisodes;
  description?: string;
  page: "AnimePage" | "Watching";
  latest?: string | null
}) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const isRedirectToLatest = !!latest;

  return (
    <div className={cn("flex max-w-screen-2xl mx-auto w-full h-max px-4 relative", page === "Watching" ? "py-0" : "py-10")}>
      <div
        className={cn(
          "h-full w-full",
          page === "AnimePage"
            ? "flex lg:flex-row flex-col items-center lg:items-start gap-x-4"
            : ""
        )}
      >
        <div
          className={cn(
            "relative mb-6 lg:mb-0 overflow-hidden rounded-md before:absolute before:w-full before:bg-gradient-to-t before:from-stone-950 before:to-transparent before:h-32 before:bottom-0 before:left-0 before:z-20",
            page === "AnimePage" ? "h-80 w-52 lg:min-w-64" : "h-44 w-32"
          )}
        >
          <img
            src={data?.anime.info.poster}
            alt={"anime poster"}
            loading="lazy"
            className=" w-full h-full object-cover"
          />
        </div>

        <div className="xl:mt-3">
          <h1 className="text-3xl font-semibold text-secondary-foreground">
            {data?.anime.info.name}
          </h1>

          <div className="rounded-sm my-4 items-center flex gap-px overflow-hidden">
            <p className="bg-white text-black py-1 font-semibold px-2 text-xs">
              {data?.anime.info.stats.rating}
            </p>

            <p className="bg-primary text-white font-semibold py-1 px-2 text-xs">
              CC: {data?.anime.info.stats.episodes.sub}
            </p>

            <p className="bg-yellow-500 text-white font-semibold py-1 px-2 text-xs">
              {data?.anime.info.stats.quality}
            </p>
            <p className="bg-yellow-500 text-white font-semibold py-1 px-2 text-xs">
              {data?.anime.info.stats.episodes.sub}
            </p>

            <span className="h-1.5 mx-2 w-1.5 rounded-full bg-muted-foreground"></span>

            <p className="text-sm text-secondary-foreground">
              {data?.anime.info.stats.type}
            </p>

            <span className="h-1.5 mx-2 w-1.5 rounded-full bg-muted-foreground"></span>

            <p className="text-sm text-secondary-foreground">
              {data?.anime.info.stats.duration}
            </p>
          </div>

          {page === "AnimePage" && (
            <div className="flex my-4">
              <Button
                asChild
                className="bg-rose-600 rounded-full hover:bg-rose-700"
              >
                <a href={isRedirectToLatest ? `/watch/${episode?.episodes[0].episodeId}&ref=latest` : `/watch/${episode?.episodes[0].episodeId}`}>
                  <FaPlay className="mr-2" /> Watch {isRedirectToLatest ? "latest" : "now"}
                </a>
              </Button>
            </div>
          )}

          {/* Description here! */}

          <p
            className={cn(
              "dark:text-slate-50 text-sm",
              page !== "AnimePage" && "overflow-y-auto h-24"
            )}
          >
            {description?.length! > 300
              ? isShowMore
                ? description
                : description?.slice(0, 300)
              : description}
            <span
              className="ml-2 font-semibold cursor-pointer select-none"
              onClick={() => setIsShowMore(!isShowMore)}
            >
              {isShowMore ? "- less" : "+ more"}
            </span>
          </p>

          <div className="my-3">
            <p className="text-muted-foreground text-sm">
              AniFire is a website to watch the animes for free and event
              ads-free. My main motive was to make a full functionable website
              to showcase in my portfolio i have no intentions to make any type
              of revenew from this.
            </p>
          </div>
        </div>

        {/* More info's */}
        {page === "AnimePage" && (
          <div className="lg:max-w-96 w-full flex-shrink-0 flex flex-col text-sm border border-secondary bg-secondary dark:bg-black p-6 backdrop-blur-md gap-4 justify-center lg:h-max">
            <p>
              <span className="font-medium">Japanese:</span>{" "}
              {data?.anime.moreInfo.japanese}
            </p>
            <p>
              <span className="font-medium">Synonyms:</span>{" "}
              {data?.anime.moreInfo.synonyms}
            </p>
            <p>
              <span className="font-medium">Aired:</span>{" "}
              {data?.anime.moreInfo.aired}
            </p>
            <p>
              <span className="font-medium">Premiered:</span>{" "}
              {data?.anime.moreInfo.premiered}
            </p>
            <p>
              <span className="font-medium">Duration:</span>{" "}
              {data?.anime.moreInfo.duration}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {data?.anime.moreInfo.status}
            </p>

            <Separator />

            <div className="flex flex-wrap gap-3">
              <span className="text-sm text-secondary-foreground dark:text-primary-foreground">
                Genre :
              </span>{" "}
              {data.anime.moreInfo.genres.map((genre) => (
                <Badge
                  variant="secondary"
                  key={genre}
                  className="hover:text-primary font-light"
                >
                  {genre}
                </Badge>
              ))}
            </div>
            <Separator />

            <p>
              <span>Studio: </span>
              {data.anime.moreInfo.studios?.split(",").join(", ")}
            </p>

            <p>
              <span>Producers: </span>
              {data.anime.moreInfo.producers}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AnimeInfo;
