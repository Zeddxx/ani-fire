"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { Button } from "../ui/button";
import { MainNavbarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { BiSolidLogInCircle } from "react-icons/bi";
import { useSearchParams } from "next/navigation";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  const params = useSearchParams();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [params])

  return (
    <>
      {isMenuOpen && (
        <div onClick={() => setIsMenuOpen(false)} className="w-full h-full bg-black/40 backdrop-blur-xl fixed z-30"></div>
      )}
      <aside
        className={cn(
          "py-10 fixed left-0 z-40 top-0 h-screen bg-black/50 backdrop-blur-md overflow-hidden duration-200",
          isMenuOpen ? "w-[18rem] px-3" : "w-0"
        )}
      >
        <Button
          onClick={() => setIsMenuOpen(false)}
          variant="ghost"
          className="flex gap-x-2 shrink-0 items-center rounded-full  py-3 px-4"
        >
          <IoIosArrowBack />
          <p className="overflow-hidden truncate">Close menu</p>
        </Button>

        <ul className="my-4 flex-shrink-0">
          {MainNavbarItems.map((item) => (
            <li className="py-4 hover:text-primary font-semibold truncate" key={item.name}>
              <Link href={item.href}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <header className="h-20 xl:px-0 md:px-4 bg-gradient-to-t w-full absolute z-30 top-0 flex items-center duration-300 from-transparent via-black/50 to-black">
        <nav className="flex justify-between items-center max-w-screen-2xl px-4 mx-auto w-full">
          <div className="flex gap-x-4 items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex gap-x-2"
            >
              <MenuIcon />
              <span className="md:block hidden">Menu</span>
            </button>

            <Link href="/">
              <Image src="/assets/logo.svg" alt="logo" height={22} width={22} />
            </Link>
          </div>

          <div className="flex items-center gap-x-3 sm:gap-x-6">
            <Button onClick={() => setIsSearchOpen(!isSearchOpen)} size="icon" variant="outline">
              <SearchIcon className="h-6 w-6" />
            </Button>

            <Button disabled className="sm:w-36 px-2 sm:py-1">
              <span className="hidden sm:block">Login</span>
              <BiSolidLogInCircle className="w-5 h-5" />
            </Button>
          </div>
        </nav>
      </header>

      <div className={cn("w-full bg-black duration-300 delay-100 overflow-hidden", isSearchOpen ? "h-40" : "h-0")}></div>

    </>
  );
};
export default MainNavbar;
