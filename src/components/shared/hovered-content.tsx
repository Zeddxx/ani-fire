"use client";

import { getAnimeInfoByAnimeId } from "@/api/anime";
import { QUERY_KEY } from "@/constants/query-key";
import useMediaQueries from "@/hooks/use-media-queries";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface HoveredCardProps {
  children: React.ReactNode;
  animeId: string;
}

export default function HoveredContent({
  children,
  animeId,
}: HoveredCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const showPopupInfo = useMediaQueries("(min-width: 1280px)");

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ANIME_INFO, animeId],
    queryFn: () => getAnimeInfoByAnimeId(animeId),
    enabled: isHovered && showPopupInfo,
  });

  useEffect(() => {
    if (!showPopupInfo) {
      setIsHovered(false);
    }
  }, [showPopupInfo]);

  return (
    <HoverCard open={isHovered} onOpenChange={(open) => setIsHovered(open)}>
      <HoverCardTrigger
        asChild
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </HoverCardTrigger>
      {showPopupInfo && (
        <HoverCardContent
          align="start"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-72 border-none bg-secondary/70 backdrop-blur-lg"
        >
          {isLoading ? (
            <div className="grid h-full w-full place-items-center">
              <Loader className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold">{data?.anime.info.name}</h4>
              <p className="line-clamp-4 text-sm text-muted-foreground">
                {data?.anime.info.description}
              </p>

              <Button asChild className="w-full">
                <Link href={`/${data?.anime.info.id}`}>Watch Now</Link>
              </Button>
            </div>
          )}
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
