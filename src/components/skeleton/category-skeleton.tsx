import HomeLayout from "../shared/layouts/home-layout";
import BeatLoader from "../shared/loader";
import AnimeListSkeleton from "./anime-list-skeleton";

export default function CategorySkeleton({ category }: { category: string }) {
  return (
    <div className="wrapper-container flex flex-col gap-7 px-4 py-4 xl:mt-14 xl:flex-row">
      <div className="xl:basis-[75%]">
        <HomeLayout heading={category}>
          <div className="mt-6 grid grid-cols-2 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 16 }, (_, idx) => (
              <div
                key={idx}
                className="grid aspect-[10/12] w-full animate-pulse place-items-center overflow-hidden bg-primary-500 sm:aspect-[12/16]"
              >
                <BeatLoader />
              </div>
            ))}
          </div>
        </HomeLayout>

        <div className="mx-auto my-10 grid w-fit grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((_, idx) => (
            <div
              key={idx}
              className="aspect-square h-10 animate-pulse rounded-full bg-primary-500"
            ></div>
          ))}
        </div>
      </div>

      <div className="xl:basis-[25%]">
        <AnimeListSkeleton heading="Most Popular" />
        <div className="mt-12 w-full space-y-5">
          <h3 className="text-2xl font-semibold text-secondary">Genres</h3>
          <div className="bg-white/5 px-4 py-6">
            <div className="grid w-full grid-cols-3 gap-2">
              {Array.from({ length: 30 }, (_, idx) => (
                <div
                  key={idx}
                  className="h-10 w-full animate-pulse bg-primary-500"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
