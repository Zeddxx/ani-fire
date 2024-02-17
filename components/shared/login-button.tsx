import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LoginButton = async () => {
  const session = await auth();

  if (session?.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="/assets/avatar.svg" />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-3">
          <DropdownMenuLabel className="text-xl font-normal">
            <span className="text-primary">{session.user.name}&apos;s</span>{" "}
            Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="py-3" disabled>Profile</DropdownMenuItem>
          <DropdownMenuItem asChild className="py-3">
            <Link href="/watchlist">
            Watch List
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenu>
            <form>
              <Button
                formAction={async () => {
                  "use server";

                  await signOut();
                }}
                className="w-full rounded-none"
              >
                Logout
              </Button>
            </form>
          </DropdownMenu>
        </DropdownMenuContent>
      </DropdownMenu>

      //
    );
  }
  return (
    <Button asChild disabled className="sm:w-36 px-3 sm:py-1">
      <Link href="/auth/login">Login</Link>
    </Button>
  );
};
export default LoginButton;
