'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import { TrendingAnimeProps } from "@/types";
  import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";


const AnimeCarousel = ({ trendingAnimes } : { trendingAnimes : TrendingAnimeProps[]}) => {
  return (
    <Carousel opts={{
        loop: true
      }}
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
      className="w-full my-6">
        <CarouselContent className="h-96">
          {trendingAnimes.map((anime) => (
              <CarouselItem key={anime.id} className="text-white h-full">
                <div className="relative h-full w-full before:h-1/2 before:w-full before:absolute before:bottom-0 before:left-0 before:bg-gradient-to-t before:from-stone-900 before:to-transparent before:z-20">
                  <Image src={anime.poster} alt={anime.name} width={830} height={300} className="object-cover brightness-50" />
                  <div className="absolute z-20 left-6 bottom-6 text-white">
                    <h3 className="text-4xl font-bold truncate w-96">{anime.name}</h3>
                    <p className="text-lg text-muted-foreground">Rank: {anime.rank}</p>
                  </div>
                </div>
              </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 rounded-none bg-transparent text-white h-96 w-16 ring-0 border-none hover:bg-transparent" />
        <CarouselNext className="absolute right-0 rounded-none bg-transparent text-white h-96 w-16 ring-0 border-none hover:bg-transparent" />
      </Carousel>
  )
}
export default AnimeCarousel