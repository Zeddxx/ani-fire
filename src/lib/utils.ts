import { AnimeEpisodes } from "@/types/anime";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLORS } from "./constants";

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

/**
 * Get current times in realtime.
 * format: UTC MM/DD/YYYY hh:mm:ss AM/PM
 * timezoneOffset.
 * return String
 */

export function getFormattedCurrentTime(): string {
  // current date;
  const now = new Date();

  // get the timezone offset in minutes
  const timezoneOffset = now.getTimezoneOffset();

  // returns GMT offset (like +05:30 or -05:30)
  const sign = timezoneOffset > 0 ? "-" : "+";
  const hoursOffset = Math.abs(Math.floor(timezoneOffset / 60))
    .toString()
    .padStart(2, "0");
  const minutesOffset = Math.abs(timezoneOffset % 60)
    .toString()
    .padStart(2, "0");
  const gmtOffset = `GMT${sign}${hoursOffset}:${minutesOffset}`;

  const options: Intl.DateTimeFormatOptions = {
    hour12: true,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(now);

  return `(${gmtOffset}) ${formattedDate}`;
}

/**
 * function returns an months name by their number;
 * return string
 * params: number -> month
 */

export function getMonth(month: number) {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return MONTHS[month - 1];
}

export const range = (start: number, end: number) => {
  let length: number = end - start + 1;

  // create an array of certain length and set the element withitn it from start value to end.
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * This function will return random colors by taking index
 * @param idx typof number
 */

export function generateRandomColor(idx: number) {
  return COLORS[idx % COLORS.length];
}

/**
 * Function which takes a string and return capatalize strings
 * @param { value: string }
 * @return String
 */
export function capitalize(value: string): string {
  const splittedStrings: Array<string> = value.split(" "); // returns 'string is here' --> ["string", "is", "here"]
  const datas = splittedStrings.map(
    (val) => val.slice(0, 1).toUpperCase() + val.slice(1, val.length),
  );

  return datas.join(" ");
}
