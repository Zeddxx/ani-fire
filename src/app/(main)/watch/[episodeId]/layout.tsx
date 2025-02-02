import { fetchAnimeInfoByAnimeId } from "@/app/api/v1/controller/anime";
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
  } = await fetchAnimeInfoByAnimeId(animeId);

  const previousImages = (await parent).openGraph?.images || [];
  const desc: string = description.slice(0, 146) + "...";

  return {
    title: `Watching ${name}` + " | AniFire",
    description: desc,
    keywords: name.split(" "),
    openGraph: {
      description: desc,
      title: `Watching ${name}` + " | AniFire",
      images: poster ? poster : previousImages,
    },
  };
}

export default function RootInfoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
