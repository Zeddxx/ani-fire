"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { Button } from "../ui/button";
import { MainNavbarItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      {isMenuOpen && (
        <div className="w-full h-full bg-black/40 backdrop-blur-xl fixed z-30"></div>
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
            <li className="py-4 font-semibold truncate" key={item.name}>
              {item.name}
            </li>
          ))}
        </ul>
      </aside>
      <header className="h-20 xl:px-0 px-4 bg-neutral-900 w-full flex items-center">
        <nav className="flex justify-between items-center max-w-[1420px] mx-auto w-full">
          <div className="flex gap-x-4 items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex gap-x-2"
            >
              <MenuIcon />
              <span className="md:block hidden">Menu</span>
            </button>

            <Link href="/">
              <Image src="/assets/logo.svg" alt="logo" height={26} width={26} />
            </Link>
          </div>

          <div className="flex items-center gap-x-3">
            <SearchIcon />
          </div>
        </nav>
      </header>
    </>
  );
};
export default MainNavbar;
