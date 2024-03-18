"use client";

import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality"
import Hls from "hls.js";
import ArtPlayer from "artplayer";
import { useState } from "react";
import Player from "./player";
import Option from "artplayer/types/option";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetAnimeStreamingEpisodeQuery } from "@/redux/api";

type VideoPlayerProps = {
  episodeId: string;
  poster: string;
};

const FirePlayer = ({ episodeId, poster }: VideoPlayerProps) => {

 const { category, server } = useSelector((state: RootState) => state.selectUtility)

 const { data, isLoading, isError } = useGetAnimeStreamingEpisodeQuery({
  id: episodeId,
  server: server,
  category: category,
 }, {
  refetchOnMountOrArgChange: true
 })

  // The control container
  const [setUrl, setSelectedUrl] = useState<string | undefined>();
  const subtitles = data?.tracks || [];

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
    url: data && data.status !== 500 ? data.sources[0].url : "",
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
    autoSize: false,
    fastForward: true,
    autoMini: false,
    screenshot: true,
    setting: true,
    plugins: [
      artplayerPluginHlsQuality({
        control: true,
        getResolution :(level) => level.height + 'p',
        title: 'Quality',
        auto: 'Auto'
      }),
    ],
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
          ? subtitles.find((sub) => sub.label === "English")?.file || ""
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
        <div className="aspect-video w-full grid place-items-center">
            <Loader2 className="animate-spin h-6 w-6" />
        </div>
    );
  }
  return <Player
  option={options}
  subtitles={subtitles}
  className="-z-10 art-container aspect-video"
  />;
};
export default FirePlayer;
