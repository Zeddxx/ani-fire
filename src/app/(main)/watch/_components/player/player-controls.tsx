import { getEpisodeNavigation } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { AnimeEpisodes } from "@/types/anime";
import { useRouter } from "next/navigation";
import { FaLightbulb } from "react-icons/fa6";
import { IoIosFastforward } from "react-icons/io";

interface PlayerControlsProps {
  episodes: AnimeEpisodes;
  episodeId: string;
}

export default function PlayerControls({
  episodeId,
  episodes,
}: PlayerControlsProps) {
  const { autoNext, autoSkip, light, setLight, setAutoNext, setAutoSkip } =
    usePlayerStore();

  const router = useRouter();

  const { next, prev } = getEpisodeNavigation(
    episodes ?? { episodes: [], totalEpisodes: 0 },
    episodeId,
  );

  return (
    <div className="relative flex w-full items-center justify-between p-4">
      {light && (
        <div
          onClick={() => setLight(false)}
          className="absolute inset-0 z-10 h-full w-full bg-black/90"
        />
      )}
      <div className="flex items-center gap-3 text-[13px]">
        <button
          onClick={() => setLight(!light)}
          className="flex items-center gap-1.5 font-light"
        >
          <FaLightbulb />
          Light
          <span
            data-light={light as boolean}
            className="text-secondary data-[light=false]:text-red-500"
          >
            {light ? "On" : "Off"}
          </span>
        </button>
        <button
          onClick={() => setAutoNext(!autoNext)}
          className="flex items-center gap-1.5 font-light"
        >
          Auto Next{" "}
          <span
            data-auto-next={autoNext as boolean}
            className="text-secondary data-[auto-next=false]:text-red-500"
          >
            {autoNext ? "On" : "Off"}
          </span>
        </button>

        <button
          onClick={() => setAutoSkip(!autoSkip)}
          className="flex items-center gap-1.5 font-light"
        >
          Auto Skip Intro{" "}
          <span
            data-skip={autoSkip as boolean}
            className="text-secondary data-[skip=false]:text-red-500"
          >
            {autoSkip ? "On" : "Off"}
          </span>
        </button>
      </div>
      <div className="flex items-center gap-2 text-[13px]">
        <button
          disabled={!prev}
          onClick={() => router.push(`/watch/${prev}`)}
          className="flex items-center gap-1.5 font-normal hover:text-secondary disabled:pointer-events-none disabled:opacity-50"
        >
          <IoIosFastforward className="h-4 w-4 rotate-180" />{" "}
          <span className="hidden sm:inline-flex">Prev</span>
        </button>

        <button
          disabled={!next}
          onClick={() => router.push(`/watch/${next}`)}
          className="flex items-center gap-1.5 font-normal hover:text-secondary disabled:pointer-events-none disabled:opacity-50"
        >
          <span className="hidden sm:inline-flex">Next</span>{" "}
          <IoIosFastforward className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
