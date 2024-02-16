"use client";

import { MenuProvider } from "@/context/menu-provider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <MenuProvider>
        <ThemeProvider
          defaultTheme="light"
          storageKey="ani_fire_theme_storage"
          enableSystem
          attribute="class"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </MenuProvider>
    </SessionProvider>
  );
};
export default Provider;
