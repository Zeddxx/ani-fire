import { Skeleton } from "../ui/skeleton"

const HomeLoading = () => {
  return (
    <section className="max-w-screen-2xl mx-auto w-full h-auto">
        <Skeleton className="min-h-80 max-h-[580px] p-4 flex justify-end flex-col h-[50vw] w-full rounded-none">
            <div className="h-6 w-32 bg-black/50 mb-3"></div>
            <div className="max-w-96 w-full bg-black/50 h-8 mb-1"></div>
            <div className="max-w-80 w-full bg-black/50 h-8 mb-8"></div>
            <div className="flex gap-x-1">
            <div className="h-10 w-40 bg-black/50"></div>
            <div className="h-10 w-32 bg-black/50"></div>
            </div>
        </Skeleton>

        <div className="w-full px-4 my-10">
          <h2 className="text-2xl text-primary font-semibold mb-6">Trending</h2>

          <div className="flex gap-x-4 w-full relative before:absolute before:bottom-0 before:bg-gradient-to-t before:from-black before:via-transparent before:to-transparent before:z-10 before:h-full before:w-full overflow-x-auto scroll-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-48 flex-shrink-0" />
            ))}
          </div>
        </div>
    </section>
  )
}
export default HomeLoading