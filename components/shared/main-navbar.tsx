/* eslint-disable @next/next/no-img-element */

"use client";

import { cn } from "@/lib/utils";
import { headerItems } from "@/constants";
import Link from "next/link";
import LeftSidebar from "./left-sidebar";
import ToggleMenuBtn from "../navbar/toggle-menu-btn";
import ToggleTheme from "../navbar/toggle-theme";
import ToggleSearch from "../navbar/toggle-search";
import FloatingButton from "../navbar/floating-button";
import SignedInButton from "../auth/signedin-button";
import UserButton from "../auth/user-button";
import SignedOutButton from "../auth/signedout-button";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";

const MainNavbar = () => {
  const pathname = usePathname();
  const callbackUrl = encodeURIComponent(pathname);
  return (
    <>
      <LeftSidebar />
      <header
        className={cn(
          "h-16 px-4 w-full sticky z-[999] top-0 flex items-center bg-white dark:bg-black dark:border-b-muted"
        )}
      >
        <nav className="flex justify-between items-center max-w-screen-2xl z-20 mx-auto w-full">
          <div className="flex gap-x-4 items-center">
            <ToggleMenuBtn />

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
                <span
                  className={cn(
                    "text-muted-foreground",
                    index === 2 && "hidden"
                  )}
                >
                  {"/"}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-x-3 sm:gap-x-3">
            <ToggleTheme />

            <ToggleSearch />

            <SignedInButton>
              <UserButton />
            </SignedInButton>
            <SignedOutButton>
              <Link
                href={`/auth/login?callbackUrl=${callbackUrl}`}
                className={cn(buttonVariants())}
              >
                Login
              </Link>
            </SignedOutButton>
          </div>
        </nav>
      </header>

      <FloatingButton />
    </>
  );
};
export default MainNavbar;
