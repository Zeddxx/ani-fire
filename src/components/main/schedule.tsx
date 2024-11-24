"use client";

import { getAnimeScheduleByDate } from "@/api/anime";
import { QUERY_KEY } from "@/constants/query-key";
import {
  formatDate,
  getDayOfWeek,
  getFormattedCurrentTime,
  getMonth,
  getNextAndPrevSevenDates,
} from "@/lib/utils";
import { merge } from "@/lib/utils/index";
import { ScheduledAnimes } from "@/types/anime";
import { useQueries } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary">
          Estimated Schedule
        </h2>

        <div className="">
          <p className="rounded-full bg-secondary px-4 py-2 text-sm">
            {currentTime}
          </p>
        </div>
      </div>
      <div className="relative px-10">
        <div
          ref={containerRef}
          className="relative my-7 flex w-full flex-nowrap items-center gap-x-4 overflow-hidden"
        >
          {dates.map((date) => (
            <div
              key={date}
              data-date={date}
              onClick={() => setSelectedDate(date)}
              className={merge(
                "shrink-0 flex-grow cursor-pointer rounded-xl bg-secondary/10 px-16 py-2 text-center text-secondary-foreground duration-200 hover:bg-secondary/30",
                selectedDate === date &&
                  "border-none !bg-primary !text-secondary-foreground",
              )}
            >
              <p className="uppercase">{getDayOfWeek(date)}</p>
              <p className="text-muted-foreground">
                {getMonth(Number(date.split("-")[date.split("-").length - 2]))}{" "}
                {date.split("-")[date.split("-").length - 1]}
              </p>
            </div>
          ))}
        </div>

        <Button
          size="icon"
          onClick={handlePrevClick}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          <ChevronLeft />
        </Button>
        <Button
          size="icon"
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="flex w-full flex-col gap-2">
        {isLoading.find((value) => value === true)
          ? Array.from({ length: 7 }).map((_, idx) => (
              <Skeleton
                className={merge(
                  "h-12 w-full rounded-none bg-black",
                  idx % 2 && "bg-muted",
                )}
                key={idx}
              />
            ))
          : scheduledAnimes?.map(({ id, name, time, episode }, idx) => (
              <Link
                key={id}
                href={`/${id}`}
                className={merge(
                  "group flex w-full items-center justify-between py-2 text-base duration-200 hover:!text-primary",
                )}
              >
                <div className="flex gap-3">
                  <h4 className="font-semibold text-muted-foreground duration-200 group-hover:text-primary">
                    {time}
                  </h4>
                  <h4 className="line-clamp-2">{name}</h4>
                </div>

                <div className="flex shrink-0 gap-1 rounded px-4 py-2 text-sm duration-200 group-hover:bg-primary group-hover:text-secondary-foreground">
                  <ChevronRight className="my-auto h-4 w-4" />
                  <p>Episode {episode}</p>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
}
