import { merge } from "@/lib/utils";
import { AnimeEpisodes } from "@/types/anime";
import Link from "next/link";
import { memo } from "react";

interface EpisodeContainerProps {
  episodes: AnimeEpisodes;
  currentEpisodeId: string;
}

const EpisodeContainer = ({
  currentEpisodeId,
  ...props
}: EpisodeContainerProps) => {
  const {
    episodes: { episodes, totalEpisodes },
  } = props;

  if (totalEpisodes > 24) {
    return (
      <div className="w-full shrink-0 grid grid-cols-4 gap-4">
        {episodes.slice(0, 32).map((episode) => {
          const isFiller = episode.isFiller;

          return (
            <div
              key={episode.episodeId}
              className="h-10 w-full rounded-md border border-white/50"
            >
              <p>{episode.number}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full shrink-0 flex flex-col bg-secondary-foreground">
      {episodes.map(({ isFiller, episodeId, title, number }, idx) => {
        return (
          <Link
            key={episodeId}
            href={`/watch/${episodeId}`}
            passHref
            className={merge(
              "h-12 w-full text-white/40 flex items-center px-4 gap-x-2 hover:text-white",
              idx % 2 && "bg-primary/20",
              episodeId === currentEpisodeId &&
                "text-white bg-primary pointer-events-none"
            )}
          >
            <p className="font-semibold shrink-0">{number}</p>
            <p className="line-clamp-1">{title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default memo(EpisodeContainer);
