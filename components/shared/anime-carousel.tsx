'use client';

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SpotLightAnimesProps } from "@/types";
import Image from "next/image";
import { BsPlayCircleFill } from "react-icons/bs";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactSimplyCarousel from "react-simply-carousel"
import { Badge } from "../ui/badge";

const AnimeCarousel = ({ animes } : { animes: SpotLightAnimesProps[] | undefined }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        autoplay
        autoplayDelay={6000}
        autoplayDirection="forward"
        itemsToScroll={1}
        swipeTreshold={300}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          className : "absolute z-10 right-4 bottom-16",
          children: <span className={cn(buttonVariants({variant:"secondary", size:"icon"}))}>
             <IoIosArrowBack />
          </span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          className : "absolute z-10 right-4 bottom-4",
          children: <span className={cn(buttonVariants({variant:"secondary", size:"icon"}))}>
          <IoIosArrowForward />
       </span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={400}
        infinite
        easing="ease-in-out"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        {animes?.map((anime) => {
          const description = anime.description;
          return(
            <div className="min-h-80 max-h-[580px] h-[50vw] w-screen relative before:absolute before:bottom-0 before:left-0 before:h-1/2 before:w-full before:bg-gradient-to-t before:from-black before:to-transparent before:z-20" key={anime.id}>
              <div className="absolute bottom-4 z-20 w-[90%] xl:w-[60%] left-4">
                <p className="xl:text-2xl text-md md:text-lg text-rose-500">#{anime.rank} Spotlight</p>
                <div className="flex gap-x-2 my-3">
                  {anime.otherInfo.map((info) => (
                    <Badge variant="secondary" className="rounded-none" key={info}>{info}</Badge>
                  ))}
                </div>
                <h1 className="leading-tight xl:text-5xl text-2xl md:text-3xl font-semibold text-secondary-foreground">{anime.name}</h1>
                <p className="w-[80%] xl:block hidden">{description.length > 300 ? description.slice(0,300) + "..." : description}</p>
                <div className="flex gap-x-2 mt-4 ">
                  <a href={`/${anime.id}`} className={cn("flex", buttonVariants({ variant: "default" }))}>
                    <BsPlayCircleFill className="mr-3 h-5 w-5" /> Watch now
                  </a>
                <Button disabled variant="secondary" className="rounded-none">
                   Details
                </Button>
              </div>
              </div>
              <div className="absolute before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-black before:via-transparent before:to-black before:z-10 w-full xl:w-3/4 h-full right-0">
                <Image src={anime.poster} alt="anime posters" fill className="h-full w-full opacity-75 filter saturate-150 object-cover pointer-events-none" />
              </div>
            </div>
          )
        })}
      </ReactSimplyCarousel>
  )
}
export default AnimeCarousel