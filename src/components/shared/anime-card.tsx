import { LatestEpisodeAnimes, SharedAnimeType } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const AnimeCard = ({ ...props }: LatestEpisodeAnimes | SharedAnimeType) => {
  const { poster, name, episodes, type, id } = props;
  return (
    <div className="flex flex-col gap-2 bg-black sm:aspect-[12/16]">
      <Link
        href={`/${id}`}
        className="relative aspect-[8/10] overflow-hidden rounded-lg sm:aspect-[12/16]"
      >
        <Image
          src={poster}
          alt={`${name} poster`}
          fill
          className="h-full w-full object-cover"
        />
      </Link>
      <Link
        href={`/${id}`}
        className="line-clamp-1 w-full text-ellipsis hover:text-primary"
      >
        {name}
      </Link>
    </div>
  );
};

export default memo(AnimeCard);
