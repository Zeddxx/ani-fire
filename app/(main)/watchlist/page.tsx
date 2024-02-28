/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import Link from "next/link"

const WatchlistPage = () => {
  return (
    <section className="max-w-screen-2xl w-full mx-auto px-4">
        <h1 className="text-4xl text-primary font-semibold">Watchlater Anime</h1>
        <div className="h-[calc(90svh-80px)] flex flex-col items-center justify-center gap-4">
            <img src="/assets/nothing.gif" alt="nothing here!" height={430} width={430} className="object-contain" />
            <h2 className="text-xl text-secondary-foreground font-semibold">Your wishlist is Empty.</h2>
            <Button variant="link">
                <Link href="/home">Add Anime to WatchList?</Link>
            </Button>
            <p>This Page still under development!</p>
        </div>
    </section>
  )
}
export default WatchlistPage