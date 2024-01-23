'use client';

import { ThemeProvider }  from "next-themes";
import { ReactNode } from "react";

const Provider = ({ children } : { children : ReactNode }) => {
  return (
    <ThemeProvider
    defaultTheme="light"
    storageKey="ani_fire_theme_storage"
    enableSystem
    attribute="class"
    disableTransitionOnChange
    >
        {children}
    </ThemeProvider>
  )
}
export default Provider