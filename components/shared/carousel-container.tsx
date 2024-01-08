import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { TrendingAnimeProps } from "@/types";

const CarouselContainer = ({ trendingAnime } : { trendingAnime: TrendingAnimeProps[]}) => {
  return (
    <Carousel
    opts={{
      loop: true
    }}
    className="relative"
    plugins={[
      Autoplay({
        delay: 5000
      })
    ]}
    >
      <CarouselContent className="max-h-[640px] h-[36vw] min-h-[340px]">
        {!!trendingAnime && trendingAnime.map((anime: any) => (
          <CarouselItem key={anime.id} className="h-full w-full">
            <div className="relative w-full before:absolute before:w-full before:h-full before:bg-gradient-to-tr before:from-black before:to-transparent">
            <Image
              src={anime.poster}
              alt="anime poster"
              width={1420}
              height={400}
              className="object-cover rounded-md overflow-hidden w-full h-full"
            />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-8 right-14">
      <CarouselNext className="rounded-none w-10" />
      <CarouselPrevious className="rounded-none w-10" />
      </div>
    </Carousel>
  )
}
export default CarouselContainer