"use client";

import {
  getAnimeEpisodesById,
  getAnimeEpisodeServers,
  getAnimeInfoByAnimeId,
  getAnimeStreamingLinksByEpisodeId,
} from "@/api/anime";
import AniFirePlayer from "@/components/shared/ani-fire-player";
import EpisodeContainer from "@/components/shared/episode-container";
import { QUERY_KEY } from "@/constants/query-key";
import { useHistory } from "@/store/history";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const WatchAnimePage = ({
  params: { episodeId },
  searchParams: { ep },
}: {
  params: { episodeId: string };
  searchParams: { [key: string]: string };
}) => {
  const encodedEpisodesId = episodeId + `?ep=${ep}`;
  const { setHistory, allAnimeWatched } = useHistory();

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
    queryKey: [QUERY_KEY.WATCH_ANIME_BY_EPISODE_ID, episodeId],
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
    enabled: !isServerLoading && !!encodedEpisodesId,
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

  if (isLoading) return <p>Is episodes streaming loading...</p>;

  if (!data || !episodes) return null;

  return (
    <div className="">
      <div className="wrapper-container px-4 flex 3xl:flex-row flex-col gap-6 w-full">
        <div className="">
          <EpisodeContainer episodes={episodes} />
        </div>
        <div className="3xl:basis-[60%] max-w-6xl mx-auto w-full shrink-0">
          <AniFirePlayer
            episodeId={encodedEpisodesId}
            episodes={episodes}
            {...data}
          />
        </div>
        <div className="3xl:basis-[20%] w-full shrink-0 bg-white"></div>
      </div>
    </div>
  );
};

export default WatchAnimePage;
