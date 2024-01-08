import Image from "next/image"
import { Button, buttonVariants } from "../ui/button"
import { NavbarItems } from "@/constants"
import { cn } from "@/lib/utils"

const Navbar = () => {
  return (
    <header className="max-w-[1420px] mx-auto w-full h-16 flex items-center sticky top-0 z-20 bg-slate-50">
      <nav className="flex justify-between w-full px-4 items-center">
        <Image
        src="/assets/logo.svg"
        alt="logo"
        width={140}
        height={16}
        />

        <div className="lg:flex hidden gap-x-1.5">
          {NavbarItems.map((item, index) => {
            return(
              <Button key={index} variant="ghost" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
                {item.name}
          </Button>
            )
          })}
        </div>

        <div className="lg:hidden">
          Menu
        </div>
      </nav>
    </header>
  )
}
export default Navbar