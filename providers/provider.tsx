"use client";

import { MenuProvider } from "@/context/menu-provider";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
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
      </ReduxProvider>
    </SessionProvider>
  );
};
export default Provider;
