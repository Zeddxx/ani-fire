'use client'

import { useGetAnimeStreaming } from "@/lib/query-api"
import ReactPlayer from "react-player"

type VideoPlayerProps = {
    episodeId: string
    server: string
    category: string
}

const VideoPlayer = ({ episodeId, server, category } : VideoPlayerProps) => {
  const { data } = useGetAnimeStreaming(episodeId, server, category)
  console.log(data);

  const subtitles = data?.subtitles || [];
  const defaultUrl = data?.sources[0].url || data?.sources[0].url || ""

  return (
    <div className="w-full h-auto">
        <ReactPlayer
        url={defaultUrl}
        width={'100%'}
        height={'100%'}
        controls
        config={{
            file: {
                attributes: {
                    crossOrigin: 'true',
                },
                tracks: subtitles.map((subtitle, index) => ({
                  kind: 'subtitles',
                  src: subtitle.url,
                  label: 'subtitle',
                  srcLang: subtitle.lang,
                  default: index === 0, // Set the first subtitle as default
                })),
            }
        }}
        />
    </div>
  )
}
export default VideoPlayer