export default function AnimeInfoSkeleton() {
  return (
    <div className="">
      <div className="z-20 mx-auto flex w-full max-w-screen-3xl flex-col gap-8 xl:flex-row xl:px-8 xl:pl-24">
        <div className="flex flex-col gap-x-6 gap-y-6 px-8 py-12 md:flex-row lg:gap-x-16 lg:py-32 xl:basis-[70%] xl:px-0">
          <div className="relative mx-auto aspect-anime-image h-64 w-44 shrink-0 animate-pulse overflow-hidden bg-primary-500 shadow"></div>

          <div className="flex w-full flex-col items-center gap-6 md:items-start">
            <div className="animate-pulse bg-primary-500">
              <h1 className="invisible line-clamp-2 text-center text-3xl font-medium !leading-tight md:text-start xl:text-5xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia.
              </h1>
            </div>

            {/* Others Infos */}
            <div className="h-10 w-full max-w-sm animate-pulse bg-primary-500"></div>

            {/* Anime Info Action CTA */}
            <div className="h-12 w-full max-w-[10rem] animate-pulse bg-primary-500"></div>

            <div className="h-72 w-full animate-pulse bg-primary-500"></div>
          </div>
        </div>

        <div className="flex min-h-72 animate-pulse items-center bg-primary-500 p-8 backdrop-blur-xl xl:mt-16 xl:basis-[30%]"></div>
      </div>
    </div>
  );
}
