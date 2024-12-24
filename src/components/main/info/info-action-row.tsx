import { getAnimeEpisodesById } from "@/api/anime";
import { InfoActionRowSkeleton } from "@/components/skeleton/info-action-row.skeleton";
import { buttonVariants } from "@/components/ui/button";
import { QUERY_KEY } from "@/lib/query-key";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

export default function InfoActionRow({ animeId }: { animeId: string }) {
  const { data: animeEpisodes, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ANIME_EPISODES_BY_ID, animeId],
    queryFn: () => getAnimeEpisodesById(animeId),
    enabled: !!animeId,
  });

  if (isLoading) return <InfoActionRowSkeleton />;

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/watch/${animeEpisodes?.episodes[0].episodeId}`}
        className={buttonVariants({
          variant: "secondary",
        })}
      >
        <FaPlay className="h-4 w-4" />
        Watch now
      </Link>
    </div>
  );
}
