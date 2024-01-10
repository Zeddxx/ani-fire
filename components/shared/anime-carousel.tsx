'use client';

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactSimplyCarousel from "react-simply-carousel"

const AnimeCarousel = () => {
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
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        <div className="w-[1420px] h-96 relative" style={{ background: '#ff80ed' }}>
          <Image src="/assets/bg-image.jpg" alt="image" fill className="h-full select-none w-full" />
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#065535' }}>
          slide 1
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#000000' }}>
          slide 2
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#133337' }}>
          slide 3
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#ffc0cb' }}>
          slide 4
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#ffffff' }}>
          slide 5
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#ffe4e1' }}>
          slide 6
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#008080' }}>
          slide 7
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#ff0000' }}>
          slide 8
        </div>
        <div className="w-[1420px] h-96" style={{ background: '#e6e6fa' }}>
          slide 9
        </div>
      </ReactSimplyCarousel>
  )
}
export default AnimeCarousel