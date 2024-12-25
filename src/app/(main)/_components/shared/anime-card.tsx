import HoveredContent from "@/components/shared/hovered-content";
import Separator from "@/components/ui/separator";
import { LatestEpisodeAnimes, RecommendedAnime } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";

interface AnimeCardProps extends LatestEpisodeAnimes, RecommendedAnime {
  showDurationAndType?: boolean;
}

export default function AnimeCard({
  showDurationAndType = false,
  ...props
}: AnimeCardProps) {
  const { id, episodes, name, poster, type, duration } = props;
  return (
    <div key={id} className="flex flex-col gap-2">
      <HoveredContent animeId={id}>
        <Link
          href={`/${id}`}
          className="relative aspect-[8/10] h-72 w-full overflow-hidden sm:aspect-[12/16]"
        >
          <Image
            src={poster}
            alt={`${name} poster`}
            fill
            className="h-full w-full object-cover [mask-image:linear-gradient(180deg,#fff,#fff,#fff,transparent)]"
          />
        </Link>
      </HoveredContent>
      <Link
        href={`/${id}`}
        className="line-clamp-1 w-full text-base font-medium hover:text-secondary"
      >
        {name}
      </Link>

      <p className="flex w-full items-center gap-2.5 text-sm font-light text-white/70">
        <span className="capitalize">{type}</span>
        <Separator type="dot" />
        <span>{duration}</span>
      </p>
    </div>
  );
}
