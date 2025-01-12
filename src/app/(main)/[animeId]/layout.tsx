import { getAnimeInfoByAnimeId } from "@/api/anime";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ animeId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).animeId;
  const {
    anime: {
      info: { name, poster, description },
    },
  } = await getAnimeInfoByAnimeId(id);

  const previousImages = (await parent).openGraph?.images || [];
  const desc: string = description.slice(0, 46) + "...";

  return {
    title: `${name} | AniFire`,
    description: desc,
    keywords: name.split(" "),
    openGraph: {
      description: desc,
      title: name + " | AniFire",
      images: [poster, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: desc,
      siteId: `https://ani-fire.vercel.app/${id}`,
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
