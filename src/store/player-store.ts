import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PlayerStoreState = {
  autoSkip: boolean;
  setAutoSkip: (value: boolean) => void;
  autoNext: boolean;
  setAutoNext: (value: boolean) => void;
};

export const usePlayerStore = create<PlayerStoreState>()(
  persist(
    (set) => ({
      autoNext: false,
      setAutoNext: (value) => set({ autoNext: value }),
      autoSkip: false,
      setAutoSkip: (value) => set({ autoSkip: value }),
    }),
    {
      name: "player_store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
