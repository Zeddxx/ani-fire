import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100svh-80px)] w-full flex-col items-center justify-center gap-3 px-4 text-center">
      <h2 className="text-3xl font-semibold text-secondary">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/home" className="text-secondary underline">
        Return Home
      </Link>
    </div>
  );
}
