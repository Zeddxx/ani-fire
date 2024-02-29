'use client';

import { useTheme } from "next-themes";
import { Button } from "../ui/button"
import { Moon, Sun } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { GrSystem } from "react-icons/gr";

const ToggleTheme = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[999] border-muted" align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="h-4 w-4 mr-2" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="h-4 w-4 mr-2" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
                <GrSystem className="h-3 w-3 mr-2" /> System
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ToggleTheme