import HoveredContent from "@/components/shared/hovered-content";
import { Badge } from "@/components/ui/badge";
import Separator from "@/components/ui/separator";
import { LatestEpisodeAnimes, RecommendedAnime } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

interface AnimeCardProps extends LatestEpisodeAnimes, RecommendedAnime {
  showDurationAndType?: boolean;
  showEpisodes?: boolean;
}

export default function AnimeCard({
  showDurationAndType = false,
  showEpisodes = true,
  ...props
}: AnimeCardProps) {
  const { id, episodes, name, poster, type, duration, rating } = props;
  return (
    <div key={id} className="flex flex-col gap-1">
      <HoveredContent animeId={id}>
        <Link
          href={`/${id}`}
          className="group relative aspect-[10/14] w-full overflow-hidden sm:aspect-[12/16]"
        >
          <Image
            src={poster}
            alt={`${name} poster`}
            fill
            className="h-full w-full object-cover duration-200 [mask-image:linear-gradient(180deg,#fff,#fff,#fff,transparent)] group-hover:blur-md"
          />
          {showEpisodes && (
            <div className="absolute bottom-2 left-2 z-10">
              <Badge episodes={episodes} />
            </div>
          )}

          {rating && (
            <div className="absolute left-2 top-2 z-10 rounded bg-orange-600 px-2 py-1 text-xs font-medium">
              {rating}
            </div>
          )}
          <FaPlay className="invisible absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 group-hover:visible" />
        </Link>
      </HoveredContent>
      <Link
        href={`/${id}`}
        className="line-clamp-1 w-full text-[15px] font-medium hover:text-secondary"
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
