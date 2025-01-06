"use client";

import { getAnimeScheduleByDate } from "@/api/anime";
import BeatLoader from "@/components/shared/loader";
import { Button } from "@/components/ui/button";
import { QUERY_KEY } from "@/lib/query-key";
import {
  cn,
  formatDate,
  getDayOfWeek,
  getFormattedCurrentTime,
  getMonth,
  getNextAndPrevSevenDates,
} from "@/lib/utils";
import { ScheduledAnimes } from "@/types/anime";
import { useQueries } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

interface Scheduled {
  date: string;
  scheduledAnimes: ScheduledAnimes[];
}

export default function Schedule() {
  const { nextDates, prevDates } = getNextAndPrevSevenDates();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  const currentDate = new Date();
  const today = formatDate(currentDate);
  const dates = useMemo(
    () => [...prevDates.reverse(), today, ...nextDates],
    [nextDates, today, prevDates],
  );

  const [selectedDate, setSelectedDate] = useState<string>(today);

  const { data, isLoading } = useQueries({
    queries: dates.map((date) => ({
      queryKey: [QUERY_KEY.UPCOMING_SCHEDULE, date],
      queryFn: () => getAnimeScheduleByDate(date),
    })),
    combine: (results) => {
      return {
        data: results.map((result, idx) => {
          return {
            date: dates[idx],
            ...result.data,
          } as Scheduled;
        }),
        isLoading: results.map((result) => result.isPending),
      };
    },
  });

  const { scheduledAnimes } = useMemo<Scheduled>(() => {
    return data.filter((anime) => anime.date === selectedDate)[0];
  }, [data, selectedDate]);

  useEffect(() => {
    if (!containerRef.current) return;

    const selectedElement = containerRef.current.querySelector(
      `div[data-date="${selectedDate}"]`,
    ) as HTMLElement;

    if (selectedElement) {
      const { offsetWidth: containerWidth } = containerRef.current;
      const { offsetWidth: elementWidth, offsetLeft: elementPosition } =
        selectedElement;
      const offset = elementPosition - (containerWidth - elementWidth) / 2;

      containerRef.current.scrollTo({
        left: offset,
        behavior: "smooth",
      });
    }
  }, [selectedDate]);

  const handlePrevClick = () => {
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex > 0) {
      setSelectedDate(dates[currentIndex - 1]);
    }
  };

  const handleNextClick = () => {
    const currentIndex = dates.indexOf(selectedDate);
    if (currentIndex < dates.length - 1) {
      setSelectedDate(dates[currentIndex + 1]);
    }
  };

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(getFormattedCurrentTime());
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-y-3 md:flex-row">
        <h2 className="text-2xl font-semibold text-primary">
          Estimated Schedule
        </h2>

        <div className="">
          <p className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
            {currentTime}
          </p>
        </div>
      </div>
      <div className="relative px-4">
        <div
          ref={containerRef}
          className="relative my-7 flex w-full flex-nowrap items-center gap-x-4 overflow-hidden rounded-xl"
        >
          {dates.map((date) => (
            <div
              key={date}
              data-date={date}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "shrink-0 flex-grow cursor-pointer rounded-xl bg-white/5 px-16 py-2 text-center text-secondary-foreground duration-200 hover:bg-white/10",
                selectedDate === date &&
                  "border-none !bg-secondary !text-black",
              )}
            >
              <p className="text-base font-semibold uppercase">
                {getDayOfWeek(date)}
              </p>
              <p
                className={cn(
                  "text-sm text-white/60",
                  selectedDate === date && "font-semibold text-black/70",
                )}
              >
                {getMonth(Number(date.split("-")[date.split("-").length - 2]))}{" "}
                {date.split("-")[date.split("-").length - 1]}
              </p>
            </div>
          ))}
        </div>

        <Button
          size="icon"
          onClick={handlePrevClick}
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white text-black hover:bg-white/70"
        >
          <ChevronLeft />
        </Button>
        <Button
          size="icon"
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white text-black hover:bg-white/70"
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="flex w-full flex-col gap-2">
        {isLoading.find((value) => value === true)
          ? Array.from({ length: 7 }).map((_, idx) => (
              <div
                key={idx}
                className="grid h-20 w-full animate-pulse place-items-center bg-primary-500"
              >
                <BeatLoader />
              </div>
            ))
          : scheduledAnimes?.map(({ id, name, time, episode }) => (
              <Link
                key={id}
                href={`/${id}`}
                className={cn(
                  "group flex w-full items-center justify-between py-2 text-base duration-200 hover:!text-secondary",
                )}
              >
                <div className="flex gap-3">
                  <h4 className="font-semibold text-muted-foreground duration-200 group-hover:text-secondary">
                    {time}
                  </h4>
                  <h4 className="line-clamp-2 hover:text-secondary">{name}</h4>
                </div>

                <div className="flex shrink-0 gap-1 rounded px-4 py-2 text-sm duration-200 group-hover:bg-secondary group-hover:text-black">
                  <ChevronRight className="my-auto h-4 w-4" />
                  <p>Episode {episode}</p>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
}
