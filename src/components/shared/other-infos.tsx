import { AnimeStats } from "@/types/anime";
import { memo } from "react";
import { FaClosedCaptioning, FaMicrophone } from "react-icons/fa";
import Separator from "../ui/separator";

const OtherInfos = ({ ...props }: AnimeStats) => (
  <div className="flex items-center gap-2 text-sm">
    <div className="flex gap-x-px overflow-hidden rounded !text-[12px] font-medium">
      <span className="bg-white px-2 py-px text-black">{props.rating}</span>
      <span className="bg-secondary px-2 py-px text-primary">
        {props.quality}
      </span>
      <span className="flex items-center bg-green px-2 py-px text-black">
        <FaClosedCaptioning className="mr-1 h-3 w-3" />
        {props.episodes.sub}
      </span>
      {props.episodes.dub && (
        <span className="flex items-center bg-blue px-2 py-px text-black">
          <FaMicrophone className="mr-1" />
          {props.episodes.dub}
        </span>
      )}
    </div>
    <Separator />
    <span className="text-white/80">{props.type}</span>
    <Separator />
    <span className="text-white/80">{props.duration}</span>
  </div>
);

export default memo(OtherInfos);
