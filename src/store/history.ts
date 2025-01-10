import { AnimeEntry } from "@/types/anime";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AnimeWatchHistory extends AnimeEntry {
  currentTime: number;
  duration: number;
  date: number;
}

type HistoryStoreState = {
  latestWatchedDate: number;
  latestAnimeWatched: AnimeWatchHistory | {};
  allAnimeWatched: AnimeWatchHistory[];
  setHistory: (state: {
    latestWatchedDate: number;
    latestAnimeWatched: AnimeWatchHistory | {};
    allAnimeWatched: AnimeWatchHistory[];
  }) => void;
  setCurrentTime: (episodeId: string, value: number, duration: number) => void;
};

export const useHistory = create<HistoryStoreState>()(
  persist(
    (set) => ({
      latestAnimeWatched: {},
      latestWatchedDate: 0,
      allAnimeWatched: [],
      setHistory: (state) => set(state),
      setCurrentTime: (episodeId, value, duration) =>
        set((state) => {
          const updatedAnimeHistory = state.allAnimeWatched.map((anime) => {
            {
              if (anime.episodeId === episodeId) {
                return {
                  ...anime,
                  currentTime: value,
                  duration,
                  date: Date.now(),
                };
              }

              return anime;
            }
          });
          return { allAnimeWatched: updatedAnimeHistory };
        }),
    }),
    {
      name: "site-watch",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
