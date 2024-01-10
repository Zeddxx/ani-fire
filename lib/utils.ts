import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (time: number | string) => {
  const convertTime = Number(time)
  if(isNaN(convertTime)) {
    return "00:00"
  }

  const date = new Date(convertTime * 1000);
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes()
  const seconds = date.getUTCSeconds().toString().padStart(2, "0")
  if(hours){
    return `${hours}:${minutes.toString().padStart(2, "0")}`
  }else return `${minutes}:${seconds}`
}