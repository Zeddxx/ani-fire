'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HomeSection = () => {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white">Anime Home</h1>
        {/* <p className="text-white">watch list</p> */}
      </div>

      <Carousel className="w-full">
        <CarouselContent className="h-96">
          {Array.from({ length: 4 }).map((_,index) => (
              <CarouselItem key={index} className="text-white h-full bg-green-200">{index}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" />
      </Carousel>
    </div>
  );
};
export default HomeSection;
