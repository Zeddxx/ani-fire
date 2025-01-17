"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useMemo } from "react";

// important libraries imports
import { useQuery } from "@tanstack/react-query";

// APIs functions imports
import {
  getAnimeEpisodesById,
  getAnimeEpisodeServers,
  getAnimeInfoByAnimeId,
  getAnimeStreamingLinksByEpisodeId,
} from "@/api/anime";

// constants import
import { QUERY_KEY } from "@/lib/query-key";

// store imports
import { useHistory } from "@/store/history";

// components imports
import Episodes from "@/app/(main)/watch/_components/episodes";
import AniFirePlayer from "@/app/(main)/watch/_components/player/anifire-player";
import BeatLoader from "@/components/shared/loader";
import OtherInfos from "@/components/shared/other-infos";
import Description from "@/components/ui/info/description";
import Separator from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { useServer } from "@/store/server";
import { useQueryState } from "nuqs";
import PlayerControls from "../_components/player/player-controls";
import SelectServers from "../_components/select-servers";

export default function Page({
  params,
}: {
  params: Promise<{ episodeId: string }>;
}) {
  const { episodeId } = use(params);
  const [ep] = useQueryState("ep");

  // to create an full url /animeId?ep=episode_id
  const encodedEpisodesId = useMemo(
    () => episodeId + `?ep=${ep}`,
    [ep, episodeId],
  );

  const { light } = usePlayerStore();
  const { currentServer, setCurrentServer, category, setCategory } =
    useServer();
  const { setHistory, allAnimeWatched } = useHistory();

  const { data: servers } = useQuery({
    queryKey: ["ANIME_EPISODE_SERVERS", encodedEpisodesId],
    queryFn: () => getAnimeEpisodeServers(encodedEpisodesId),
  });

  const { data: animeInfo, isLoading: isInfoLoading } = useQuery({
    queryKey: [QUERY_KEY.ANIME_INFO, episodeId],
    queryFn: () => getAnimeInfoByAnimeId(episodeId),
  });

  const { data: episodes, isLoading: isEpisodesLoading } = useQuery({
    queryKey: [QUERY_KEY.ANIME_EPISODES_BY_ID, episodeId],
    queryFn: () => getAnimeEpisodesById(episodeId),
    enabled: !!episodeId,
  });

  const defaultServer = useMemo(() => {
    if (!servers) return "hd-1";
    const server =
      servers.sub.length > 0
        ? servers.sub[0].serverName
        : servers.raw[0].serverName;
    setCurrentServer(server);
    return server;
  }, [servers, setCurrentServer]);

  const defaultCategory = useMemo(() => {
    const currentCategory = !servers?.sub.length ? "raw" : "sub";
    setCategory(currentCategory);
    return currentCategory;
  }, [servers]);

  const { data, isLoading } = useQuery({
    queryKey: [
      QUERY_KEY.WATCH_ANIME_BY_EPISODE_ID,
      encodedEpisodesId,
      currentServer,
      category,
    ],
    queryFn: () =>
      getAnimeStreamingLinksByEpisodeId(
        encodedEpisodesId +
          `&server=${
            currentServer ? currentServer : defaultServer
          }&category=${category ? category : defaultCategory}`,
      ),
    enabled: !!servers && !!encodedEpisodesId && !!category && !!currentServer,
  });

  useEffect(() => {
    if (!animeInfo || !episodes || !encodedEpisodesId) return;

    const animeWatchedArray = [...(allAnimeWatched || [])];

    // Find current episode number
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
      currentTime: 0,
      duration: 0,
      date: Date.now(),
    };

    const existingAnimeIndex = animeWatchedArray.findIndex(
      (anime: any) => anime.id === episodeId,
    );

    const episodeExists = animeWatchedArray.find(
      (anime) => anime.episodeId === encodedEpisodesId,
    );

    // If the anime is already in the array, update it
    if (existingAnimeIndex !== -1) {
      animeWatchedArray[existingAnimeIndex] = {
        ...allAnimeWatched[existingAnimeIndex],
        currentEp: latestAnimeWatched.currentEp,
        episodeId: latestAnimeWatched.episodeId,
        currentTime: !!episodeExists ? episodeExists.currentTime : 0,
      };

      const [updatedAnime] = animeWatchedArray.splice(existingAnimeIndex, 1);
      animeWatchedArray.unshift(updatedAnime);
    } else {
      // If its a new anime, add to the beginning of the array
      animeWatchedArray.unshift(latestAnimeWatched);
    }
    setHistory({
      allAnimeWatched: animeWatchedArray,
    });
  }, [episodeId, animeInfo, episodes, ep]);

  return (
    <div className="relative xl:mt-16 xl:py-2">
      <div className="absolute top-0 -z-10 hidden h-full w-full overflow-hidden bg-primary/10 brightness-50 2xl:block">
        <Image
          src={animeInfo?.anime.info.poster ?? ""}
          alt={"anime poster"}
          fill
          objectFit="cover"
          loading="lazy"
          className="absolute opacity-35 mix-blend-multiply blur-lg"
        />
      </div>
      <div className="wrapper-container hidden w-full items-center gap-x-2 px-4 text-sm sm:gap-x-4 xl:px-0 2xl:my-4 2xl:flex">
        <Link href="/home">Home</Link>
        <Separator type="dot" />
        <Link href={`/category/${animeInfo?.anime.info.stats.type}`}>
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
      <div className="wrapper-container flex w-full flex-col gap-1.5 bg-primary-500 xl:px-0 3xl:flex-row">
        <div className="mx-auto h-full w-full max-w-7xl overflow-y-scroll 3xl:basis-[17%]">
          {isEpisodesLoading || !episodes ? (
            <div className="grid h-full min-h-[376px] w-full shrink-0 flex-col place-items-center lg:min-h-[590px] 3xl:min-h-[716px]">
              <BeatLoader childClassName="h-3.5 w-3.5" />
            </div>
          ) : (
            <Episodes episodes={episodes} episodeId={encodedEpisodesId} />
          )}
        </div>

        <div
          className={cn(
            "order-first mx-auto w-full max-w-7xl shrink-0 3xl:order-none 3xl:basis-[63%]",
            light && "z-[9999]",
          )}
        >
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

          <PlayerControls episodeId={encodedEpisodesId} episodes={episodes!} />

          {servers && <SelectServers {...servers} />}
        </div>
        <div className="max-h-[590px] w-full shrink-0 px-4 xl:px-0 3xl:basis-[20%]">
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

              <div className="max-h-60 w-full overflow-y-scroll">
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
}
