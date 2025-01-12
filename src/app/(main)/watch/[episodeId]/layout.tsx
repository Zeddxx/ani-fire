import { getAnimeInfoByAnimeId } from "@/api/anime";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ episodeId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const animeId = (await params).episodeId;

  const {
    anime: {
      info: { name, poster, description },
    },
  } = await getAnimeInfoByAnimeId(animeId);

  const previousImages = (await parent).openGraph?.images || [];
  const desc: string = description.slice(0, 46) + "...";

  return {
    title: `Watching ${name}` + " | AniFire",
    description: desc,
    keywords: name.split(" "),
    openGraph: {
      description: desc,
      title: `Watching ${name}` + " | AniFire",
      images: [poster, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: `Watching ${name} Episode` + " | AniFire",
      description: desc,
      siteId: `https://ani-fire.vercel.app/${animeId}`,
      creator: "@Zeddxx",
      images: [poster, ...previousImages],
    },
  };
}

export default function RootInfoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
