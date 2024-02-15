'use client';

import { useScrollTop } from "@/hooks";
import { Button } from "../ui/button";
import { IoIosArrowUp } from "react-icons/io";

const FloatingButton = () => {
    const scrolled = useScrollTop();

    const handleTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  if(!scrolled) return null
  return (
        <Button
          onClick={handleTop}
          className="h-12 grid place-items-center rounded-full w-12 fixed bottom-4 cursor-poiner z-20 right-4"
        >
          <IoIosArrowUp className="h-4 w-4" />
        </Button>
  )
}
export default FloatingButton