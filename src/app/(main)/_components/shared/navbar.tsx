"use client";

import { useSiteStore } from "@/store/site";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const { setIsSidebarOpen } = useSiteStore();
  return (
    <nav className="inset-x-0 top-0 z-[999] mx-auto flex h-16 w-full max-w-screen-3xl items-center bg-primary-100 px-4 xl:fixed xl:bg-transparent">
      <div className="flex items-center gap-2">
        <button onClick={() => setIsSidebarOpen(true)} className="text-white">
          <GiHamburgerMenu className="h-5 w-5" />
        </button>

        <Link href="/" className="text-xl font-semibold text-white">
          AniFire
        </Link>
      </div>
    </nav>
  );
}
