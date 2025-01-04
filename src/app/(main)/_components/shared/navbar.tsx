"use client";

import useScroll from "@/hooks/use-scroll";
import { useSiteStore } from "@/store/site";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const { setIsSidebarOpen } = useSiteStore();
  const { isScrolled } = useScroll();
  return (
    <nav
      data-scrolled={isScrolled}
      className="inset-x-0 top-0 z-[9999] h-16 w-full bg-primary-100 px-4 xl:fixed xl:bg-transparent xl:data-[scrolled=true]:bg-primary/80 xl:data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-screen-3xl items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="mt-1.5 text-white"
          >
            <GiHamburgerMenu className="h-6 w-6" />
          </button>

          <Link href="/" className="text-xl font-semibold text-white">
            <Image
              src="/assets/logo/an!fire.png"
              alt="Anifire logo"
              width={100}
              height={30}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
