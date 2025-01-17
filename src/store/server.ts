import { create } from "zustand";

type ServerStoreTypes = {
  currentServer: string;
  setCurrentServer: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
};

export const useServer = create<ServerStoreTypes>()((set) => ({
  currentServer: "",
  setCurrentServer: (value) => set({ currentServer: value }),
  category: "",
  setCategory: (value) => set({ category: value }),
}));
