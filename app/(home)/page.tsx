"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllAnime } from "@/lib/query-api";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const { data, isLoading } = useGetAllAnime();
  const [query, setQuery] = useState<string>("");

  if (isLoading) return null;

  return (
    <div className="w-full h-auto max-w-[1220px] my-4 mx-auto xl:px-0 px-4">
      <div className="flex gap-x-4 items-end">
        <Image src="/assets/logo.svg" alt="logo" width={52} height={52} />
        <p className="text-6xl font-bold leading-none">
          Ani
          <span className="text-[#FF003D]">Fire</span>
        </p>
      </div>

      <div className="flex w-full items-center gap-x-6">
        <div className="w-full">
          <div className="w-full gap-x-5 h-auto my-8 flex">
            <Input
              className="rounded-full h-14 text-black text-lg pl-6 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="One piece"
            />
            <Button
              asChild
              className="h-14 text-white bg-[#FF003D] hover:bg-[#FF003D]/80 rounded-full w-14 shrink-0"
            >
              <a href={`/search?keyword=${query}`} className={cn(!query && "pointer-events-none opacity-70")}>
                <SearchIcon className="h-6 w-6" />
              </a>
            </Button>
          </div>
          <div className="flex w-full">
            <p>
              <span className="font-medium mr-2">Top search:</span>
              {isLoading
                ? "loading..."
                : data?.trendingAnimes.map((anime) => (
                    <a
                      href={`/search?keyword=${anime.name}`}
                      key={anime.id}
                      className="hover:text-[#FF003D] duration-150"
                    >
                      {anime.name}
                      {", "}
                    </a>
                  ))}
            </p>
          </div>
        </div>

        <div className="relative hidden lg:block h-[30vw] max-h-72 max-w-[34rem] min-w-[26rem] w-[60vw]">
          <Image
            src="/assets/banner.svg"
            alt="hinata shoyo"
            fill
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <button className="w-full my-4 p-4 h-16 bg-rose-600 rounded-br-full rounded-bl-full">
        Visit full site
      </button>
    </div>
  );
};
export default Home;
