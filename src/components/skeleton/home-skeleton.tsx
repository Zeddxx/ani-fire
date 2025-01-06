import BeatLoader from "../shared/loader";

export default function HomeSkeleton() {
  return (
    <div className="wrapper-container">
      <div className="grid h-[70vw] max-h-[680px] min-h-80 w-full animate-pulse place-items-center bg-primary-500 pl-0 xl:mt-16">
        <BeatLoader className="h-10 w-10" childClassName="h-3 w-3" />
      </div>

      <div className="wrapper-container my-6 space-y-6 px-4">
        <h2 className="text-2xl font-semibold text-secondary">Trending</h2>

        <div className="flex w-full flex-nowrap gap-6 overflow-clip">
          {Array.from({ length: 8 }, (_, idx) => (
            <div
              key={idx}
              className="relative grid aspect-[8/10] h-full w-[16vw] min-w-44 max-w-52 shrink-0 animate-pulse place-items-center bg-primary-500 sm:aspect-[12/16]"
            >
              <BeatLoader />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
