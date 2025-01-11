import HoveredContent from "@/components/shared/hovered-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CustomImage } from "@/components/ui/image";
import { TrendingAnime } from "@/types/anime";
import Link from "next/link";
import { memo } from "react";

const TrendingCarousel = ({ animes }: { animes: TrendingAnime[] }) => {
  return (
    <Carousel opts={{ align: "start" }} className="z-50 mt-6 w-full">
      <CarouselContent className="-ml-4">
        {animes.map(({ id, name, poster, rank }) => (
          <CarouselItem key={id} className="basis-1/10 z-[999] pl-4">
            <div className="relative flex items-end">
              <div className="hidden md:block">
                <Link
                  href={`/${id}`}
                  className="veritcal-text h-52 truncate pl-2 pr-0 text-base font-medium text-secondary-foreground hover:text-secondary"
                >
                  {name}
                </Link>
                <span className="mx-auto block w-fit text-xl font-semibold text-secondary">
                  {Number(rank) < 10 ? `0${Number(rank)}` : Number(rank)}
                </span>
              </div>
              <div className="absolute left-0 top-0 z-10 grid h-8 w-8 place-items-center bg-white text-base text-primary md:hidden">
                {Number(rank) < 10 ? `0${Number(rank)}` : Number(rank)}
              </div>
              <HoveredContent animeId={id}>
                <Link
                  href={`/${id}`}
                  className="relative aspect-[8/10] h-full w-[16vw] min-w-44 max-w-52 sm:aspect-[12/16]"
                >
                  <CustomImage priority src={poster} alt={name} fill />
                </Link>
              </HoveredContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default memo(TrendingCarousel);
