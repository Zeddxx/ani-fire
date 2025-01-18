"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import useScroll from "@/hooks/use-scroll";
import { usePlayerStore } from "@/store/player-store";

import { IoIosArrowUp } from "react-icons/io";

import Sidebar from "@/components/main/ui/sidebar";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { light, setLight } = usePlayerStore();
  const { isScrolled } = useScroll();

  // to reset the setLight function back to false on pathname changes
  useEffect(() => {
    setLight(false);
  }, [pathname]);

  return (
    <main>
      {light && (
        <div
          onClick={() => setLight(false)}
          className="fixed inset-0 z-[9999] h-[100dvh] w-screen bg-black/90"
        />
      )}

      <Sidebar />

      <div className="">{children}</div>

      {isScrolled && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-6 right-6 z-[999] grid h-14 w-14 place-items-center rounded-full bg-secondary text-black"
        >
          <IoIosArrowUp className="h-7 w-7" />
        </button>
      )}
    </main>
  );
}
