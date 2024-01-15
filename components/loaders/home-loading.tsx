import { Skeleton } from "../ui/skeleton"

const HomeLoading = () => {
  return (
    <section className="max-w-screen-2xl mx-auto w-full h-auto">
        <Skeleton className="min-h-80 max-h-[580px] p-4 flex justify-end flex-col h-[50vw] w-screen">
            <div className="h-6 w-32 bg-stone-700 mb-3"></div>
            <div className="max-w-96 w-full bg-stone-700 h-8 mb-1"></div>
            <div className="max-w-80 w-full bg-stone-700 h-8 mb-8"></div>
            <div className="flex gap-x-1">
            <div className="h-10 w-40 bg-stone-700"></div>
            <div className="h-10 w-32 bg-stone-700"></div>
            </div>
        </Skeleton>
    </section>
  )
}
export default HomeLoading