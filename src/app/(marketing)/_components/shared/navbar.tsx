"use client";

import { LANDING_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [isToggleMenu, setIsToggleMenu] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside({ target }: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(target as Node)) {
        setIsToggleMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToggleMenu, setIsToggleMenu]);
  return (
    <nav className="relative mx-auto flex h-20 w-full max-w-screen-3xl select-none items-center bg-primary px-8 text-sm md:justify-center xl:mt-14">
      <div
        role="button"
        onClick={() => setIsToggleMenu((prev) => !prev)}
        className={cn(
          "flex items-center gap-1.5 text-sm transition-colors duration-300 md:hidden",
          isToggleMenu && "text-secondary",
        )}
      >
        <GiHamburgerMenu className="h-4 w-4" />
        Menu
      </div>
      {isToggleMenu && (
        <ul
          ref={menuRef}
          className="absolute inset-x-0 top-full z-30 flex w-full flex-col items-center justify-center gap-6 bg-primary pb-14 md:hidden"
        >
          {LANDING_NAV_ITEMS.map(({ name, href }, idx) => (
            <li key={name + idx}>
              <Link
                href={href}
                className="tracking-wide text-white duration-200 hover:text-secondary"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <ul className="hidden w-full items-center justify-center gap-x-12 md:flex">
        {LANDING_NAV_ITEMS.map(({ name, href }, idx) => (
          <li key={name + idx}>
            <Link
              href={href}
              className="tracking-wide text-white duration-200 hover:text-secondary"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
