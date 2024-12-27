"use client";

import { getAnimeInfoByAnimeId } from "@/api/anime";
import useMediaQueries from "@/hooks/use-media-queries";
import { QUERY_KEY } from "@/lib/query-key";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import BeatLoader from "./loader";

interface HoveredCardProps {
  children: React.ReactNode;
  animeId: string;
  to?: string;
}

export default function HoveredContent({
  children,
  animeId,
  to,
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
          className="w-72 border-none bg-primary/50 backdrop-blur-xl"
        >
          {isLoading ? (
            <div className="grid h-full w-full place-items-center">
              <BeatLoader />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold">{data?.anime.info.name}</h4>
              <div className="flex w-full items-center gap-3">
                <div className="flex items-center">
                  <span className="flex items-center gap-1 text-sm">
                    <FaStar className="h-4 w-4 text-yellow-400" />
                    {data?.anime.moreInfo.malscore}
                  </span>
                </div>

                <Badge
                  type={data?.anime.info.stats.type}
                  episodes={data?.anime.info.stats.episodes}
                />
              </div>

              <p className="line-clamp-3 text-xs text-muted-foreground">
                {data?.anime.info.description}
              </p>

              <div className="w-full text-xs">
                {data &&
                  Object.entries(data?.anime.moreInfo).map(([title, value]) => {
                    if (title === "malscore" || title === "duration")
                      return null;

                    if (typeof value === "object") {
                      return (
                        <div key={title} className="">
                          <span className="font-normal">{title}: </span>
                          {value.map((text) => (
                            <span key={text} className="text-white/70">
                              {text},{" "}
                            </span>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <div key={title}>
                        <span className="font-normal">{title}: </span>
                        <span className="text-wrap text-white/70">{value}</span>
                      </div>
                    );
                  })}
              </div>

              <Button asChild variant="secondary" className="w-full">
                <Link
                  href={!to ? `/${data?.anime.info.id}` : to}
                  className="flex items-center justify-center"
                >
                  <FaPlayCircle className="h-4 w-4 shrink-0" />
                  Watch Now
                </Link>
              </Button>
            </div>
          )}
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
