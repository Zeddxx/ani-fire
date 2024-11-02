"use client";

import {
  getAnimeEpisodesById,
  getAnimeEpisodeServers,
  getAnimeStreamingLinksByEpisodeId,
} from "@/api/anime";
import AniFirePlayer from "@/components/shared/ani-fire-player";
import { useQuery } from "@tanstack/react-query";

const WatchAnimePage = ({
  params: { episodeId },
  searchParams: { ep },
}: {
  params: { episodeId: string };
  searchParams: { [key: string]: string };
}) => {
  const encodedEpisodesId = episodeId + `?ep=${ep}`;
  const { data: servers, isLoading: isServerLoading } = useQuery({
    queryKey: ["ANIME_EPISODE_SERVERS", episodeId],
    queryFn: () => getAnimeEpisodeServers(encodedEpisodesId),
  });

  const { data: episodes, isLoading: isEpisodesLoading } = useQuery({
    queryKey: ["ANIME_EPISODES_BY_ID", episodeId],
    queryFn: () => getAnimeEpisodesById(episodeId),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["WATCH_ANIME_BY_EPISODE_ID", episodeId],
    queryFn: () =>
      getAnimeStreamingLinksByEpisodeId(
        encodedEpisodesId + `&server=${servers?.sub[0].serverName}`
      ),
    enabled: !isServerLoading,
  });

  if (isLoading) return <p>Is episodes streaming loading...</p>;

  if (!data || !episodes) return null;

  return (
    <div className="">
      <div className="wrapper-container px-4 flex gap-6 w-full">
        <div className="basis-[20%] shrink-0 bg-white"></div>
        <AniFirePlayer
          episodeId={encodedEpisodesId}
          episodes={episodes}
          {...data}
        />
        <div className="basis-[20%] shrink-0 bg-white"></div>
      </div>
    </div>
  );
};

export default WatchAnimePage;
