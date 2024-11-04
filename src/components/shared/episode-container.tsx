import { AnimeEpisodes } from "@/types/anime";
import { memo } from "react";

interface EpisodeContainerProps {
  episodes: AnimeEpisodes;
}

const EpisodeContainer = ({ ...props }: EpisodeContainerProps) => {
  const {
    episodes: { episodes, totalEpisodes },
  } = props;

  if (totalEpisodes > 24) {
    return (
      <div className="3xl:basis-[20%] basis-full w-full order-2 shrink-0 grid grid-cols-4 gap-4">
        {episodes.slice(0, 32).map((episode) => {
          const isFiller = episode.isFiller;

          return (
            <div key={episode.episodeId} className="h-10 w-full rounded-md border border-muted-foreground">
              <p>{episode.number}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="3xl:basis-[20%] basis-full w-full order-2 shrink-0 flex flex-col">
      {episodes.map((episode) => {
        const isFiller = episode.isFiller;

        return (
          <div key={episode.episodeId} className="h-10 w-full rounded-md border border-muted-foreground">
            <p>{episode.number}</p>
          </div>
        );
      })}
    </div>
  );
};

export default memo(EpisodeContainer);
