import { memo } from "react";
import Separator from "../ui/separator";
import { AnimeStats } from "@/types/anime";

const OtherInfos = ({ ...props }: AnimeStats) => (
  <div className="flex items-center gap-2 text-sm">
    <div className="flex gap-x-px rounded text-xs overflow-hidden">
      <span className="px-2 py-px bg-primary">{props.rating}</span>
      <span className="px-2 py-px bg-primary-foreground text-secondary">
        {props.quality}
      </span>
      <span className="px-2 py-px bg-secondary">
        {props.episodes.sub}
      </span>
      <span className="px-2 py-px bg-yellow-500">{props.episodes.dub}</span>
    </div>
    <Separator />
    <span>{props.type}</span>
    <Separator />
    <span>{props.duration}</span>
  </div>
);

export default memo(OtherInfos);
