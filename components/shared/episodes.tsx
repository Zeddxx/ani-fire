"use client";

import { Episode } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type EpisodesProps = {
  moreEpisodes: number;
  episodes: Episode[];
  query: string;
  screen: "Mobile" | "PC";
};

const Episodes = ({
  episodes,
  moreEpisodes,
  query,
  screen,
}: EpisodesProps) => {


  return (
    <>
      <aside
        className={cn(
          "bg-black episode-scroll overflow-y-scroll w-full relative",
          screen === "PC"
            ? "xl:block hidden h-[36rem] max-w-[18rem]"
            : "block xl:hidden w-full my-4"
        )}
      >
        <div className="w-full bg-black border-b border-muted sticky left-0 py-4 px-4 top-0">
          <p className="text-sm text-muted-foreground w-full">
            No. of episodes
          </p>
        </div>
        <div
          className={cn(
            "h-full w-full py-4 sm:py-1 px-4",
            moreEpisodes > 24
              ? "grid grid-cols-5 xl:h-auto h-60 sm:grid-cols-8 xl:grid-cols-4 gap-2"
              : "flex flex-col max-h-56 overflow-y-auto"
          )}
        >
          {/* TODO: make it dynamic or adding links to it */}
          {episodes?.map((episode, index) => {
            const isCurrent = query === episode.episodeId;
            const isMoreEpisodes = moreEpisodes > 24;
            const isEpisodeFiller = episode.isFiller;

            if (isMoreEpisodes) {
              return (
                <a
                  href={`/watch/${episode.episodeId}`}
                  className={cn(
                    "h-fit px-2 w-full text-sm ring-muted ring-1 grid place-items-center py-2 rounded-md",
                    isCurrent && "ring-primary ring-2 text-primary",
                    isEpisodeFiller && "bg-muted"
                  )}
                  key={episode.episodeId}
                >
                  {episode.number}{" "}
                  {!isMoreEpisodes && (
                    <span className="max-w-20 ml-2">{episode.title}</span>
                  )}
                </a>
              );
            } else {
              return (
                <a
                  href={`/watch/${episode.episodeId}`}
                  className={cn(
                    "text-sm px-2 flex-shrink-0 scroll-style truncate w-full py-3 border-b-muted border-b",
                    isCurrent && "border-l-4 text-primary border-l-primary",
                    index % 2 && "bg-muted"
                  )}
                  key={episode.episodeId}
                >
                  {episode.number}{" "}
                  {!isMoreEpisodes && (
                    <span className="max-w-20 ml-2">{episode.title}</span>
                  )}
                </a>
              );
            }
          })}
        </div>
      </aside>
    </>
  );
};
export default Episodes;
