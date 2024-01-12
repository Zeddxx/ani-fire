"use client";

import Episodes from "@/components/shared/episodes";
import VideoPlayer from "@/components/shared/video-player";
import { Button } from "@/components/ui/button";
import { useGetAnimeEpisodeServer, useGetAnimeEpisodes } from "@/lib/query-api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const WatchAnime = ({ params }: { params: { id: string } }) => {
  const para = useSearchParams();
  const episodeNumber = para.get("ep");
  const query = params.id + "?ep=" + para.get("ep");

  const { data, isLoading, isError } = useGetAnimeEpisodeServer(query);
  const { data: episodes, isLoading: isEpisodeLoading } = useGetAnimeEpisodes(params.id);
  const [ currentServer, setCurrentServer] = useState("vidstreaming")

  console.log(currentServer);

  const [selectedServer, setSelectedServer] = useState<string | null>(data?.sub[0].serverName || null);
  if(isEpisodeLoading) return <p>Loading episodes...</p>

  console.log({ data });

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
          <Episodes screen="PC" query={query} episodes={episodes?.episodes!} moreEpisodes={episodes?.totalEpisodes!} />
          )}

        {/* Video player --> */}
        <div className="w-full h-full">
          {/* TODO: make loading a rectangle of height same as the video height */}
          {isLoading && !episodeNumber ? (
            <p>Loading...</p>
          ) : (
            <VideoPlayer
              episodeId={data?.episodeId!}
              server={currentServer || ""}
              category={"sub"}
            />
          )}

          {/* <select onChange={handleChange} className="text-black" value={selectedServer || ""} name="server" id="servername">
            <option value="select server">
              select
            </option>
            {data?.sub.map((server) => (
              <option value={server.serverName} key={server.serverName}>
                {server.serverName}
              </option>
            ))}
          </select> */}

          <div className="flex gap-4">
            {data?.sub.map((server) => (
              <Button onClick={() => setCurrentServer(server.serverName)} key={server.serverName}>
                {server.serverName}
              </Button>
            ))}
          </div>
        </div>

        {/* Episodes numbers for mobile 📱 */}
          <Episodes screen="Mobile" query={query} episodes={episodes?.episodes!} moreEpisodes={episodes?.totalEpisodes!} />

        {/* TODO: add a brief info of the anime */}
        <aside className="xl:block h-60 max-w-[18rem] w-full bg-gray-400"></aside>
      </div>
    </section>
  );
};
export default WatchAnime;
