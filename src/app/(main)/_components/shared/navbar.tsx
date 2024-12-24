import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[999] mx-auto flex h-16 w-full max-w-screen-3xl items-center bg-primary px-4 xl:bg-transparent">
      <div className="flex items-center gap-2">
        <button className="text-white">
          <GiHamburgerMenu className="h-5 w-5" />
        </button>

        <Link href="/" className="text-xl font-semibold text-white">
          AniFire
        </Link>
      </div>
    </nav>
  );
}
