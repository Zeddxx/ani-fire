'use client';

import { Episode } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

type EpisodesProps = {
  moreEpisodes: number;
  episodes: Episode[];
  query: string;
  screen: "Mobile" | "PC"
};

const Episodes = ({ episodes, moreEpisodes, query, screen }: EpisodesProps) => {
  const [selectedRange, setSelectedRange] = useState<number | null>(null)

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedRange(selectedValue)
  }

  const filteredEpisodes = selectedRange ? episodes.slice(0, selectedRange) : episodes;

  return (
    <>
    <aside className={cn("bg-black episode-scroll overflow-y-scroll w-full relative", screen === "PC" ? "xl:block hidden  h-[30rem] max-w-[18rem]" : "block xl:hidden w-full")}>
    <div className="w-full bg-black sticky left-0 py-4 px-4 top-0">
      <p className="text-sm text-muted-foreground w-full">No. of episodes</p>
    </div>
    <div
      className={cn(
        "h-full w-full py-1 px-4",
        moreEpisodes > 24 ? "grid grid-cols-8 xl:grid-cols-4 gap-2" : "flex flex-col"
      )}
    >
      {/* TODO: make it dynamic or adding links to it */}
      {filteredEpisodes?.map((episode) => {
        const isCurrent = query === episode.episodeId;
        const isMoreEpisodes = moreEpisodes > 24;
        const isEpisodeFiller = episode.isFiller;

        if(isMoreEpisodes) {
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
                    "text-sm px-2 truncate w-full py-3 border-b-muted border-b",
                    isCurrent && "border-l-4 text-primary border-l-primary"
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
  <div className="">
    <label htmlFor="episodeRange">
        Select episodes:
    </label>
    <select name="episodeRange" id="episodeRange" onChange={handleSelectChange} value={selectedRange || ""}>
        <option value="">
            Choose an episode range
        </option>
        {[10, 50, 100, 200].map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
    </select>
  </div>
  </>
  );
};
export default Episodes;
