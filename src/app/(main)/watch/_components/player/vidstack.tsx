import { useHistory } from "@/store/history";
import { usePlayerStore } from "@/store/player-store";
import { AnimeEpisodes } from "@/types/anime";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Menu,
  Poster,
  Track,
  useMediaStore,
  useVideoQualityOptions,
} from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";

interface PlayerProps {
  getInstance?: any;
  url: string;
  subtitles: [
    {
      file: string;
      kind: string;
      label: string;
    },
  ];
  intro: {
    start: number;
    end: number;
  };
  outro: {
    start: number;
    end: number;
  };
  className: string;
  episodes: AnimeEpisodes;
  episodeId: string;
  poster: string;
}

const VidstackPlayer = ({
  className,
  episodeId,
  episodes,
  intro,
  outro,
  subtitles,
  url,
  getInstance,
  poster,
}: PlayerProps) => {
  const player = useRef<MediaPlayerInstance>(null);

  const { autoSkip } = usePlayerStore();
  const { allAnimeWatched, setCurrentTime } = useHistory();
  const { realCurrentTime } = useMediaStore(player);

  const time = useMemo(() => {
    return (
      allAnimeWatched.find((anime) => anime.episodeId === episodeId)
        ?.currentTime ?? 0
    );
  }, []);

  useEffect(() => {
    player.current!.startLoading();

    player.current!.startLoadingPoster();
  }, []);

  useEffect(() => {
    player.current!.currentTime = time;
  }, [time]);

  useEffect(() => {
    if (autoSkip) {
      if (realCurrentTime > intro.start && realCurrentTime < intro.end) {
        player.current!.currentTime = intro.end;
      } else if (realCurrentTime > outro.start && realCurrentTime < outro.end) {
        player.current!.currentTime = outro.end;
      }
    }
  }, [autoSkip, realCurrentTime]);

  const handleTimeUpdate = useCallback(() => {
    const currentTime = player.current!.currentTime;
    setCurrentTime(episodeId, currentTime, player.current!.duration);
  }, []);

  return (
    <MediaPlayer
      src={url}
      className={className}
      viewType="video"
      streamType="on-demand"
      logLevel="debug"
      crossOrigin
      playsInline
      ref={player}
      autoPlay
      onTimeUpdate={handleTimeUpdate}
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md bg-black object-cover opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src={poster}
          alt="Anime Poster"
        />
      </MediaProvider>

      <PlyrLayout
        className="[--plyr-captions-background:rgba(0,0,0,0.7)] [--plyr-captions-text-color:#fff] [--plyr-captions-text-stroke:#000] [--plyr-progress-live-edge-color:#201f31] [--plyr-progress-marker-background:#f9700b] [--plyr-progress-marker-width:5px] [--plyr-tooltip-color:#000]"
        markers={[
          {
            label: "Intro Starts",
            time: intro.start,
          },
          {
            label: "Intro Ends",
            time: intro.end,
          },
          {
            label: "Outro Starts",
            time: outro.start,
          },
          {
            label: "Outro Ends",
            time: outro.end,
          },
        ]}
        icons={plyrLayoutIcons}
      />
      {subtitles.map((subtitle) => {
        if (subtitle.kind !== "captions") return null;
        return (
          <Track
            key={subtitle.label}
            default={subtitle.label === "English" || false}
            src={subtitle.file}
            label={subtitle.label}
            kind="captions"
          />
        );
      })}
    </MediaPlayer>
  );
};

export default memo(VidstackPlayer);

function VideoQualitySubmenu() {
  const options = useVideoQualityOptions({ auto: true, sort: "descending" });

  const currentQualityHeight = options.selectedQuality?.height;
  const hint =
    options.selectedValue !== "auto" && currentQualityHeight
      ? `${currentQualityHeight}p`
      : `Auto${currentQualityHeight ? ` ${currentQualityHeight}p` : ""}`;

  return (
    <Menu.Root>
      <Menu.Button disabled={options.disabled}>Quality ({hint})</Menu.Button>
      <Menu.Content>
        <Menu.RadioGroup value={options.selectedValue}>
          {options.map(({ quality, label, value, bitrateText, select }) => (
            <Menu.Radio value={value} onSelect={select} key={value}>
              {label}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}
