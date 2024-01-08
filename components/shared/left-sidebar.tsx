'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { AsideNavbarItems, CategoriesItems, GeneralItems } from "@/constants";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const LeftSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <aside
        className={cn(
          "lg:max-w-xs sticky top-0 border-r lg:w-full bg-stone-900 h-screen duration-200",
          isOpen ? "w-[16rem]" : "w-16"
        )}
      >
        <div className="pt-4 flex flex-col">
          <div className="pl-4">
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={28}
              height={28}
              className=""
            />
          </div>

          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "close" : "open"}</button>

          <div className="my-10">
            <h1 className="text-white flex gap-x-5 items-center overflow-hidden font-medium text-xl ml-4">
              <Image
                src="/assets/menu.svg"
                width={24}
                height={24}
                alt="menu item"
                className={cn("invert", isOpen && "hidden")}
              />
              <span className={cn(isOpen ? "block" : "hidden")}>Menu</span>
            </h1>

            <Separator className="mt-4 bg-stone-700" />

            <div className="my-4">
              {AsideNavbarItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-white my-2 hover:bg-stone-100/10 pl-4 flex overflow-hidden gap-x-6 text-start py-2"
                >
                  <Image
                    src={item.icon}
                    alt="icon"
                    width={24}
                    height={24}
                    className="invert shrink-0"
                  />
                  <span className="text-md">{item.name}</span>
                </button>
              ))}
            </div>

            <Separator className="bg-stone-700" />

            <div className="my-4">
              <h2 className="pl-4 text-xl text-white font-medium">
                <Image
                  src="/assets/category.svg"
                  width={24}
                  height={24}
                  alt="menu item"
                  className={cn("invert", isOpen && "hidden")}
                />
                <span className={cn(isOpen ? "block" : "hidden")}>
                  Categories
                </span>
              </h2>
            </div>

            <Separator className="bg-stone-700" />

            <div className="my-4">
              {CategoriesItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-white my-2 hover:bg-stone-100/10 pl-4 flex overflow-hidden gap-x-6 text-start py-2"
                >
                  <Image
                    src={item.icon}
                    alt="icon"
                    width={24}
                    height={24}
                    className="invert shrink-0"
                  />
                  <span className="text-md shrink-0">{item.name}</span>
                </button>
              ))}
            </div>
            <Separator className="bg-stone-700" />

            <div className="my-4">
              <h2 className="pl-4 text-xl text-white font-medium">
                <Image
                  src="/assets/category.svg"
                  width={24}
                  height={24}
                  alt="menu item"
                  className={cn("invert", isOpen && "hidden")}
                />
                <span className={cn(isOpen ? "block" : "hidden")}>
                  Generals
                </span>
              </h2>
            </div>

            <Separator className="bg-stone-700" />

            <div className="my-4">
              {GeneralItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-white my-2 hover:bg-stone-100/10 pl-4 flex overflow-hidden gap-x-6 text-start py-2"
                >
                  <Image
                    src={item.icon}
                    alt="icon"
                    width={24}
                    height={24}
                    className="invert shrink-0"
                  />
                  <span className="text-md shrink-0">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
  )
}
export default LeftSidebar