"use client";

import { fetchGithubStars } from "@/api/github";
import { NumberTicker } from "@/components/ui/number-ticker";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { NavbarLinks } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Github, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";

const NavbarMarket = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["GITHUB_REPO_STARS"],
    queryFn: () => fetchGithubStars(),
    refetchOnMount: false,
  });

  const repoStars = useMemo(
    () => (isLoading ? 100 : data.stargazers_count),
    [data]
  );

  return (
    <header className="sticky top-0 inset-0 z-[99999] bg-black">
      <nav className="w-full flex px-4 py-3 items-center h-16 wrapper-container">
        <div className="xl:hidden h-10 w-10 grid place-items-center">
          <Menu className="h-6 w-6" />
        </div>
        <Link href="/home" className="xl:mr-8 mr-3">
          <Image
            src="/assets/anifire-logo.gif"
            alt="Anifire Logo"
            height={40}
            width={40}
          />
        </Link>

        <ul className="hidden items-center gap-3 xl:flex">
          {NavbarLinks.map(({ href, name }) => (
            <li key={name} className="px-3 py-2 hover:opacity-75 duration-200">
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex-1 dark:bg-white/30 bg-black/30 rounded h-full xl:mx-8 mx-0"></div>
        <div className="md:flex hidden gap-4 items-center xl:mx-0 mx-3">
          <div className="">Log in</div>

          <div className="">Sign up</div>

          <Link
            href="https://github.com/Zeddxx/ani-fire"
            target="_blank"
            className="rounded-full border-muted border px-4 py-2 text-sm"
          >
            Github ⭐
            <NumberTicker className="" value={repoStars} />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default memo(NavbarMarket);
