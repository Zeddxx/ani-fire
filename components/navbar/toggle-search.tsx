"use client";

import { KeyboardEvent, useContext, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MenuContext } from "@/context/menu-provider";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ToggleSearch = () => {
  const { toggleSearch, isSearchOpen, closeMenu, handleClick } =
    useContext(MenuContext);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleButton = () => {
    handleClick();
    return window.location.assign(`/search?keyword=${searchQuery}&page=1`);
  };

  const handleQuery = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
      return window.location.assign(`/search?keyword=${searchQuery}&page=1`);
    }
  };

  const handleSearchOption = () => {
    toggleSearch();
    if (!isSearchOpen && searchRef) {
      closeMenu();
      return searchRef?.current?.focus();
    }
  };

  return (
    <>
      <Button onClick={handleSearchOption} size="icon" variant="outline">
        <SearchIcon className="h-6 w-6 text-secondary-foreground dark:text-secondary-foreground" />
      </Button>

      <div
        className={cn(
          "w-full gap-x-4 dark:bg-black bg-slate-100 left-0 absolute -z-10 top-0 flex items-end px-4 duration-300 overflow-hidden",
          isSearchOpen ? "md:h-60 h-52 py-6" : "h-0"
        )}
      >
        <div className="flex flex-col lg:flex-row w-full gap-4">
          <Input
            ref={searchRef}
            onKeyDown={(e) => handleQuery(e)}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Attack on titan"
          />
          <Button
            onClick={handleButton}
            disabled={!searchQuery}
            className="md:w-32 w-full"
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );
};
export default ToggleSearch;
