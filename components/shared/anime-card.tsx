import { Mic } from "lucide-react";
import { FaPlay } from "react-icons/fa";
import { AnimesProps, LatestAnimeProps, RelatedAnimeProps, TopUpcomingAnimes } from "@/types";

type AnimeCardProps = {
  anime: AnimesProps | TopUpcomingAnimes | LatestAnimeProps | RelatedAnimeProps
  type: "Latest" | "Normal"
  latestLink?: string
}

const AnimeCard = ({ anime, type, latestLink } : AnimeCardProps ) => {
  const isNull = Number(anime.episodes.sub) === 0;

  if(isNull) return null;

  return (
      <div key={anime.id} className="flex flex-col">
      <a
        href={type === "Latest" ? `/watch/${latestLink}` : `/${anime.id}`}
        className="rounded-md w-full h-[30vw] max-h-80 lg:max-h-80 min-h-60 overflow-hidden relative"
      >
        <img
          src={anime.poster}
          loading="lazy"
          alt={anime.name}
          className="h-full peer duration-150 hover:blur-md w-full object-cover"
        />
        <div className="absolute pointer-events-none peer-hover:opacity-100 opacity-0 text-rose-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <FaPlay className="w-10 h-10" />
        </div>
        <div className="flex text-white dark:text-black z-20 absolute rounded-md overflow-hidden bottom-2 left-2">
          <p className="bg-rose-600 text-xs px-2 py-1 font-bold">
            CC: {anime.episodes.sub || 0}
          </p>
          <p className="text-xs flex bg-black dark:text-white px-2 items-center gap-x-1">
            <Mic className="h-4 w-4" />
            {anime.episodes.dub || 0}
          </p>
        </div>
      </a>
      <a
        href={type === "Latest" ? `/watch/${latestLink}` : `/${anime.id}`}
        className="mt-1.5 truncate w-full hover:text-rose-500"
      >
        {anime.name}
      </a>
    </div>
  );
};
export default AnimeCard;
