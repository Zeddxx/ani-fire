"use client";

import { cn } from "@/lib/utils";
import ReactSimplyCarousel from "react-simply-carousel";
import { Button, buttonVariants } from "../ui/button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useEffect, useState } from "react";
import date from 'date-and-time'

const ScheduleAnime = () => {
  const now = new Date()

  let today = date.format(now, '[GMT]Z MM/DD/YYYY hh:mm:ss A');
  const [currentTime, setCurrentTime] = useState(today)
  const [prevDays, setPrevDays] = useState<Date[]>([])

  const [activeSlideIndex, setActiveSlideIndex] = useState(14)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      setCurrentTime(date.format(now, 'hh:mm:ss'))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

useEffect(() => {
  const prevDays = Array.from({ length: 15 }).map((_, index) => {
    return date.addDays(now, -(index + 1))
  })

  setPrevDays(prevDays)
}, [])

const handleShow = (date: number, month: number, year: number) => {
  console.log(date, month + 1, year);
}

const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="flex justify-between w-full">
        <h6 className="text-2xl font-semibold text-primary">
          Estimated Schedule
        </h6>
        <p className="font-semibold text-sm bg-secondary flex gap-1 items-center px-3 rounded-full">
          {today}
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
              "hidden md:block z-10 absolute right-0 bottom-1/2 translate-y-1/2",
            children: (
              <span
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "icon",
                    className: "h-full w-full rounded-full",
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
              "hidden md:block z-10 absolute left-0 top-1/2 -translate-y-1/2",
            children: (
              <span
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "icon",
                    className: "h-full w-full rounded-full",
                  })
                )}
              >
                <GrFormPrevious className="h-8 w-8" />
              </span>
            ),
          }}
          responsiveProps={[
            {
              itemsToShow: 6,
              itemsToScroll: 1,
              minWidth: 768,
              maxWidth: 1536,
            },
          ]}
          speed={400}
          infinite={false}
          easing="ease-in-out"
        >
          {prevDays.map((prev, index) => (
            <Button key={index} onClick={() => handleShow(prev.getDate(), prev.getMonth(), prev.getFullYear())}>
              {dayAbbreviations[prev.getDay()]} {prev.getDate()}
            </Button>
          )).reverse()}
        </ReactSimplyCarousel>
      </div>
    </>
  );
};
export default ScheduleAnime;
