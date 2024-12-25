"use client";

import {
  getAnimeEpisodesById,
  getAnimeEpisodeServers,
  getAnimeInfoByAnimeId,
  getAnimeStreamingLinksByEpisodeId,
} from "@/api/anime";
import OtherInfos from "@/components/main/other-infos";
import AniFirePlayer from "@/components/shared/ani-fire-player";
import EpisodeContainer from "@/components/shared/episode-container";
import Description from "@/components/ui/info/description";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Separator from "@/components/ui/separator";
import { QUERY_KEY } from "@/lib/query-key";
import { getEpisodeNavigation } from "@/lib/utils";
import { useHistory } from "@/store/history";
import { usePlayerStore } from "@/store/player-store";
import { useQuery } from "@tanstack/react-query";
import { FastForward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";

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
  const router = useRouter();

  const { setHistory, allAnimeWatched } = useHistory();
  const { autoNext, autoSkip } = usePlayerStore();

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
          }&category=${!servers?.sub.length ? "raw" : "sub"}`,
      ),
    enabled: !!servers,
  });

  useEffect(() => {
    if (!animeInfo || !episodes) return;

    const animeWatchedArray = allAnimeWatched || [];
    const currentEp = episodes?.episodes.find(
      (anime) => anime.episodeId === encodedEpisodesId,
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
      (anime: any) => anime.id === episodeId,
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

  const { next, prev } = getEpisodeNavigation(
    episodes ?? { episodes: [], totalEpisodes: 0 },
    encodedEpisodesId,
  );

  useEffect(() => {
    if (searchEpisode !== null) {
      findRangeForEpisode(searchEpisode);
    }
  }, [searchEpisode]);
  if (isLoading) return <p>Is episodes streaming loading...</p>;

  if (!data || !episodes) return null;

  return (
    <div className="relative mt-16 py-2">
      <div className="absolute top-0 -z-10 h-full w-full overflow-hidden bg-primary/10 brightness-50">
        <Image
          src={animeInfo?.anime.info.poster ?? ""}
          alt={"anime poster"}
          fill
          objectFit="cover"
          className="absolute opacity-35 mix-blend-multiply blur-lg"
        />
      </div>
      <div className="wrapper-container my-4 flex w-full items-center gap-x-2 px-4 text-sm sm:gap-x-4 xl:px-0">
        <Link href="/home">Home</Link>
        <Separator type="dot" />
        <Link href={`/type/${animeInfo?.anime.info.stats.type}`}>
          {animeInfo?.anime.info.stats.type}
        </Link>
        <Separator type="dot" />
        <Link
          href={`/${animeInfo?.anime.info.id}`}
          className="line-clamp-1 text-muted-foreground"
        >
          {animeInfo?.anime.info.name}
        </Link>
      </div>
      <div className="wrapper-container flex w-full flex-col gap-1.5 px-4 xl:bg-primary-500 xl:px-0 3xl:flex-row">
        <div className="mx-auto h-full w-full max-w-7xl overflow-y-scroll 3xl:basis-[17%]">
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
            currentEpisodeId={encodedEpisodesId}
            episodes={handleSliceArray!}
            totalEpisodes={episodes.totalEpisodes}
            searchedEpisodeNumber={searchEpisode}
          />
        </div>
        <div className="order-first mx-auto w-full max-w-7xl shrink-0 3xl:order-none 3xl:basis-[63%]">
          <AniFirePlayer
            episodeId={encodedEpisodesId}
            episodes={episodes}
            {...data}
          />

          <div className="flex w-full items-center justify-between p-4">
            <div className="flex items-center gap-3 text-sm">
              <p
                // onClick={() => setAutoNext(!autoNext)}
                className="flex items-center gap-1.5 font-normal"
              >
                Auto Next{" "}
                <span className="text-yellow-500">
                  {autoNext ? "On" : "Off"}
                </span>
              </p>

              <p
                // onClick={() => setAutoSkip(!autoSkip)}
                className="flex items-center gap-1.5 font-normal"
              >
                Auto Skip Intro{" "}
                <span className="text-yellow-500">
                  {autoSkip ? "On" : "Off"}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <button
                disabled={!prev}
                onClick={() => router.push(`/watch/${prev}`)}
                className="flex items-center gap-1.5 font-normal hover:text-primary"
              >
                <FastForward className="h-3 w-3 rotate-180" /> Prev
              </button>

              <button
                disabled={!next}
                onClick={() => router.push(`/watch/${next}`)}
                className="flex items-center gap-1.5 font-normal hover:text-primary"
              >
                Next <FastForward className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-h-[590px] w-full shrink-0 3xl:basis-[20%]">
          <div className="flex flex-col gap-4 py-4 xl:pl-6 xl:pr-4">
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

            <Description
              description={animeInfo?.anime.info.description ?? ""}
              className="text-[13px] !leading-tight text-white/80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchAnimePage;
