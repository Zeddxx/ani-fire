import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AnimeEntry = {
  id: string;
  title: string;
  imgSrc: string;
  type: string;
  currentEp: number | undefined;
  episodeId: string;
  totalEpisodes: number;
};

type HistoryStoreState = {
  latestWatchedDate: number;
  latestAnimeWatched: AnimeEntry | {}; // Change to allow AnimeEntry type
  allAnimeWatched: AnimeEntry[]; // Use AnimeEntry type here
  setHistory: (state: {
    latestWatchedDate: number;
    latestAnimeWatched: AnimeEntry | {};
    allAnimeWatched: AnimeEntry[];
  }) => void;
};

export const useHistory = create<HistoryStoreState>()(
  persist(
    (set) => ({
      latestAnimeWatched: {},
      latestWatchedDate: 0,
      allAnimeWatched: [],
      setHistory: (state) => set(state),
    }),
    {
      name: "site-watch",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
