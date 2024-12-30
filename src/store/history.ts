import { AnimeEntry } from "@/types/anime";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type HistoryStoreState = {
  latestWatchedDate: number;
  latestAnimeWatched: AnimeEntry | {};
  allAnimeWatched: AnimeEntry[];
  currentTime: number;
  setHistory: (state: {
    latestWatchedDate: number;
    latestAnimeWatched: AnimeEntry | {};
    allAnimeWatched: AnimeEntry[];
    currentTime: number;
  }) => void;
};

export const useHistory = create<HistoryStoreState>()(
  persist(
    (set) => ({
      latestAnimeWatched: {},
      latestWatchedDate: 0,
      allAnimeWatched: [],
      currentTime: 0,
      setHistory: (state) => set(state),
    }),
    {
      name: "site-watch",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
