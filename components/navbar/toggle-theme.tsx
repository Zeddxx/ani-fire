'use client';

import { useTheme } from "next-themes";
import { Button } from "../ui/button"
import { SunMoonIcon } from "lucide-react";
import Image from "next/image";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light" || theme === "system") {
      return setTheme("dark");
    } else if (theme === "dark" || theme === "system") {
      return setTheme("light");
    } else {
      return setTheme("system");
    }
  };

  return (
    <Button onClick={toggleTheme} size="icon" asChild variant="outline">
              <span className="cursor-pointer">
                {theme === "system" ? (
                  <SunMoonIcon size={18} />
                ) : theme === "dark" ? (
                  <Image
                    src="/assets/icons/moon.svg"
                    alt="moon icon"
                    className="invert select-none"
                    height={18}
                    width={18}
                  />
                ) : (
                  <Image
                    src="/assets/icons/sun.svg"
                    alt="sun icon"
                    height={20}
                    className="dark:invert select-none"
                    width={20}
                  />
                )}
              </span>
              </Button>
  )
}
export default ToggleTheme