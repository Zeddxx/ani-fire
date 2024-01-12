"use client";

import { useGetAnimeStreaming } from "@/lib/query-api";
import { useRef, useState } from "react";
import { ReactPlayerProps } from "react-player";
import ReactPlayer from "react-player";
import BaseReactPlayer from "react-player/base";

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
  const [setUrl, setSelectedUrl] = useState<string | undefined>(() => {
    if (data?.sources && data.sources.length > 0) {
      return data.sources[0].url;
    }
    return undefined; // or a default value if you prefer
  });

  console.log(setUrl);

  const playerRef = useRef<BaseReactPlayer<ReactPlayerProps>>(null);

  const subtitles = data?.subtitles || [];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUrl(event.target.value);
  };

  // if (isError) return <p>Error loading video...</p>;
  if(isLoading) return <p>Loading...</p>

  return (
    <>
      <div className="w-full bg-black h-auto relative video-container">
        {isLoading && !setUrl ? (
          <p>Loading video....</p>
        ) : (
          <ReactPlayer
            ref={playerRef}
            url={setUrl}
            className="video-element text-primary"
            width={"100%"}
            height={393}
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
                  default: index === 1, // Set the first subtitle as default
                })),
              },
            }}
          />
        )}

        <select className="text-black" name="" onChange={handleChange} id="">
          {data?.sources?.map((source, index) => (
            <option
              defaultValue={index === 0 ? source.url : ""}
              value={source.url}
              key={index}
            >
              server {index}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
export default VideoPlayer;
