import MainNavbar from "@/components/shared/main-navbar"
import Image from "next/image"

const MainLayout = ({ children } : { children : React.ReactNode }) => {
  return (
    <main className="w-full relative">
        <div className="h-96 -z-10 w-full absolute top-0 blur-xl">
          <Image src="/assets/bg-image.jpg" alt="image" fill className="h-full w-full object-cover" />
        </div>
        <MainNavbar />
        <section className="w-full">
            {children}
        </section>
    </main>
  )
}
export default MainLayout