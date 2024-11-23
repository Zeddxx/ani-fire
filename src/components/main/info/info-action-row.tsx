import { getAnimeEpisodesById } from "@/api/anime";
import { InfoActionRowSkeleton } from "@/components/skeleton/info-action-row.skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QUERY_KEY } from "@/constants/query-key";
import { merge } from "@/lib/utils/index";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import Link from "next/link";

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
          className:
            "flex items-center !rounded-full text-base text-white shadow",
        })}
      >
        <Play className="h-4 w-4" />
        Watch now
      </Link>

      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="rounded-full">
            All Episodes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Select episode to watch</DialogHeader>
          <DialogDescription className="">
            <div className="flex h-full w-full flex-col">
              <p>Total Episodes: {animeEpisodes?.totalEpisodes}</p>
              <div className="max-h-[550px] w-full overflow-y-scroll">
                {animeEpisodes?.episodes.slice(0, 32).map((anime, idx) => (
                  <Link
                    key={anime.episodeId}
                    href={`/watch/${anime.episodeId}`}
                    className={merge(
                      "flex w-full flex-nowrap items-center px-4 py-3",
                      idx % 2 && "bg-primary/10",
                    )}
                  >
                    <p className="max-w-sm truncate">{anime.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
