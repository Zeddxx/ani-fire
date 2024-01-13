"use client";

import AnimeInfo from "@/components/anime-info";
import Episodes from "@/components/shared/episodes";
import VideoPlayer from "@/components/shared/video-player";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useGetAnimeEpisodeServer,
  useGetAnimeEpisodes,
  useGetAnimeInfo,
} from "@/lib/query-api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const WatchAnime = ({ params }: { params: { id: string } }) => {
  const para = useSearchParams();
  const episodeNumber = para.get("ep");
  const query = params.id + "?ep=" + para.get("ep");
  const server = para.get("server");

  const { data, isLoading, isError } = useGetAnimeEpisodeServer(query);
  const { data: episodes, isLoading: isEpisodeLoading } = useGetAnimeEpisodes(
    params.id
  );
  const { data: animeInfo, isLoading: isInfoLoading } = useGetAnimeInfo(
    params.id
  );
  console.log(animeInfo);
  const description = animeInfo?.anime.info.description

  const handleClick = (server: string) => {
    return window.location.assign(
      `/watch/one-piece-100?ep=2416&server=${server}`
    );
  };

  const isCurrentEpisode = episodes?.episodes.filter(
    (episode) => episode.episodeId === query
  );

  if (isEpisodeLoading) return <p>Loading episodes...</p>;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <section className="relative w-full pt-20 h-auto">
      {/* Background image */}
      <div className="absolute w-full left-1/2 -translate-x-1/2 h-96 -z-10">
        <Image
          src="/assets/bg-image.jpg"
          alt="background image"
          fill
          className="h-full w-full blur-2xl brightness-50 object-cover"
        />
      </div>

      {/* Flow Tree */}
      <div className="lg:flex text-sm hidden my-4 max-w-screen-2xl mx-auto gap-x-1 items-center px-4">
        {/* TODO: make it working as link element */}
        <p className="hover:text-rose-600 text-primary-foreground">Home</p>
        <span className="h-1 w-1 flex rounded-full bg-muted-foreground mx-2"></span>
        <p className="hover:text-rose-600 text-primary-foreground">TV</p>
        <span className="h-1 w-1 flex rounded-full bg-muted-foreground mx-2"></span>

        {/* TODO: To fix the episode code here */}
        <p>{params.id.split("-").join(" ")}</p>
      </div>

      {/* main episodes no. and video player here! */}
      <div className="max-w-screen-2xl px-4 mx-auto w-full flex xl:flex-row flex-col h-auto">
        {isEpisodeLoading && !episodes ? (
          <p>Loading...</p>
        ) : (
          <Episodes
            screen="PC"
            query={query}
            episodes={episodes?.episodes!}
            moreEpisodes={episodes?.totalEpisodes!}
          />
        )}

        {/* Video player --> */}
        <div className="w-full h-full">
          {/* TODO: make loading a rectangle of height same as the video height */}
          {isLoading && !episodeNumber ? (
            <div className="h-64 w-full bg-black"></div>
          ) : (
            <VideoPlayer
              episodeId={data?.episodeId!}
              server={!server ? "vidstreaming" : server}
              category={"sub"}
            />
          )}
          <div className="flex lg:flex-row flex-col gap-x-4 py-3">
            <div className="lg:w-1/2 w-full flex flex-col bg-primary p-3 items-center justify-center text-center">
              <p className="text-sm text-black inline">
                You are watching{" "}
                <span className="font-semibold">
                  Episode {!!isCurrentEpisode && isCurrentEpisode[0].number}
                </span>{" "}
                If current server doesnt work please try other servers beside.
              </p>
            </div>
            <div className="lg:mt-0 mt-4">
              <div className="flex items-center gap-x-4 mb-4">
                <p className="text-sm">Sub: </p>
                <div className="flex gap-4 flex-wrap">
                  {data?.sub.map((server) => (
                    <Button
                      size="sm"
                      onClick={() => handleClick(server.serverName)}
                      key={server.serverName}
                    >
                      {server.serverName}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator className="w-full" />
              <div className="flex gap-x-4 mt-4 items-center">
                <p className="text-sm">Dub:</p>
                <div className="flex gap-4 flex-wrap">
                  {data?.dub.map((server) => (
                    <Button
                      size="sm"
                      onClick={() => handleClick(server.serverName)}
                      key={server.serverName}
                    >
                      {server.serverName}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes numbers for mobile 📱 */}
        <Episodes
          screen="Mobile"
          query={query}
          episodes={episodes?.episodes!}
          moreEpisodes={episodes?.totalEpisodes!}
        />

        {/* TODO: add a brief info of the anime */}
        <aside className="xl:block max-h-[30rem] h-auto xl:max-w-[23rem] w-full flex gap-x-4">
          <div className=""></div>
          <div className="">
            <AnimeInfo page="Watching" description={description} data={animeInfo!} />
          </div>
        </aside>
      </div>
    </section>
  );
};
export default WatchAnime;
