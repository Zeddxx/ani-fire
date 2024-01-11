"use client";

import { useGetAnimeStreaming } from "@/lib/query-api";
import { useEffect, useRef, useState } from "react";
import { ReactPlayerProps } from "react-player";
import ReactPlayer from "react-player";
import { IoPlaySharp, IoPause } from "react-icons/io5";
import BaseReactPlayer from "react-player/base";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import { formatTime, cn } from "@/lib/utils";
import { GoUnmute, GoMute } from "react-icons/go";

import { Slider } from "@mui/material";

type VideoPlayerProps = {
  episodeId: string;
  server: string;
  category: string;
};

type PlayingProps = {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  seeking: boolean;
  buffer: boolean;
};

let count = 0;

const VideoPlayer = ({ episodeId, server, category }: VideoPlayerProps) => {
  const { data } = useGetAnimeStreaming(episodeId, server, category);

  // The control container
  const controlRef = useRef<HTMLDivElement>(null);

  const [fullscreenMode, setFullscreenMode] = useState<boolean>(false);
  const [isShowControls, setIsShowControls] = useState<boolean>(false);

  // Playing props
  const [videoState, setVideoState] = useState<PlayingProps>({
    playing: false,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    buffer: true,
  });

  const playerRef = useRef<BaseReactPlayer<ReactPlayerProps>>(null);

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const subtitles = data?.subtitles || [];

  // TODO: To give the option to select the server!
  const defaultUrl = data?.sources[0].url || data?.sources[0].url || "";

  // Formating the time that video is giving
  const formatCurrentTime = formatTime(currentTime);
  const formatDuration = formatTime(duration);

  // All controll functions here
  const handlePlay = () => {
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const handleMute = () => {
    setVideoState({ ...videoState, muted: !videoState.muted})
  }

  const handleSkip = (type: string) => {
    if (playerRef.current) {
      if (type === "forward") {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
      } else playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    }

    return;
  };

  const progressHandler = (state: any) => {
    if (count > 3) {
      console.log("close");
    }
    if (!videoState.seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (e: any, value: any) => {
    console.log(value);
    setVideoState({ ...videoState, seeking: false });
    playerRef.current?.seekTo(value / 100);
  };

  const seekMouseUpHandler = (e: any, value: any) => {
    console.log(value);

    setVideoState({ ...videoState, seeking: false });
    playerRef.current?.seekTo(value / 100);
  };

  const onSeekMouseDownHandler = (e: any) => {
    setVideoState({ ...videoState, seeking: true });
  };

  useEffect(() => {
    if (isShowControls) {
      setTimeout(() => {
        setIsShowControls(false);
      }, 3000);
    }

    const videoEl = document.querySelector(".video-element")

    const handleTap = () => {
      setIsShowControls(true)
    }

    videoEl?.addEventListener("click", handleTap)
  }, [isShowControls]);

  useEffect(() => {
    const videoContainer = document.querySelector(".video-container")
    const toggleFullscreenMode = () => {
      if(document.fullscreenElement != null){
        videoContainer?.requestFullscreen()
      }else {
        document.exitFullscreen()
      }
    }
    document.addEventListener("fullscreenchange", toggleFullscreenMode)
  })

  console.log({ videoState, duration: playerRef.current?.getDuration() });

  return (
    <div
      className="w-full h-auto relative video-container"
      onMouseEnter={() => setIsShowControls(true)}
      onMouseLeave={() => setIsShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={defaultUrl}
        className="video-element"
        width={"100%"}
        height={"100%"}
        playing={videoState.playing}
        onProgress={progressHandler}
        muted={videoState.muted}
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

      {/* Controls here! */}
      <div
        ref={controlRef}
        className={cn(
          "absolute top-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent h-full w-full z-10",
          isShowControls ? "block" : "hidden",
          !videoState.playing && "block"
        )}
      >
        <button
          onClick={handlePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {videoState.playing ? (
            <IoPause className="h-11 w-11 text-rose-500" />
          ) : (
            <IoPlaySharp className="h-10 w-10 text-rose-500" />
          )}
        </button>

        <div className="flex w-[95%] absolute left-1/2 -translate-x-1/2 bottom-20 justify-between">
          <p>{formatCurrentTime}</p>
          <p>{formatDuration}</p>
        </div>

        <div className="absolute w-[95%] left-1/2 -translate-x-1/2 bottom-12">
          <Slider
            sx={{
              width: "100%",
              color: "#F43F5E",
              "& .MuiSlider-thumb": {
                height: "10px",
                width: "10px",
              },
            }}
            min={0}
            max={100}
            value={videoState.played * 100}
            onChange={seekHandler}
            onChangeCommitted={seekMouseUpHandler}
            onMouseDown={onSeekMouseDownHandler}
          />
        </div>
        <div className="absolute px-4 w-full h-16 flex justify-between items-center bottom-0 left-0">
          <div className="flex gap-x-5">
            <button onClick={handlePlay} className="">
              {videoState.playing ? (
                <IoPause className="h-6 w-6 text-rose-500" />
              ) : (
                <IoPlaySharp className="h-6 w-6 text-rose-500" />
              )}
            </button>

            <div className="flex gap-x-2">
              <button onClick={() => handleSkip("backward")}>
                <AiFillBackward className="h-7 w-7 text-rose-500" />
              </button>
              <button onClick={() => handleSkip("forward")}>
                <AiFillForward className="h-7 w-7 text-rose-500" />
              </button>
            </div>

            <button
              onClick={handleMute}
            >
              {videoState.muted ? (
                <GoMute className="h-6 w-6 text-rose-500" />
              ) : (
                <GoUnmute className="h-6 w-6 text-rose-500" />
              )}
            </button>
          </div>

          <button onClick={() => setFullscreenMode(!fullscreenMode)}>
            screen
          </button>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;
