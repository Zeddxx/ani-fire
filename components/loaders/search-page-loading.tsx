import { Skeleton } from "../ui/skeleton"

const SearchPageLoading = () => {
  return (
    <section className="max-w-screen-2xl mx-auto w-full h-auto mt-24 px-4">
      <h1 className="text-2xl mb-3 text-primary font-semibold">Genre&apos;s</h1>
      <div className="flex flex-wrap gap-4 border-muted border p-6 w-full h-auto">
        {Array.from({ length: 24 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-28" />
        ))}
      </div>

      <div className="w-full h-auto my-6">
        <h2 className="flex gap-4 items-center text-2xl text-primary font-semibold">Searching results for
          <Skeleton className="w-36 h-6" />
        </h2>

        <div className="grid lg:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 my-6 gap-4 w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="rounded-md w-full h-[30vw] max-h-80 lg:max-h-64 min-h-60 overflow-hidden relative" />
          ))}
        </div>
      </div>
    </section>
  )
}
export default SearchPageLoading