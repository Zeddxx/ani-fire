"use client";

import { useGetAnimeStreaming } from "@/lib/query-api";
import Hls from "hls.js";
import ArtPlayer from "artplayer";
import { useEffect, useState } from "react";
import Player from "./player";
import Option from "artplayer/types/option";
import { Loader2 } from "lucide-react";

type VideoPlayerProps = {
  episodeId: string;
  server: string;
  category: string;
  poster: string;
};

const FirePlayer = ({ episodeId, server, category, poster }: VideoPlayerProps) => {
  const { data, isLoading, isError } = useGetAnimeStreaming(
    episodeId,
    server,
    category
  );

  // The control container
  const [setUrl, setSelectedUrl] = useState<string | undefined>();
  const subtitles = data?.subtitles || [];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUrl(event.target.value);
  };

  // if (isError) return <p>Error loading video...</p>;
  useEffect(() => {
    if (data) {
      if (data.sources) {
        const uri = data.sources.find((source) => source.url);
        setSelectedUrl(uri?.url)
      }
    }
  }, [data]);

  useEffect(() => {
    if(data){
      if(data.sources) {
        setSelectedUrl(data.sources[0].url)
      }
    }
  },[data])

  function playM3u8(video: any, url: string, art: ArtPlayer) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on("destroy", () => hls.destroy());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      art.notice.show = "Unsupported playback format: m3u8";
    }
  }

  let options: Option = {
    container: ".artplayer-app",
    url: setUrl! || "",
    customType: {
      m3u8: playM3u8,
    },
    poster: poster || "",
    volume: 1,
    isLive: false,
    muted: false,
    autoplay: false,
    autoOrientation: true,
    pip: true,
    autoSize: true,
    fastForward: true,
    autoMini: false,
    screenshot: true,
    setting: true,
    loop: false,
    flip: true,
    lock: true,
    playbackRate: true,
    aspectRatio: true,
    fullscreen: true,
    fullscreenWeb: false,
    subtitleOffset: false,
    miniProgressBar: false,
    mutex: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    airplay: true,
    theme: "#E11D48",
    moreVideoAttr: {
      crossOrigin: "anonymous",
    },
    subtitle: {
      url:
        typeof subtitles !== "undefined"
          ? subtitles.find((sub) => sub.lang === "English")?.url || ""
          : "",
      type: "vtt",
      style: {
        color: "#fff",
      },
      encoding: "utf-8",
    },
  };

  if (isLoading && !setUrl) {
    return(
        <div className="xl:h-[460px] sm:h-96 h-64 w-full grid place-items-center">
            <Loader2 className="animate-spin h-6 w-6" />
        </div>
    );
  }
  return <Player
  option={options}
  subtitles={subtitles}
  className="-z-10 art-container lg:max-h-[468px] h-[60vw] md:max-h-[630px] sm:max-h-[470px] max-h-[256px] w-full"
  />;
};
export default FirePlayer;
