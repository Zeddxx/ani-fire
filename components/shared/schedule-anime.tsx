"use client";

import { cn } from "@/lib/utils";
import ReactSimplyCarousel from "react-simply-carousel";
import { Button, buttonVariants } from "../ui/button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useEffect, useState } from "react";
import date from "date-and-time";
import Link from "next/link";
import { ScheduleAnimeTypes } from "@/types";

const primaryUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000"
    : process.env.NEXT_PUBLIC_ANIME_URL;
const backupUrl = "https://api-aniwatch.onrender.com";

const ScheduleAnime = () => {
  const now = new Date();

  let current = date.format(now, "[GMT]ZZ DD/MM/YYYY hh:mm:ss A");
  let today = date.format(now, "YYYY-MM-DD");

  const [currentTime, setCurrentTime] = useState(current);
  const [prevDays, setPrevDays] = useState<Date[]>([]);
  const [upcomingDays, setUpcomingDays] = useState<Date[]>([]);
  const [fetchDate, setFetchDate] = useState<string>(today);
  const [data, setData] = useState<ScheduleAnimeTypes[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(14);

  const [activeButton, setActiveButton] = useState<string>(today);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(date.format(now, "hh:mm:ss"));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const prevDays = Array.from({ length: 15 }).map((_, index) => {
      return date.addDays(now, -(index + 1));
    });

    setPrevDays(prevDays);

    const upcomingDays = Array.from({ length: 15 }).map((_, index) => {
      return date.addDays(now, index);
    });

    setUpcomingDays(upcomingDays);
  }, []);

  const fetchAnimeSchedule = async (date: string) => {
    try {
      const data = await fetch(`${primaryUrl}/anime/schedule?date=${date}`);

      if (data.status === 409) {
        const data = await fetch(`${backupUrl}/anime/schedule?date=${date}`);
        const res = await data.json();
        return res.scheduledAnimes as ScheduleAnimeTypes[];
      }

      const res = await data.json();
      return res.scheduledAnimes as ScheduleAnimeTypes[];
    } catch (error) {
      throw error as Error;
    }
  };

  useEffect(() => {
    if (fetchDate) {
      const newData = async () => {
        const schedule = await fetchAnimeSchedule(fetchDate);
        setData(schedule);
      };

      newData();
    }
  }, [fetchDate]);

  const handleShow = (date: number, month: number, year: number) => {
    const data =
      year +
      "-" +
      (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
      "-" +
      (date < 10 ? "0" + date : date);
    return setFetchDate(data);
  };

  const dayAbbreviations = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <div className="flex sm:flex-row flex-col gap-y-2 justify-between w-full">
        <h6 className="text-2xl font-semibold text-primary">
          Estimated Schedule
        </h6>
        <p className="font-semibold sm:py-0 py-2 text-sm bg-secondary flex gap-1 items-center px-3 rounded-full">
          {current}
        </p>
      </div>

      <div className="relative my-4 w-full">
        <ReactSimplyCarousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          itemsToShow={6}
          itemsToScroll={1}
          swipeTreshold={100}
          forwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            className:
              "h-full z-10 absolute right-0 bottom-1/2 translate-y-1/2",
            children: (
              <span
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "icon",
                    className: "h-full w-full rounded-none",
                  })
                )}
              >
                <GrFormNext className="h-8 w-8" />
              </span>
            ),
          }}
          backwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            className:
              "z-10 absolute h-full left-0 top-1/2 -translate-y-1/2",
            children: (
              <span
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "icon",
                    className: "h-full w-full rounded-none",
                  })
                )}
              >
                <GrFormPrevious className="h-8 w-8" />
              </span>
            ),
          }}
          responsiveProps={[
            {
              itemsToShow: 12,
              itemsToScroll: 1,
              minWidth: 768,
              maxWidth: 1536,
            },
          ]}
          speed={400}
          infinite={false}
          disableSwipeByTouch
          disableSwipeByMouse
          easing="ease-in-out"
        >
          {prevDays
            .map((prev, index) => {
              const isActive =
                prev.getFullYear() +
                  "-" +
                  (prev.getMonth() + 1 < 10
                    ? "0" + (prev.getMonth() + 1)
                    : prev.getMonth() + 1) +
                  "-" +
                  (prev.getDate() < 10
                    ? "0" + prev.getDate()
                    : prev.getDate()) ===
                fetchDate;
              return (
                <Button
                  className={cn(
                    "w-48 rounded-none mr-6 h-12",
                    isActive && "bg-primary"
                  )}
                  variant="outline"
                  key={index}
                  onClick={() =>
                    handleShow(
                      prev.getDate(),
                      prev.getMonth(),
                      prev.getFullYear()
                    )
                  }
                >
                  {dayAbbreviations[prev.getDay()]} {prev.getDate()}
                </Button>
              );
            })
            .reverse()}
          {upcomingDays.map((next, index) => {
            const isActive =
              next.getFullYear() +
                "-" +
                (next.getMonth() + 1 < 10
                  ? "0" + (next.getMonth() + 1)
                  : next.getMonth() + 1) +
                "-" +
                (next.getDate() < 10
                  ? "0" + next.getDate()
                  : next.getDate()) ===
              fetchDate;
            return (
              <Button
                key={index}
                className={cn(
                  "w-48 rounded-none mr-6 h-12",
                  isActive && "bg-primary text-white hover:bg-rose-400"
                )}
                variant="secondary"
                onClick={() =>
                  handleShow(
                    next.getDate(),
                    next.getMonth(),
                    next.getFullYear()
                  )
                }
              >
                {dayAbbreviations[next.getDay()]} {next.getDate()}
              </Button>
            );
          })}
        </ReactSimplyCarousel>
      </div>

      <div className="w-full h-auto">
        {!data
          ? "loading"
          : data?.map((data, index) => {
            const isEven = index % 2;
            return(
              <div
                className={cn("w-full py-3 border-b border-y-muted flex gap-x-2 justify-between px-2", isEven && "bg-slate-200 dark:bg-neutral-800")}
                key={index}
              >
                <Link
                  href={`/${data.id}`}
                  className="text-md font-medium text-base hover:text-primary duration-200"
                >
                  {data.name}
                </Link>

                <p className="text-primary">{data.time}</p>
              </div>
            )
          })}
      </div>
    </>
  );
};
export default ScheduleAnime;
