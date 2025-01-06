import { create } from "zustand";

type SiteStoreTypes = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: (value: boolean) => void;
};

export const useSiteStore = create<SiteStoreTypes>()((set) => ({
  isSidebarOpen: false,
  setIsSidebarOpen: (value) => set({ isSidebarOpen: value }),
  isSearchBarOpen: false,
  setIsSearchBarOpen: (value) => set({ isSearchBarOpen: value }),
}));
