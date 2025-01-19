"use client";

import { cn } from "@/lib/utils";
import { useHistory } from "@/store/history";
import { usePlayerStore } from "@/store/player-store";
import { AnimeEpisodes } from "@/types/anime";
import ArtPlayer from "artplayer";
import artPlayerPluginChromecast from "artplayer-plugin-chromecast";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface PlayerProps {
  option: ArtPlayer["Option"];
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
}

ArtPlayer.LOG_VERSION = false;

const Player = ({
  option,
  getInstance,
  subtitles,
  className,
  outro,
  intro,
  episodeId,
  episodes,
  url,
}: PlayerProps) => {
  const artRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { autoNext, autoSkip } = usePlayerStore();
  const { setCurrentTime, allAnimeWatched } = useHistory();

  const time = useMemo(() => {
    return (
      allAnimeWatched.find((anime) => anime.episodeId === episodeId)
        ?.currentTime ?? 0
    );
  }, []);

  const skipTimeHighlight = () => {
    if (intro && outro) {
      const output = [];
      if (intro) {
        output.push({
          text: "Opening start",
          time: intro.start,
        });

        output.push({
          text: "Opening end",
          time: intro.end,
        });

        if (outro) {
          output.push({
            text: "Ending start",
            time: outro.start,
          });

          output.push({
            text: "Ending end",
            time: outro.end,
          });
        }

        return output;
      } else if (!outro || !intro) {
        return [];
      }

      return [];
    }
  };

  const handleTimeUpdate = useCallback((art: ArtPlayer) => {
    const currentTime = art.currentTime;
    setCurrentTime(episodeId, currentTime, art.duration);
  }, []);

  const handleVideoUpdate = useCallback(
    (art: ArtPlayer) => {
      const currentTime = art.currentTime;
      let isAutoSkip = false;

      if (typeof window !== "undefined") {
        const playerStore = localStorage.getItem("player_store");
        if (playerStore) {
          isAutoSkip = JSON.parse(playerStore).state.autoSkip;
        }
      }
      if (isAutoSkip) {
        if (intro && currentTime >= intro.start && currentTime <= intro.end) {
          art.seek = intro.end + 1;
          art.notice.show = "Skipped Opening";
        } else if (
          outro &&
          currentTime >= outro.start &&
          currentTime <= outro.end
        ) {
          art.seek = outro.end + 1;
          art.notice.show = "Skipped ending";
        } else {
          return;
        }
      } else {
        if (intro && currentTime >= intro.start && currentTime <= intro.end) {
          if (!art.controls["opening"]) {
            if (art.controls["ending"]) {
              art.controls.remove("ending");
            }

            art.controls.add({
              name: "opening",
              position: "top",
              html: '<button class="app-skip-button">Skip opening</button>',
              click: function () {
                art.seek = intro.end;
                art.notice.show = "Skipped opening";
              },
            });
          }
        } else if (
          outro &&
          currentTime >= outro.start &&
          currentTime <= outro.end
        ) {
          if (!art.controls["ending"]) {
            if (art.controls["opening"]) {
              art.controls.remove("opening");
            }

            art.controls.add({
              name: "ending",
              position: "top",
              html: '<button class="app-skip-button">Skip ending</button>',
              click: function () {
                art.seek = outro.end;
                art.notice.show = "Skipped ending";
              },
            });
          }
        } else {
          if (art.controls["opening"]) {
            art.controls.remove("opening");
          }
          if (art.controls["ending"]) {
            art.controls.remove("ending");
          }
        }
      }
    },
    [autoSkip],
  );

  const handleOnVideoEnd = useCallback(
    (art: ArtPlayer) => {
      let isAutoNext = false;

      if (typeof window !== "undefined") {
        const playerStore = localStorage.getItem("player_store");
        if (playerStore) {
          isAutoNext = JSON.parse(playerStore).state.autoNext;
        }
      }
      if (isAutoNext) {
        const currentEpisodeIndex = episodes.episodes.findIndex(
          (episode) => episode.episodeId === episodeId,
        );

        if (currentEpisodeIndex === -1) {
          console.error("Episode not found");
          return;
        }

        const isNextEpisodeExist =
          Number(currentEpisodeIndex) + 1 !== episodes.totalEpisodes;

        if (!isNextEpisodeExist) {
          art.notice.show = "No more episode!";
        } else {
          const nextEpisode =
            episodes.episodes[currentEpisodeIndex + 1].episodeId;
          router.push(`/watch/${nextEpisode}`);
          art.notice.show = "Next episode >";
        }
      }
    },
    [autoNext],
  );

  useEffect(() => {
    const art = new ArtPlayer({
      ...option,
      container: artRef.current!,
      settings: [
        {
          html: "Subtitle",
          tooltip: "English",
          selector: subtitles?.map((sub) => ({
            default: sub.label === "English",
            html: sub.label,
            url: sub.file,
          })),
          onSelect: function (item) {
            art.subtitle.switch(item.url, {
              name: item.html,
            });
            return item.html;
          },
        },
      ],
      contextmenu: [
        {
          html: `AniFire ${new Date().getFullYear()}`,
          click: function () {
            window.open("/");
          },
        },
      ],
      plugins: [
        artplayerPluginHlsQuality({
          control: false,
          setting: true,
          auto: "Auto",
          getResolution: (level) => {
            return level.height !== "unknown" ||
              level.height === "" ||
              !level.height
              ? level.height + "p"
              : "Auto";
          },
        }),
        artPlayerPluginChromecast({}),
      ],
      highlight: skipTimeHighlight(),
    });

    art.on("resize", () => {
      art.subtitle.style({
        fontSize: art.height * 0.05 + "px",
      });
    });

    art.on("ready", () => {
      art.play();
      if (navigator.userAgent.includes("Firefox")) {
        art.controls.remove("chromecast");
      }
    });

    art.on("subtitleAfterUpdate", (cue: any) => {
      art.template.$subtitle.innerHTML = cue[0].text;
    });

    art.on("ready", () => {
      // seek to the previous time...
      art.seek = time;
    });

    art.on("video:timeupdate", () => handleVideoUpdate(art));
    art.on("video:ended", () => handleOnVideoEnd(art));

    art.on("video:timeupdate", () => {
      handleTimeUpdate(art);
    });

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [url]);

  return <div ref={artRef} className={cn("", className)} />;
};

export default Player;
