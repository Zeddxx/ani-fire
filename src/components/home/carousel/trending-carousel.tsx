import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TrendingAnime } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const TrendingCarousel = ({ animes }: { animes: TrendingAnime[] }) => {
  return (
    <Carousel opts={{ align: "start" }} className="w-full mt-6">
      <CarouselContent className="-ml-4">
        {animes.map(({ id, name, poster, rank }) => (
          <CarouselItem key={id} className="basis-1/10 pl-4">
            <div className="flex relative items-end">
              <div className="hidden md:block">
                <Link
                  href={`/${id}`}
                  className="veritcal-text dark:text-white hover:text-primary dark:hover:text-primary text-secondary-foreground truncate h-52 text-base font-medium pr-0 pl-2"
                >
                  {name}
                </Link>
                <span className="block mx-auto w-fit text-xl text-primary font-semibold">
                  {Number(rank) + 1 < 10
                    ? `0${Number(rank) + 1}`
                    : Number(rank) + 1}
                </span>
              </div>
              <div className="md:hidden grid absolute top-0 left-0 place-items-center bg-primary h-10 text-xl w-10">
                {Number(rank) + 1 < 10
                  ? `0${Number(rank) + 1}`
                  : Number(rank) + 1}
              </div>
              <Link
                href={`/${id}`}
                className="sm:aspect-[12/16] w-52 aspect-[8/10] relative"
              >
                <Image src={poster} alt={name} fill objectFit="cover" />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default memo(TrendingCarousel);
