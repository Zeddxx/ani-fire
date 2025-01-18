"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useScroll from "@/hooks/use-scroll";
import { useSiteStore } from "@/store/site";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";

import { logout } from "@/actions/logout";
import SignedIn from "@/components/auth/signed-in";
import SignedOut from "@/components/auth/signed-out";
import AuthModal from "@/components/modals/auth-modal";
import { SearchValidateSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Navbar() {
  const { setIsSidebarOpen, setIsSearchBarOpen, isSearchBarOpen } =
    useSiteStore();

  const { isScrolled } = useScroll();

  const [query] = useQueryState("keyword", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm<z.infer<typeof SearchValidateSchema>>({
    resolver: zodResolver(SearchValidateSchema),
    defaultValues: {
      query: query ?? "",
    },
  });

  const onSubmit = handleSubmit(({ query }) => {
    router.push(`/search?keyword=${query}`);
    setIsSearchBarOpen(false);
  });

  useEffect(() => {
    if (isSearchBarOpen) {
      setFocus("query");
    }
  }, [isSearchBarOpen]);

  return (
    <nav
      data-scrolled={isScrolled}
      className="relative inset-x-0 top-0 z-[999] w-full bg-primary-100 px-4 py-2 md:h-16 xl:fixed xl:bg-transparent xl:data-[scrolled=true]:bg-primary/80 xl:data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-screen-3xl items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="mt-1.5 text-white"
          >
            <GiHamburgerMenu className="h-6 w-6 md:h-7 md:w-7" />
          </button>

          <Link
            href="/"
            className="relative h-8 w-24 text-xl font-semibold text-white sm:w-32 xl:shrink-0"
          >
            <Image
              src="/assets/logo/an!fire.png"
              alt="Anifire logo"
              fill
              className="object-contain"
            />
          </Link>

          <form
            onSubmit={onSubmit}
            className="relative hidden h-full w-full max-w-sm shrink-0 items-center gap-3 xl:flex"
          >
            <Input
              data-error={!!errors.query as boolean}
              className="h-10 w-full rounded-none pr-12 data-[error=true]:bg-red-100 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
              placeholder="Search anime..."
              {...register("query")}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              type="submit"
            >
              <IoSearch className="h-5 w-5 text-black" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
            variant="ghost"
            size="icon"
            className="xl:hidden"
          >
            <FaSearch
              data-open={isSearchBarOpen}
              className="!h-5 !w-5 text-white data-[open=true]:text-secondary"
            />
          </Button>

          <SignedOut>
            <AuthModal />
          </SignedOut>

          <SignedIn>
            <div
              onClick={() => logout()}
              className="h-8 w-8 rounded-full bg-white"
            ></div>
          </SignedIn>
        </div>
      </div>

      {isSearchBarOpen && (
        <div className="absolute inset-x-0 top-full h-14 w-full bg-primary-100 px-4 py-2 xl:hidden">
          <form
            onSubmit={onSubmit}
            className="relative flex h-full items-center gap-3"
          >
            <Input
              data-error={!!errors.query as boolean}
              className="h-full w-full pr-12 data-[error=true]:bg-red-100 data-[error=true]:text-red-500 data-[error=true]:outline-red-500"
              placeholder="Search anime..."
              {...register("query")}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              type="submit"
            >
              <IoSearch className="h-5 w-5 text-black" />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
