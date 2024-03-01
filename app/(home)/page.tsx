/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TopSearchItems } from "@/constants";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Home = () => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="w-full h-auto max-w-[1220px] my-4 mx-auto xl:px-0 sm:px-4 px-2">
      <div className="flex gap-x-0 items-end">
        <img src="/assets/nav.gif" alt="logo" width={80} height={72} />
        <p className="text-6xl font-bold text-secondary-foreground dark:text-white leading-none">
          Ani
          <span className="text-[#FF003D]">Fire</span>
        </p>
      </div>

      <div className="flex w-full items-center gap-x-6">
        <div className="w-full">
          <div className="w-full gap-5 h-auto my-8 flex sm:flex-row flex-col">
            <Input
              className="rounded-full h-14 text-lg pl-6"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="One piece"
            />
            <Button
              asChild
              className="rounded-full h-14 w-full sm:w-14 shrink-0"
            >
              <a href={`/search?keyword=${query}`} className={cn(!query && "pointer-events-none opacity-70")}>
                <SearchIcon className="h-6 w-6" />
              </a>
            </Button>
          </div>
          <div className="flex w-full">
            <p>
              <span className="font-medium mr-2 dark:text-primary-foreground text-secondary-foreground">Top search:</span>
                  {TopSearchItems.map((item, index) => (
                    <Link key={item.name + index} href={item.href} className="hover:text-primary duration-300 text-base">
                      {item.name}{', '}
                    </Link>
                  ))}
            </p>
          </div>

      <Button asChild className="w-full rounded-none mt-3">
        <Link href="/home">
          Visit full site
        </Link>
      </Button>
        </div>

        <div className="relative hidden lg:block h-[30vw] max-h-72 max-w-[34rem] min-w-[26rem] w-[60vw]">
          <img
            src="/assets/nav.gif"
            alt="hinata shoyo"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl text-pretty text-secondary-foreground dark:text-primary-foreground font-semibold">AniFire: A website designed exclusively for educational purposes, with no intention of generating revenue or any other commercial pursuits.</h2>
        <p className="text-muted-foreground text-sm">
          This website is ad-free and created by an independent developer. Its intended audience is solely for my developer portfolio. If you accessed this site through word-of-mouth, I kindly request you to exit. Thank you for your understanding.
        </p>
      </div>
    </div>
  );
};
export default Home;
