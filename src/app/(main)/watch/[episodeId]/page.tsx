"use client";

import {
  getAnimeEpisodesById,
  getAnimeEpisodeServers,
  getAnimeInfoByAnimeId,
  getAnimeStreamingLinksByEpisodeId,
} from "@/api/anime";
import OtherInfos from "@/components/main/other-infos";
import AniFirePlayer from "@/components/shared/ani-fire-player";
import BeatLoader from "@/components/shared/loader";
import Description from "@/components/ui/info/description";

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
import { useEffect } from "react";
import Episodes from "../_components/episode-container";

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

  const { data: servers } = useQuery({
    queryKey: ["ANIME_EPISODE_SERVERS", episodeId],
    queryFn: () => getAnimeEpisodeServers(encodedEpisodesId),
  });

  const { data: animeInfo, isLoading: isInfoLoading } = useQuery({
    queryKey: [QUERY_KEY.ANIME_INFO, episodeId],
    queryFn: () => getAnimeInfoByAnimeId(episodeId),
  });

  const { data: episodes, isLoading: isEpisodesLoading } = useQuery({
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

  const { next, prev } = getEpisodeNavigation(
    episodes ?? { episodes: [], totalEpisodes: 0 },
    encodedEpisodesId,
  );

  return (
    <div className="relative mt-16 py-2">
      <div className="absolute top-0 -z-10 hidden h-full w-full overflow-hidden bg-primary/10 brightness-50 2xl:block">
        <Image
          src={animeInfo?.anime.info.poster ?? ""}
          alt={"anime poster"}
          fill
          objectFit="cover"
          className="absolute opacity-35 mix-blend-multiply blur-lg"
        />
      </div>
      <div className="wrapper-container hidden w-full items-center gap-x-2 px-4 text-sm sm:gap-x-4 xl:px-0 2xl:my-4 2xl:flex">
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
      <div className="wrapper-container flex w-full flex-col gap-1.5 bg-primary-500 sm:px-4 xl:px-0 3xl:flex-row">
        <div className="mx-auto h-full w-full max-w-7xl overflow-y-scroll 3xl:basis-[17%]">
          {isEpisodesLoading || !episodes ? (
            <div className="grid h-full min-h-[376px] w-full shrink-0 flex-col place-items-center lg:min-h-[590px] 3xl:min-h-[716px]">
              <BeatLoader childClassName="h-3.5 w-3.5" />
            </div>
          ) : (
            <Episodes episodes={episodes} episodeId={encodedEpisodesId} />
          )}
        </div>

        <div className="order-first mx-auto w-full max-w-7xl shrink-0 3xl:order-none 3xl:basis-[63%]">
          {isLoading || !episodes || !data ? (
            <div className="grid aspect-video h-max w-full place-items-center bg-black">
              <BeatLoader childClassName="h-3.5 w-3.5" />
            </div>
          ) : (
            <AniFirePlayer
              episodeId={encodedEpisodesId}
              episodes={episodes}
              {...data}
            />
          )}

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
        <div className="max-h-[590px] w-full shrink-0 px-4 sm:px-0 3xl:basis-[20%]">
          {isInfoLoading ? (
            <div className="grid h-full w-full place-items-center">
              <BeatLoader childClassName="h-3 w-3" />
            </div>
          ) : (
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

              <div className="max-h-60 w-full overflow-y-auto">
                <Description
                  description={animeInfo?.anime.info.description ?? ""}
                  className="text-[13px] !leading-tight text-white/80"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchAnimePage;
