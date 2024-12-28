import { GENRES, SidebarItems } from "@/lib/constants";
import { cn, generateRandomColor } from "@/lib/utils";
import { useSiteStore } from "@/store/site";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MdArrowBackIos } from "react-icons/md";

export default function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSiteStore();
  const sidebarRef = useRef<React.ElementRef<"aside">>(null);

  useEffect(() => {
    if (!sidebarRef.current) return;

    const handleClickOutside = ({ target }: MouseEvent) => {
      if (isSidebarOpen && !sidebarRef.current?.contains(target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 z-[99999] max-h-[100svh] w-full max-w-[16rem] space-y-6 overflow-y-auto bg-white/10 py-6 shadow-xl backdrop-blur-lg duration-300 ease-in-out",
          isSidebarOpen ? "left-0 animate-in" : "-left-full animate-out",
        )}
      >
        <div className="w-full px-3">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-px rounded-full px-3 py-1.5 text-sm font-medium"
          >
            <MdArrowBackIos className="h-3 w-3" />
            Close menu
          </button>
        </div>

        <div className="flex w-full flex-col">
          {SidebarItems.map(({ title, href }) => (
            <Link
              title={title}
              href={href}
              key={title}
              className="border-t border-white/10 p-4 text-[15px] font-medium duration-200 first:border-0 last:border-b hover:text-secondary"
            >
              {title}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 border-b border-white/10 p-4">
          {GENRES.map((genre, idx) => (
            <Link
              key={genre}
              href={`/${genre}`}
              style={{
                color: generateRandomColor(idx),
              }}
              className="py-2.5 text-[13px] capitalize"
            >
              {genre.replaceAll("-", " ")}
            </Link>
          ))}
        </div>
      </aside>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[9999] h-[100svh] w-screen bg-primary/30 backdrop-blur-sm" />
      )}
    </>
  );
}
