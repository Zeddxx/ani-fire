"use client";

import { createContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  isMenuOpen: false,
  isSearchOpen: false,
  toggleMenu: () => {},
  toggleSearch: () => {},
  closeMenu: () => {},
  toggleError: () => {},
  handleClick: () => {},
};

const MenuContext = createContext(INITIAL_STATE);

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isPageError, setIsPageError] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleError = () => {
    setIsPageError(true);
  };

  const handleClick = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen === true) {
      setIsSearchOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <MenuContext.Provider
      value={{
        handleClick,
        isMenuOpen,
        isSearchOpen,
        toggleMenu,
        toggleSearch,
        closeMenu,
        toggleError,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
