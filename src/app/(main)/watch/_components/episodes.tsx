import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimeEpisodes } from "@/types/anime";
import { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import EpisodeContainer from "./episode-container";

type Range = {
  start: number;
  end: number;
};

interface EpisodesProps {
  episodes: AnimeEpisodes;
  episodeId: string;
}

export default function Episodes({ episodes, episodeId }: EpisodesProps) {
  const [ranges, setRanges] = useState<Range>({
    start: 0,
    end: 100,
  });
  const [searchEpisode, setSearchEpisode] = useState<number | null>(null);
  const rangeOptions = useMemo<Range[]>(() => {
    if (!episodes) return [];

    const { totalEpisodes } = episodes;
    const options: Range[] = [];
    for (let i = 0; i < totalEpisodes; i += 100) {
      const start = i;
      const end = Math.min(i + 100, totalEpisodes);
      options.push({ start, end });
    }

    return options;
  }, [episodes]);

  const findRangeForEpisode = (episodeNumber: number) => {
    if (!episodeNumber || !rangeOptions.length) return;

    const range = rangeOptions.find(
      ({ start, end }) => episodeNumber >= start && episodeNumber < end,
    );

    if (range) {
      setRanges(range);
    }
  };

  const handleSliceArray = useMemo(() => {
    if (!episodes) return;

    const { episodes: animeEpisodes } = episodes;

    return animeEpisodes.slice(ranges.start, ranges.end);
  }, [episodes, ranges]);

  useEffect(() => {
    if (searchEpisode !== null) {
      findRangeForEpisode(searchEpisode);
    }
  }, [searchEpisode]);

  return (
    <>
      <div className="sticky inset-0 z-20 flex min-h-12 w-full items-center justify-between gap-3 border-b border-primary/40 bg-primary-600 px-4 text-sm">
        <div className="">
          <h3 className="flex items-center text-nowrap text-xs font-medium">
            List of episodes:
          </h3>

          {episodes.totalEpisodes > 24 && (
            <div className="flex items-center gap-2">
              <Select
                onValueChange={(value) => {
                  const [start, end] = value.split(",").map(Number);

                  setRanges({ start, end });
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${ranges.start} - ${ranges.end}`}
                  />
                </SelectTrigger>

                <SelectContent id="episode" className="z-[999]">
                  {rangeOptions.map((range, idx) => {
                    return (
                      <SelectItem
                        key={idx}
                        value={`${range.start},${range.end}`}
                      >
                        {range.start} - {range.end}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <Input
            onChange={(e) => setSearchEpisode(parseInt(e.target.value))}
            placeholder="Number of Ep"
            className="h-7 border border-white/20 bg-primary-600 pl-7 text-xs text-primary-100"
          />
          <IoSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <EpisodeContainer
        currentEpisodeId={episodeId}
        episodes={handleSliceArray!}
        totalEpisodes={episodes.totalEpisodes}
        searchedEpisodeNumber={searchEpisode}
      />
    </>
  );
}
