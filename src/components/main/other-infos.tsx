import { AnimeStats } from "@/types/anime";
import { memo } from "react";
import Separator from "../ui/separator";

const OtherInfos = ({ ...props }: AnimeStats) => (
  <div className="flex items-center gap-2 text-sm">
    <div className="flex gap-x-px overflow-hidden rounded text-xs">
      <span className="bg-primary px-2 py-px">{props.rating}</span>
      <span className="bg-primary-foreground px-2 py-px text-secondary">
        {props.quality}
      </span>
      <span className="bg-secondary px-2 py-px">{props.episodes.sub}</span>
      <span className="bg-yellow-500 px-2 py-px">{props.episodes.dub}</span>
    </div>
    <Separator />
    <span>{props.type}</span>
    <Separator />
    <span>{props.duration}</span>
  </div>
);

export default memo(OtherInfos);
