import BeatLoader from "../shared/loader";

export default function AnimeListSkeleton({ heading }: { heading: string }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-between">
        <h3 className="text-2xl font-semibold text-secondary">{heading}</h3>
      </div>

      <div className="w-full bg-white/5 px-4 py-8">
        <div className="flex flex-col gap-6">
          {[0, 1, 2, 3, 4, 5].map((_, idx) => (
            <div key={idx} className="flex w-full items-center gap-4">
              <div className="flex w-full grow gap-4">
                <div className="relative grid h-[4.8rem] w-14 shrink-0 animate-pulse place-items-center bg-primary-500">
                  <BeatLoader className="h-4 w-4" childClassName="h-1 w-1" />
                </div>

                <div className="flex w-full flex-col justify-center space-y-1.5 border-b border-white/10 py-4">
                  <div className="h-5 w-full animate-pulse bg-primary-500"></div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-7 animate-pulse bg-primary-500" />
                    <div className="h-4 w-7 animate-pulse bg-primary-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
