import { merge } from "@/lib/utils/index";
import { EpisodesDetails } from "@/types/anime";
import Link from "next/link";
import { memo, useEffect, useRef } from "react";

interface EpisodeContainerProps {
  episodes: EpisodesDetails[];
  totalEpisodes: number;
  currentEpisodeId: string;
  searchedEpisodeNumber: number | null;
}

const EpisodeContainer = ({
  currentEpisodeId,
  episodes,
  totalEpisodes,
  searchedEpisodeNumber,
}: EpisodeContainerProps) => {
  if (totalEpisodes > 24) {
    return (
      <div className="w-full shrink-0 grid 3xl:grid-cols-5 lg:grid-cols-12 md:grid-cols-10 grid-cols-8 gap-1 py-3 max-h-[716px]">
        {episodes.slice(0, 100).map(({ isFiller, episodeId, number }) => {
          const isCurrentEp = episodeId === currentEpisodeId;
          return (
            <Link
              key={episodeId}
              href={`/watch/${episodeId}`}
              className={merge(
                "h-8 w-full rounded-md bg-white/10 grid place-items-center",
                isFiller && "bg-yellow-700/40",
                isCurrentEp && "bg-primary",
                searchedEpisodeNumber === number && "bg-muted-foreground/50"
              )}
            >
              <p className="text-xs">{number}</p>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full shrink-0 flex flex-col 3xl:max-h-[716px] lg:max-h-[590px] max-h-[376px]">
      {episodes.map(({ episodeId, title, number }, idx) => {
        const isCurrentEp = episodeId === currentEpisodeId;
        return (
          <Link
            key={episodeId}
            href={`/watch/${episodeId}`}
            passHref
            className={merge(
              "h-12 w-full shrink-0 text-white/60 flex items-center relative px-4 gap-x-2 hover:bg-primary/20 text-sm",
              idx % 2 && "bg-primary/5",
              isCurrentEp &&
                "text-primary text-white bg-primary/20 pointer-events-none",
              searchedEpisodeNumber === number && "bg-white/30"
            )}
          >
            <p className="font-semibold shrink-0">{number}</p>
            <p className="line-clamp-1 font-light">{title}</p>
            {isCurrentEp && (
              <span className="h-full w-1 bg-primary absolute left-0" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default memo(EpisodeContainer);
