"use client";

import { useGetAnimeStreaming } from "@/lib/query-api";
import Hls from "hls.js";
import type ArtPlayer from "artplayer";
import { useEffect, useState } from "react";
import Player from "./player";
import Option from "artplayer/types/option";
import { Loader2 } from "lucide-react";

type VideoPlayerProps = {
  episodeId: string;
  server: string;
  category: string;
};

const FirePlayer = ({ episodeId, server, category }: VideoPlayerProps) => {
  const { data, isLoading, isError } = useGetAnimeStreaming(
    episodeId,
    server,
    category
  );

  const uri = data?.sources.find((url) => url.url);

  // The control container
  const [setUrl, setSelectedUrl] = useState<string | undefined>();
  const [error, setError] = useState("");

  const subtitles = data?.subtitles || [];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUrl(event.target.value);
  };

  // if (isError) return <p>Error loading video...</p>;
  useEffect(() => {
    if (data) {
      if (data.sources) {
        setSelectedUrl(data.sources[0].url || data.sources[1].url);
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
    url: uri?.url!,
    customType: {
      m3u8: playM3u8,
    },
    poster: "",
    volume: 1,
    isLive: false,
    muted: false,
    autoplay: false,
    type: "m3u8",
    autoOrientation: true,
    pip: true,
    autoSize: false,
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
    miniProgressBar: true,
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
          ? subtitles.find((sub) => sub.lang === "English")?.url
          : "",
      type: "vtt",
      style: {
        color: "#fff",
      },
      encoding: "utf-8",
    },
  };

  if (isLoading) {
    return(
        <div className="xl:h-[460px] sm:h-96 h-64 w-full grid place-items-center">
            <Loader2 className="animate-spin h-6 w-6" />
        </div>
    );
  }
  return <Player option={options} className="xl:h-[460px] -z-10 md:h-[520px] sm:h-96 h-60 w-full" />;
};
export default FirePlayer;
