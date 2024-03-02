'use client';

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { COLORS, MainNavbarItems, genreList } from "@/constants";
import { useContext, useState } from "react";
import { MenuContext } from "@/context/menu-provider";

const LeftSidebar = () => {
  const { isMenuOpen, isSearchOpen, toggleMenu, handleClick } = useContext(MenuContext)
  const [more, setMore] = useState<number>(10);

  const handleToggle = () => {
    if (more === 10) {
      setMore(40);
    } else if (more === 40) {
      setMore(10);
    }
  };

  return (
    <>
    {isMenuOpen && !isSearchOpen && (
      <div
        onClick={toggleMenu}
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
        onClick={toggleMenu}
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
              onClick={handleClick}
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
              style={{
                color: COLORS[Number(index) % COLORS.length],
              }}
              className={cn(
                "font-normal text-sm rounded-full hover:underline"
              )}
              key={index}
            >
              <a onClick={handleClick} href={genre.href} className="truncate w-16">
                {genre.name}
              </a>
            </li>
          ))}
          <Button
            variant="link"
            onClick={handleToggle}
            className="h-fit w-fit p-0"
          >
            {more === 10 ? "More" : "Less"}
          </Button>
        </ul>
      </div>
    </aside>
    </>
  )
}
export default LeftSidebar