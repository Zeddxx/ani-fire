"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, SearchIcon } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowUp } from "react-icons/io";

import { Button } from "../ui/button";
import { MainNavbarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { BiSolidLogInCircle } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useScrollTop } from "@/hooks";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);
  const params = useSearchParams();
  const scrolled = useScrollTop()

  const handleButton = () => {
    return window.location.assign(`/search?keyword=${searchQuery}&page=1`)
  }

  const handleQuery = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      console.log("enter");
      return window.location.assign(`/search?keyword=${searchQuery}&page=1`)
    }
  }

  const handleSearchOption = () => {
    setIsSearchOpen(!isSearchOpen)
    if(!isSearchOpen && searchRef) {
      return searchRef?.current?.focus()
    }
  }

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
      <header className="h-20 xl:px-0 md:px-4 bg-gradient-to-t w-full fixed z-30 top-0 flex items-center duration-300 from-transparent via-black/50 to-black">
        <nav className="flex justify-between items-center max-w-screen-2xl z-20 px-4 mx-auto w-full">
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
            <Button onClick={handleSearchOption} size="icon" variant="outline">
              <SearchIcon className="h-6 w-6" />
            </Button>

            <Button disabled className="sm:w-36 px-2 sm:py-1">
              <span className="hidden sm:block">Login</span>
              <BiSolidLogInCircle className="w-5 h-5" />
            </Button>
          </div>
        </nav>

      <div className={cn("w-full gap-x-4 bg-black absolute z-10 top-0 flex items-end px-4 duration-300 overflow-hidden", isSearchOpen ? "md:h-60 h-52 py-6" : "h-0")}>
        <div className="flex flex-collg:flex-row w-full gap-4">
        <Input ref={searchRef} onKeyDown={(e) => handleQuery(e)} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Attack on titan" />
        <Button onClick={handleButton} disabled={!searchQuery} className="md:w-32 w-full">Search</Button>
        </div>
      </div>
      </header>

      {scrolled && (
        <Button onClick={handleTop} className="h-12 grid place-items-center rounded-full w-12 fixed bottom-4 cursor-poiner z-20 right-4">
          <IoIosArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
export default MainNavbar;
