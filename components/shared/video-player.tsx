"use client";

import { useGetAnimeStreaming } from "@/lib/query-api";
import { useEffect, useRef, useState } from "react";
import { ReactPlayerProps } from "react-player";
import ReactPlayer from "react-player";
import BaseReactPlayer from "react-player/base";
import { BiLoaderCircle } from "react-icons/bi";

type VideoPlayerProps = {
  episodeId: string;
  server: string;
  category: string;
};

const VideoPlayer = ({ episodeId, server, category }: VideoPlayerProps) => {
  const { data, isLoading, isError } = useGetAnimeStreaming(
    episodeId,
    server,
    category
  );

  // The control container
  const [setUrl, setSelectedUrl] = useState<string | undefined>();
  const [error, setError] = useState("")

  const playerRef = useRef<BaseReactPlayer<ReactPlayerProps>>(null);

  const subtitles = data?.subtitles || [];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUrl(event.target.value);
  };

  // if (isError) return <p>Error loading video...</p>;
  useEffect(() => {
    if(data){
      if(data.sources) {
        setSelectedUrl(data.sources[0].url)
      }
    }
  },[data])

  return (
    <>
      <div className="w-full flex justify-center bg-black h-auto relative video-container">
        {isLoading && !setUrl ? (
          <div className="sm:h-96 h-60 w-full bg-black grid place-items-center">
            <BiLoaderCircle className="animate-spin h-12 w-12 text-white" />
          </div>
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={setUrl || ""}
            className="video-element text-primary"
            minwidth={"100%"}
            maxwidth={"820px"}
            width={"100%"}
            onError={() => setError("Video playing error occurred!")}
            height={"100%"}
            minheight={393}
            maxheight={462}
            controls
            config={{
              file: {
                attributes: {
                  crossOrigin: "true",
                },
                forceHLS: true,
                tracks: subtitles.map((subtitle, index) => ({
                  kind: "subtitles",
                  src: subtitle.url,
                  label: subtitle.lang,
                  srcLang: subtitle.lang,
                  default: index === 1 // Set the first subtitle as default
                })),
              },
            }}
          />
        )}
        {/* <select className="text-black" name="" onChange={handleChange} id="">
          {data?.sources?.map((source, index) => (
            <option
              defaultValue={index === 0 ? source.url : ""}
              value={source.url}
              key={index}
            >
              server {index}
            </option>
          ))}
        </select> */}
      </div>
    </>
  );
};
export default VideoPlayer;
