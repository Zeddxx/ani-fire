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
  const desc: string = description.slice(0, 146) + "...";

  return {
    title: `${name} | AniFire`,
    description: desc,
    metadataBase: new URL("https://ani-fire.vercel.app"),
    keywords: name.split(" "),
    openGraph: {
      description: desc,
      title: name + " | AniFire",
      images: poster ? poster : previousImages,
    },
  };
}

export default function RootInfoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
