import { AnimeEpisodes } from "@/types/anime";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEpisodeNavigation(
  animeEpisodes: AnimeEpisodes,
  currentId: string,
) {
  const { episodes, totalEpisodes } = animeEpisodes;
  const currentIndex = episodes.findIndex((ep) => ep.episodeId === currentId);

  if (currentIndex !== -1) {
    const nextIndex = currentIndex + 1;
    const prevIndex = currentIndex - 1;

    const nextEpisodeId =
      nextIndex < totalEpisodes ? episodes[nextIndex].episodeId : false;
    const prevEpisodeId =
      prevIndex >= 0 ? episodes[prevIndex].episodeId : false;

    return {
      next: nextEpisodeId,
      prev: prevEpisodeId,
    };
  } else {
    return {
      next: false,
      prev: false,
    };
  }
}

// formating the date as 'YYYY-MM-DD'
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * This function will return next 7 dates and prev 7 dates from today in format 'YYYY-MM-DD'
 * @returns prevDates: string[...], nextDates: string[...]
 */
export function getNextAndPrevSevenDates(): {
  prevDates: string[];
  nextDates: string[];
} {
  const today = new Date(); // getting today dates

  const prevDates: string[] = [];
  const nextDates: string[] = [];

  // get the previous 7 dates
  for (let i = 1; i <= 7; i++) {
    const prevDate = new Date(today);
    prevDate.setDate(today.getDate() - i);
    prevDates.push(formatDate(prevDate));
  }

  // get next 7 dates
  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    nextDates.push(formatDate(nextDate));
  }

  return { prevDates, nextDates };
}

export function getDayOfWeek(dateStr: string): string {
  const date = new Date(dateStr); // creating a date object from the date string

  // arrays of day names
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayIndex = date.getDay(); // get the day index (0: sunday, 6: saturday)

  return daysOfWeek[dayIndex];
}
