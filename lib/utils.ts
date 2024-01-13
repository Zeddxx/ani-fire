import { Episode } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: number | string) => {
  const convertTime = Number(time);
  if (isNaN(convertTime)) {
    return "00:00";
  }

  const date = new Date(convertTime * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  if (hours) {
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  } else return `${minutes}:${seconds}`;
};

export const categorizeEpisodes = (episodes: Episode[], range: number) => {
  const categorizedEpisodes: Episode[][] = [];
  let currentRange: Episode[] = [];

  episodes.forEach((episode, index) => {
    currentRange.push(episode);

    if ((index + 1) % range === 0 || index === episodes.length - 1) {
      categorizedEpisodes.push([...currentRange]);
      currentRange = [];
    }
  });

  return categorizedEpisodes;
};
