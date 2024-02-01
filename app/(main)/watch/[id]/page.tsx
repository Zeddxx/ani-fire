"use client";

import AnimeInfo from "@/components/anime-info";
import Episodes from "@/components/shared/episodes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IoPlayBackSharp, IoPlayForwardSharp } from "react-icons/io5";
import {
  useGetAnimeEpisodeServer,
  useGetAnimeEpisodes,
  useGetAnimeInfo,
} from "@/lib/query-api";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FirePlayer from "@/components/players/fire-player";
import AnimeCard from "@/components/shared/anime-card";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";

const WatchAnime = ({ params }: { params: { id: string } }) => {
  const para = useSearchParams();
  const episodeNumber = para.get("ep");
  const query = params.id + "?ep=" + para.get("ep");
  const server = para.get("server");

  const { data, isLoading, isError } = useGetAnimeEpisodeServer(query);
  const { data: episodes, isLoading: isEpisodeLoading } = useGetAnimeEpisodes(
    params.id
  );

  const { setAnimeWatch } = useLocalStorage()
  const { data: animeInfo, isLoading: isInfoLoading } = useGetAnimeInfo(
    params.id
  );

  const description = animeInfo?.anime.info.description;

  const handleClick = (server: string) => {
    return window.location.assign(
      `/watch/${query}&server=${server}`
    );
  };

  const isCurrentEpisode = episodes?.episodes.filter(
    (episode) => episode.episodeId === query
  );

  const currentEpisodeIndex = episodes?.episodes.findIndex(
    (ep) => ep.episodeId === query
  );

  const isNextEpisode =
    Number(currentEpisodeIndex) + 1 !== episodes?.totalEpisodes;
  const isPrevEpisode = Number(currentEpisodeIndex) + 1 !== 1;

  const nextEpisode =
    isNextEpisode &&
    episodes?.episodes[Number(currentEpisodeIndex) + 1].episodeId;
  const prevEpisode =
    isPrevEpisode &&
    episodes?.episodes[Number(currentEpisodeIndex) - 1].episodeId;

    useEffect(() => {
        if(animeInfo && episodes) {
          setAnimeWatch({
            episodeId: query,
            episodeNumber: currentEpisodeIndex! + 1,
            poster: animeInfo?.anime.info.poster,
            title: animeInfo?.anime.info.name
          })
        }
    })

  const handlePrev = () => {
    return window.location.assign(`/watch/${prevEpisode}`);
  };

  const handleNext = () => {
    return window.location.assign(`/watch/${nextEpisode}`);
  };

  if (isEpisodeLoading) return <p>Loading episodes...</p>;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <section className="relative w-full h-auto">
      {/* Flow Tree */}
      <div className="flex text-sm my-4 max-w-screen-2xl mx-auto gap-x-1 items-center px-4">
        {/* TODO: make it working as link element */}
        <Link
          href="/home"
          title="Home"
          className="hover:text-rose-600 text-secondary-foreground dark:text-primary-foreground"
        >
          Home
        </Link>
        <span className="h-1 w-1 flex rounded-full bg-muted-foreground mx-2"></span>
        <a
          href="/anime/tv"
          title="TV"
          className="hover:text-rose-600 text-secondary-foreground dark:text-primary-foreground"
        >
          TV
        </a>
        <span className="h-1 w-1 flex rounded-full bg-muted-foreground mx-2"></span>

        {/* TODO: To fix the episode code here */}
        <a href={`/${animeInfo?.anime.info.id}`} className="">{animeInfo?.anime.info.name}</a>
      </div>

      {/* main episodes no. and video player here! */}
      <div className="2xl:max-w-screen-2xl max-w-6xl px-4 mx-auto w-full flex 2xl:flex-row flex-col h-auto">
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
          {isLoading && !episodeNumber ? (
            <div className="h-64 w-full bg-black"></div>
          ) : (
            <FirePlayer
            poster={animeInfo?.anime.info.poster!}
            episodeId={data?.episodeId!}
            server={!server ? "vidstreaming" : server}
            category={"sub"}
            />
          )}

          <div className="w-full gap-x-2 py-4 h-auto flex justify-end items-center">
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={handlePrev}
              disabled={!isPrevEpisode}
            >
              <IoPlayBackSharp className="h-4 w-4 mr-2" /> Prev
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={handleNext}
              disabled={!isNextEpisode}
            >
              Next <IoPlayForwardSharp className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <div className="flex 2xl:flex-row flex-col gap-x-4 py-3">
            <div className="2xl:w-1/2 w-full flex flex-col bg-primary p-3 items-center justify-center text-center">
              <p className="text-sm text-white inline">
                You are watching{" "}
                <span className="font-semibold">
                  Episode {!!isCurrentEpisode && isCurrentEpisode[0].number}
                </span>{" "}
                If current server doesnt work please try other servers beside.
              </p>
            </div>
            <div className="2xl:mt-0 mt-4">
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

              {!!data && data?.dub.length > 0 && (
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
              )}
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
        <aside className="2xl:block h-auto 2xl:max-w-[23rem] w-full flex gap-x-4">
          {isInfoLoading && !animeInfo ? (
            <p>Loading Anime info.</p>
          ) : (
            <AnimeInfo
              page="Watching"
              description={description}
              data={animeInfo!}
            />
          )}
        </aside>
      </div>

      <div className="2xl:max-w-screen-2xl max-w-6xl mx-auto px-4 w-full h-auto">
        <h3 className="text-3xl text-primary font-medium">Related Anime</h3>

        <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
          {animeInfo?.relatedAnimes.map((anime, index) => (
            <AnimeCard type="Normal" anime={anime} key={anime.id + index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default WatchAnime;
