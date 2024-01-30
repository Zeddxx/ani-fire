"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, Moon, SearchIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

import { Button } from "../ui/button";
import { MainNavbarItems, genreList, headerItems } from "@/constants";
import Link from "next/link";
import { Input } from "../ui/input";
import { useScrollTop } from "@/hooks";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [more, setMore] = useState<number>(10);
  const params = useSearchParams()

  const searchRef = useRef<HTMLInputElement>(null);

  const scrolled = useScrollTop();

  const { theme, setTheme } = useTheme();

  const handleButton = () => {
    return window.location.assign(`/search?keyword=${searchQuery}&page=1`);
  };

  const handleQuery = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      return window.location.assign(`/search?keyword=${searchQuery}&page=1`);
    }
  };

  const handleSearchOption = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && searchRef) {
      setIsMenuOpen(false);
      return searchRef?.current?.focus();
    }
  };

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [params]);

  const toggleTheme = () => {
    if (theme === "light" || theme === "system") {
      return setTheme("dark");
    } else if (theme === "dark" || theme === "system") {
      return setTheme("light");
    } else {
      return setTheme("system");
    }
  };

  return (
    <>
      {isMenuOpen && !isSearchOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="w-full h-screen bg-black/40 backdrop-blur-sm fixed z-[99999]"
        ></div>
      )}
      <aside
        className={cn(
          "py-10 fixed left-0 z-[99999] top-0 h-screen bg-black/50 backdrop-blur-md overflow-hidden duration-200",
          isMenuOpen ? "w-[18rem] px-3" : "w-0"
        )}
      >
        <Button
          onClick={() => setIsMenuOpen(false)}
          variant="outline"
          className="flex gap-x-2 shrink-0 items-center rounded-full py-3"
        >
          <p className="overflow-hidden truncate">Close menu</p>
        </Button>

        <div className="h-full overflow-y-scroll scroll-hidden">
          <ul className="my-4 flex-shrink-0">
            {MainNavbarItems.map((item) => (
              <li
                className="py-3 font-medium truncate dark:text-current text-white"
                key={item.name}
              >
                <a
                  href={item.href}
                  className="hover:text-primary"
                  title={"Go To" + " " + item.name}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <ul className="grid grid-cols-3 gap-4 pb-8">
            {genreList.slice(0, more).map((genre, index) => (
              <li
                className={cn("font-normal text-sm rounded-full hover:underline")}
                key={index}
              >
                <a href={genre.href} className="truncate w-16">{genre.name}</a>
              </li>
            ))}
            <p onClick={() => setMore(40)}>more</p>
          </ul>
        </div>
      </aside>
      <header
        className={cn(
          "h-16 px-4 w-full sticky z-[999] top-0 flex items-center bg-white dark:bg-black dark:border-b-muted",
          scrolled && "border-b"
        )}
      >
        <nav className="flex justify-between items-center max-w-screen-2xl z-20 mx-auto w-full">
          <div className="flex gap-x-4 items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex gap-x-2 text-secondary-foreground dark:text-white items-center"
            >
              <Image
                src="/assets/icons/menu.svg"
                alt="Menu icon"
                height={24}
                className="invert dark:invert-0"
                width={24}
              />
              <span className="md:block hidden">Menu</span>
            </button>

            <Link href="/home">
              <img
                src="/assets/nav.gif"
                alt="logo"
                loading="eager"
                height={56}
                width={56}
              />
            </Link>
          </div>

          <ul className="lg:flex gap-4 hidden">
            {headerItems.map((item, index) => (
              <li key={item.name} className="flex gap-4 items-center">
               <Link href={item.href}>{item.name}</Link>
                <span className={cn("text-muted-foreground", index === 2 && "hidden")}>{"/"}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-x-3 sm:gap-x-3">
            <Button onClick={toggleTheme} size="icon" asChild variant="outline">
              <span>
                {theme === "system" ? (
                  <SunMoonIcon size={18} />
                ) : theme === "dark" ? (
                  <Image
                    src="/assets/icons/moon.svg"
                    alt="moon icon"
                    className="invert select-none"
                    height={18}
                    width={18}
                  />
                ) : (
                  <Image
                    src="/assets/icons/sun.svg"
                    alt="sun icon"
                    height={20}
                    className="dark:invert select-none"
                    width={20}
                  />
                )}
              </span>
            </Button>

            <Button onClick={handleSearchOption} size="icon" variant="outline">
              <SearchIcon className="h-6 w-6 text-secondary-foreground dark:text-secondary-foreground" />
            </Button>

            <Button disabled className="sm:w-36 px-2 sm:py-1">
              Login
            </Button>
          </div>
        </nav>

        <div
          className={cn(
            "w-full gap-x-4 dark:bg-black bg-slate-100 left-0 absolute z-10 top-0 flex items-end px-4 duration-300 overflow-hidden",
            isSearchOpen ? "md:h-60 h-52 py-6" : "h-0"
          )}
        >
          <div className="flex flex-col lg:flex-row w-full gap-4">
            <Input
              ref={searchRef}
              onKeyDown={(e) => handleQuery(e)}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Attack on titan"
            />
            <Button
              onClick={handleButton}
              disabled={!searchQuery}
              className="md:w-32 w-full"
            >
              Search
            </Button>
          </div>
        </div>
      </header>

      {scrolled && (
        <Button
          onClick={handleTop}
          className="h-12 grid place-items-center rounded-full w-12 fixed bottom-4 cursor-poiner z-20 right-4"
        >
          <IoIosArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
export default MainNavbar;
