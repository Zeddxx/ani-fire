"use client";

import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/player-store";
import { useServer } from "@/store/server";
import { AnimeEpisodeServers } from "@/types/anime";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa6";

export default function SelectServers(props: AnimeEpisodeServers) {
  const { setLight, light } = usePlayerStore();
  const { currentServer, setCurrentServer, category, setCategory } =
    useServer();

  if (!props) return null;

  const { episodeNo } = props;

  function renderIcons(type: string) {
    switch (type) {
      case "sub":
        return <FaClosedCaptioning className="text-secondary" />;
      case "dub":
        return <FaMicrophone className="h-3 w-3 text-secondary" />;
      default:
        return null;
    }
  }

  const handleChangeDub = (category: string, type: string) => {
    setCategory(category);
    setCurrentServer(type);
  };

  return (
    <div className="relative px-4">
      {light && (
        <div
          onClick={() => setLight(false)}
          className="absolute inset-0 h-full w-full bg-black/90"
        />
      )}
      <div className="mb-3 flex h-auto w-full flex-col overflow-hidden bg-primary-100 md:flex-row md:rounded-md">
        <div className="w-full bg-primary-500 px-3 py-2 text-center text-sm leading-relaxed text-white/80 md:max-w-[15rem] md:bg-secondary md:text-[13px] md:leading-snug md:text-black">
          You are watching <br />
          <strong className="text-secondary md:text-black">
            Episode {episodeNo}
          </strong>
          <br /> If current server doesn&apos;t work please try other servers
          beside.
        </div>

        <div className="w-full px-4">
          {Object.entries(props).map(([key, values], idx) => {
            // remove the extra details with this keys..
            if (key === "episodeId" || key === "episodeNo") return null;

            // do not render if there is no server..
            if (typeof values !== "object" || !values.length) return null;

            // else return all remaining servers...
            return (
              <div
                key={key}
                className="flex items-center border-dashed border-white/60 py-3 first:border-b last:border-none"
              >
                <div className="flex items-center gap-6 text-xs uppercase md:text-sm">
                  <p className="flex items-center gap-2 font-semibold">
                    {renderIcons(key)}
                    {key}:{" "}
                  </p>
                  <div className="flex gap-2">
                    {values.map((type) => (
                      <button
                        onClick={() => handleChangeDub(key, type.serverName)}
                        key={type.serverId}
                        className={cn(
                          "rounded-md bg-white/10 px-7 py-1.5 text-[13px] font-medium uppercase",
                          currentServer === type.serverName &&
                            category === key &&
                            "bg-secondary text-black",
                        )}
                      >
                        {type.serverName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
