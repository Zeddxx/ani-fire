'use client';

import { SubtitlesProps } from "@/types";
import ArtPlayer from "artplayer"
import Option from "artplayer/types/option";
import { useEffect, useRef } from "react"

type TPlayer = {
    option: Option,
    getInstance?: any
    subtitles: SubtitlesProps[]
    className: string
}

const Player = ({ option, getInstance, subtitles, className } : TPlayer) => {
  const artRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const art = new ArtPlayer({
        ...option,
        container: artRef.current!,
        settings: [
            {
              html: "Subtitle",
              tooltip: "English",
              selector:
                subtitles.map((sub) => ({
                  default: sub.label === "English",
                  html: sub.label,
                  url: sub.file
                })),
                onSelect: function (item) {
                  art.subtitle.switch(item.url, {
                    name: item.html,
                  });
                  return item.html;
                }
            }
          ],
    });

    art.on("resize", () => {
        art.subtitle.style({
            fontSize: art.height * 0.05 + "px"
        })
    })

    art.on("subtitleUpdate", (text) => {
        art.template.$subtitle.innerHTML = text;
    })

    art.on('ready' , () => {
      art.play()
    })

    if(getInstance && typeof getInstance === "function") {
        getInstance(art)
    }

    return () => {
        if(art && art.destroy){
            art.destroy(false);
        }
    }
  })

  return (
    <div ref={artRef} className={className}></div>
  )
}
export default Player