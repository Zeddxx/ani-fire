'use client';

import { MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MenuItems } from "@/constants";
import Link from "next/link";

const HomeMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  
  return (
    <>
      <header className="h-20 max-w-[1220px] mx-auto w-full xl:px-0 flex items-center px-4">
        <nav className="flex items-center justify-between">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex gap-x-2 items-center">
            {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            <p className="">{isMenuOpen ? "Close" : "Menu"}</p>
          </button>
        </nav>
      </header>

      <div className={cn("w-full xl:px-0 duration-200 overflow-hidden px-4", isMenuOpen ? "h-80" : "h-0")}>
        <ul className="w-full h-full items-center flex flex-col justify-around py-6">
            {MenuItems.map((menu) => (
                <li key={menu.name} className="hover:underline w-fit">
                    <Link href={menu.href}>{menu.name}</Link>
                </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default HomeMenu;
