'use client';

import VideoPlayer from "@/components/shared/video-player";
import { useGetAnimeEpisodeServer, useGetAnimeEpisodes } from "@/lib/query-api";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

const WatchAnime = ({ params } : { params : { id: string }}) => {
  const para = useSearchParams();
  const query = params.id + "?ep=" + para.get("ep")

  const { data, isLoading, isError } = useGetAnimeEpisodeServer(query)
  const { data: episodes } = useGetAnimeEpisodes(params.id)
  console.log({ episodes });

  if (isLoading) return <p>Loading...</p>
  if(isError) return <p>Error</p>
  
  return (
    <section className="relative w-full h-auto">
      <div className="absolute w-full h-96 -z-10">
        <Image src="/assets/bg-image.jpg" alt="background image" fill className="h-full w-full blur-2xl brightness-50 object-cover" />
      </div>
        <div className="lg:flex hidden my-4 max-w-[1420px] mx-auto gap-x-1 items-center xl:px-0 px-4">
                <p className="hover:text-rose-600 text-muted">Home</p>
                <IoIosArrowForward />
                <p className="hover:text-rose-600 text-muted">TV</p>
                <IoIosArrowForward />
                <p>{params.id.split("-").join(" ")}</p>
            </div>
        <div className="max-w-[1420px] mx-auto w-full flex lg:flex-row flex-col gap-x-2 h-auto">
            <aside className="max-w-[16rem] h-[30rem] overflow-y-scroll lg:block hidden w-full">
            <div className="h-full w-full flex-wrap flex">
              {episodes?.episodes.map((episode) => (
                <p className="py-4 truncate px-2 w-full text-sm bg-neutral-800" key={episode.episodeId}>
                  {episode.number}{" "}
                  <span className="max-w-20 ml-2">{episode.title}</span>
                </p>
              ))}
            </div>
            </aside>

            <div className="w-full">
            {isLoading ? <p>Loading...</p> : (
            <VideoPlayer episodeId={data?.episodeId!} server={data?.sub[0].serverName!} category={"sub"} />
            )}
            </div>

            <p className="text-sm px-4 mt-6">No. of episodes:</p>
            <div className="w-full my-3 lg:hidden flex flex-col h-96 px-2 overflow-y-scroll">
              {episodes?.episodes.map((episode) => {
                const isCurrent = query === episode.episodeId;
                return(
                  <a href={`/watch/${episode.episodeId}`} className={cn("py-4 group hover:bg-neutral-700 border-b text-sm px-2 flex gap-x-2 bg-neutral-800", isCurrent && "bg-neutral-800 text-rose-500")} key={episode.episodeId}>
                    <p className="">{episode.number}</p>
                    <p className="group-hover:text-rose-500 duration-200">{episode.title}</p>
                  </a>
                )
              })}
            </div>

            <aside className="lg:block h-60 max-w-[18rem] w-full bg-gray-400">

            </aside>
        </div>
    </section>
  )
}
export default WatchAnime