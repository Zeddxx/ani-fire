import { GENRES } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Content from "./_components/content";

type Props = {
  params: Promise<{ genre: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const genre = (await params)?.genre as string;
  const page = ((await searchParams)?.page as string) || "1";
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${capitalize(genre.replaceAll("-", " "))} Anime - Page ${page} | AniFire`,
    keywords: genre.split("-"),
    description: `Explore vast library for ${genre} Genre only on AniFire.`,
    openGraph: {
      title: `${capitalize(genre.replaceAll("-", " "))} Anime - Page ${page} | AniFire`,
      description: `Explore vast library for ${genre} Genre only on AniFire.`,
      images: [...previousImages],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  const isInvalidGenre = !GENRES.includes(genre);

  if (isInvalidGenre) notFound();

  return (
    <div className="wrapper-container flex flex-col gap-7 px-4 py-4 xl:mt-14 xl:flex-row">
      <Content genre={genre} />
    </div>
  );
}
