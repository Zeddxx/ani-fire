"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaSpinner, FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { BookMarked } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { MenuContext } from "@/context/menu-provider";

const UserButton = () => {
  const { data, status } = useSession();
  const { handleClick } = useContext(MenuContext);

  if (status === "unauthenticated") return null;
  if (status === "loading") {
    return (
      <div className="">
        <span>
          <FaSpinner className="animate-spin h-5 w-5" />
        </span>
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={handleClick}>
        <Avatar>
          <AvatarImage
            src={data?.user.image || ""}
            title={data?.user.name || ""}
          />
          <AvatarFallback className="bg-muted border-muted">
            <FaUser className="dark:text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-6 w-40 border-muted" align="end">
        <Link href="/settings">
          <DropdownMenuItem>
            <GearIcon className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard">
          <DropdownMenuItem>
            <BookMarked className="h-4 w-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
