import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PromotionalVideo } from "@/types/anime";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";

export default function PromotionVideos({
  videos,
}: {
  videos: PromotionalVideo[];
}) {
  if (!videos.length) return null;

  return (
    <div className="wrapper-container my-6 w-full space-y-7 px-4">
      <h3 className="text-2xl font-semibold text-secondary">
        Promotion Videos
      </h3>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {videos.map(({ source, thumbnail, title }, idx) => (
          <Dialog key={idx}>
            <DialogTrigger>
              <div className="group relative aspect-video h-full w-full">
                <Image
                  src={thumbnail as string}
                  alt={title as string}
                  fill
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 z-10 w-full bg-primary-100 py-1.5 text-center text-sm duration-200 group-hover:text-secondary">
                  <p className="">{title}</p>
                </div>
                <div className="absolute left-1/2 top-1/2 grid aspect-square h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/60 outline outline-2 outline-white group-hover:bg-secondary group-hover:text-black group-hover:outline-none">
                  <BsFillPlayFill className="ml-1 h-7 w-7" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="w-full max-w-4xl">
              <DialogTitle className="w-full text-center text-base font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription></DialogDescription>
              <iframe
                id="player"
                typeof="text/html"
                className="aspect-video h-full w-full"
                src={source}
              ></iframe>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
