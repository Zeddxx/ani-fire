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
    <Carousel opts={{ align: "start" }} className="mt-6 w-full">
      <CarouselContent className="-ml-4">
        {animes.map(({ id, name, poster, rank }) => (
          <CarouselItem key={id} className="basis-1/10 pl-4">
            <div className="relative flex items-end">
              <div className="hidden md:block">
                <Link
                  href={`/${id}`}
                  className="veritcal-text h-52 truncate pl-2 pr-0 text-base font-medium text-secondary-foreground hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  {name}
                </Link>
                <span className="mx-auto block w-fit text-xl font-semibold text-primary">
                  {Number(rank) < 10 ? `0${Number(rank)}` : Number(rank)}
                </span>
              </div>
              <div className="absolute left-0 top-0 grid h-10 w-10 place-items-center bg-primary text-xl md:hidden">
                {Number(rank) < 10 ? `0${Number(rank)}` : Number(rank)}
              </div>
              <HoveredContent animeId={id}>
                <Link
                  href={`/${id}`}
                  className="relative aspect-[8/10] h-full w-52 sm:aspect-[12/16]"
                >
                  <CustomImage src={poster} alt={name} fill />
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
