"use client";

import {
  getAnimeEpisodesById,
  getAnimeEpisodeServers,
  getAnimeInfoByAnimeId,
  getAnimeStreamingLinksByEpisodeId,
} from "@/api/anime";
import OtherInfos from "@/components/home/other-infos";
import AniFirePlayer from "@/components/shared/ani-fire-player";
import EpisodeContainer from "@/components/shared/episode-container";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUERY_KEY } from "@/constants/query-key";
import { useHistory } from "@/store/history";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Range = {
  start: number;
  end: number;
};

const WatchAnimePage = ({
  params: { episodeId },
  searchParams: { ep },
}: {
  params: { episodeId: string };
  searchParams: { [key: string]: string };
}) => {
  const encodedEpisodesId = episodeId + `?ep=${ep}`;
  const { setHistory, allAnimeWatched } = useHistory();

  const [ranges, setRanges] = useState<Range>({
    start: 0,
    end: 100,
  });
  const [searchEpisode, setSearchEpisode] = useState<number | null>(null);

  const { data: servers, isLoading: isServerLoading } = useQuery({
    queryKey: ["ANIME_EPISODE_SERVERS", episodeId],
    queryFn: () => getAnimeEpisodeServers(encodedEpisodesId),
  });

  const { data: animeInfo, isLoading: isInfoLoading } = useQuery({
    queryKey: [QUERY_KEY.ANIME_INFO, episodeId],
    queryFn: () => getAnimeInfoByAnimeId(episodeId),
  });

  const { data: episodes } = useQuery({
    queryKey: [QUERY_KEY.ANIME_EPISODES_BY_ID, episodeId],
    queryFn: () => getAnimeEpisodesById(episodeId),
  });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.WATCH_ANIME_BY_EPISODE_ID, encodedEpisodesId],
    queryFn: () =>
      getAnimeStreamingLinksByEpisodeId(
        encodedEpisodesId +
          `&server=${
            servers
              ? servers?.sub.length > 0
                ? servers?.sub[0].serverName
                : servers?.raw[0].serverName
              : "hd-1"
          }&category=${!servers?.sub.length ? "raw" : "sub"}`
      ),
    enabled: !!servers,
  });

  useEffect(() => {
    if (!animeInfo || !episodes) return;

    const animeWatchedArray = allAnimeWatched || [];
    const currentEp = episodes?.episodes.find(
      (anime) => anime.episodeId === encodedEpisodesId
    )?.number;
    const latestAnimeWatched = {
      id: episodeId,
      title: animeInfo?.anime.info.name!,
      imgSrc: animeInfo?.anime.info.poster!,
      type: animeInfo?.anime.info.stats.type!,
      currentEp: currentEp,
      episodeId: encodedEpisodesId,
      totalEpisodes: episodes?.totalEpisodes!,
    };

    const existingAnimeIndex = animeWatchedArray.findIndex(
      (anime: any) => anime.id === episodeId
    );

    if (existingAnimeIndex !== -1) {
      animeWatchedArray[existingAnimeIndex] = {
        ...allAnimeWatched[existingAnimeIndex],
        currentEp: latestAnimeWatched.currentEp,
        episodeId: latestAnimeWatched.episodeId,
      };
    } else {
      animeWatchedArray.push(latestAnimeWatched);
    }
    setHistory({
      latestAnimeWatched: latestAnimeWatched,
      latestWatchedDate: Date.now(),
      allAnimeWatched: animeWatchedArray,
    });
  }, [animeInfo, episodes]);

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
      ({ start, end }) => episodeNumber >= start && episodeNumber < end
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
  if (isLoading) return <p>Is episodes streaming loading...</p>;

  if (!data || !episodes) return null;

  return (
    <div className="">
      <div className="wrapper-container flex items-center md:text-base text-sm gap-x-4 w-full px-4 my-4">
        <Link href="/home">Home</Link>
        <ChevronRight className="md:h-5 md:w-5 h-4 w-4 text-muted-foreground" />
        <Link href={`/type/${animeInfo?.anime.info.stats.type}`}>
          {animeInfo?.anime.info.stats.type}
        </Link>
        <ChevronRight className="md:h-5 md:w-5 h-4 w-4 text-muted-foreground" />
        <Link
          href={`/${animeInfo?.anime.info.id}`}
          className="text-muted-foreground"
        >
          {animeInfo?.anime.info.name}
        </Link>
      </div>
      <div className="wrapper-container flex 3xl:flex-row flex-col gap-1.5 w-full xl:bg-primary/15 xl:px-0 px-4">
        <div className="3xl:basis-[17%] h-full max-w-7xl mx-auto w-full overflow-y-scroll">
          <div className="w-full px-4 min-h-12 flex items-center justify-between gap-3 sticky inset-0 border-primary/40 border-b text-sm bg-black">
            <div className="">
              <h3 className="flex items-center font-medium text-nowrap">
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

            <div className="">
              <Input
                onChange={(e) => setSearchEpisode(parseInt(e.target.value))}
                placeholder="Number of Ep"
                className=""
              />
            </div>
          </div>
          <EpisodeContainer
            currentEpisodeId={encodedEpisodesId}
            episodes={handleSliceArray!}
            totalEpisodes={episodes.totalEpisodes}
            searchedEpisodeNumber={searchEpisode}
          />
        </div>
        <div className="3xl:basis-[63%] max-w-7xl mx-auto 3xl:order-none order-first w-full shrink-0">
          <AniFirePlayer
            episodeId={encodedEpisodesId}
            episodes={episodes}
            {...data}
          />

          <div className="h-36 w-full bg-primary/20"></div>
        </div>
        <div className="3xl:basis-[20%] max-h-[590px] w-full shrink-0">
          <div className="flex flex-col gap-4 xl:pl-6 xl:pr-4 py-4">
            <div className="relative aspect-anime-image h-44 w-32 shrink-0 shadow">
              <Image
                draggable={false}
                src={animeInfo?.anime.info.poster!}
                alt={animeInfo?.anime.info.name!}
                fill
                className="h-full w-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-semibold">
              {animeInfo?.anime.info.name}
            </h3>
            <div className="">
              <OtherInfos {...animeInfo?.anime.info.stats!} />
            </div>

            <div className="">
              <p className="text-sm line-clamp-6 text-muted-foreground">
                {animeInfo?.anime.info.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchAnimePage;
