"use client";

import { fetchGithubStars } from "@/api/github";
import SearchInput from "@/components/main/forms/search-input";
import { NumberTicker } from "@/components/ui/number-ticker";
import { NavbarLinks } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";
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
    [data],
  );

  return (
    <header className="sticky inset-0 top-0 z-[99999] bg-black">
      <nav className="wrapper-container flex h-16 w-full items-center px-4 py-3">
        <div className="grid h-10 w-10 place-items-center xl:hidden">
          <Menu className="h-6 w-6" />
        </div>
        <Link href="/home" className="mr-3 xl:mr-8">
          <Image
            src="/assets/anifire-logo.gif"
            alt="Anifire Logo"
            height={40}
            width={40}
          />
        </Link>

        <ul className="hidden items-center gap-3 xl:flex">
          {NavbarLinks.map(({ href, name }) => (
            <li key={name} className="px-3 py-2 duration-200 hover:opacity-75">
              <Link href={href}>{name}</Link>
            </li>
          ))}
        </ul>

        <div className="mx-0 h-full flex-1 xl:mx-8">
          <SearchInput />
        </div>
        <div className="mx-3 hidden items-center gap-4 md:flex xl:mx-0">
          <div className="">Log in</div>

          <div className="">Sign up</div>

          <Link
            href="https://github.com/Zeddxx/ani-fire"
            target="_blank"
            className="rounded-full border border-muted px-4 py-2 text-sm"
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
