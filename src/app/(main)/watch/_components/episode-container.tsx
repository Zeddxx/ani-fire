import { cn } from "@/lib/utils";
import { EpisodesDetails } from "@/types/anime";
import Link from "next/link";
import { memo } from "react";
import { IoIosPlayCircle } from "react-icons/io";

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
      <div className="scrollbar grid max-h-[736px] w-full shrink-0 grid-cols-8 gap-1 overflow-y-visible px-3 py-3 md:grid-cols-10 lg:grid-cols-12 3xl:grid-cols-5">
        {episodes.slice(0, 100).map(({ isFiller, episodeId, number }) => {
          const isCurrentEp = episodeId === currentEpisodeId;
          return (
            <Link
              key={episodeId}
              href={`/watch/${episodeId}`}
              className={cn(
                "grid h-8 w-full place-items-center rounded-md bg-white/10",
                isFiller && "bg-gradient-to-r from-[#5a4944] to-[#63594b]",
                isCurrentEp && "bg-secondary text-black",
                searchedEpisodeNumber === number && "bg-muted-foreground/50",
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
    <div className="scrollbar flex max-h-[376px] w-full shrink-0 flex-col overflow-auto lg:max-h-[590px] 3xl:max-h-[716px]">
      {episodes.map(({ episodeId, title, number }, idx) => {
        const isCurrentEp = episodeId === currentEpisodeId;
        return (
          <Link
            key={episodeId}
            href={`/watch/${episodeId}`}
            passHref
            className={cn(
              "relative flex h-11 w-full shrink-0 items-center gap-x-2 bg-primary-100/70 px-4 text-sm text-white/60 hover:bg-primary/20",
              idx % 2 && "bg-primary",
              isCurrentEp &&
                "pointer-events-none bg-primary-100 text-secondary",
              searchedEpisodeNumber === number && "bg-white/30",
            )}
          >
            <p className="shrink-0 font-semibold">{number}</p>
            <p className="line-clamp-1 pr-9 font-light">{title}</p>
            {isCurrentEp && (
              <span className="absolute left-0 h-full w-1 bg-secondary" />
            )}
            {isCurrentEp && (
              <IoIosPlayCircle className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default memo(EpisodeContainer);
