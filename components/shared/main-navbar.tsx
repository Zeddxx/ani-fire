'use client';

import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react"
import Image from "next/image";
import { useState } from "react";

const MainNavbar = () => {
  const [ isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
    <aside className={cn("py-10 fixed left-0 z-20 top-0 h-screen bg-black/50 backdrop-blur-md overflow-hidden duration-200", isMenuOpen ? "w-[16rem] px-3" : "w-0")}>
        <button onClick={() => setIsMenuOpen(false)} className="flex gap-x-2 shrink-0 items-center rounded-full bg-gray-900 py-3 px-4">
            <Image src="/assets/arrow-left.svg" alt="arrow-left" width={20} height={20} />
            <p className="overflow-hidden truncate">Close menu</p>
        </button>
    </aside>
    <header className="h-20 xl:px-0 px-4 w-full flex items-center max-w-[1420px] mx-auto">
        <nav className="flex justify-between">
          <button onClick={() => setIsMenuOpen(true)} className="flex gap-x-2">
            <MenuIcon />  
            Menu
          </button>  
        </nav>
    </header>
    </>
  )
}
export default MainNavbar