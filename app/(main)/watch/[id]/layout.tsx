import { URI } from "@/constants";
import { getAnimeEpisodes, getAnimeInfoById } from "@/lib/function";
import { Metadata } from "next";

type SearchProps = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
  searchParams
}: SearchProps): Promise<Metadata> {
  const info = await getAnimeInfoById(params.id);
  const episodes = await getAnimeEpisodes(params.id);
  const epId = searchParams?.ep || "";
  const query = params.id + "?ep=" + epId;

  console.log({query, searchParams });

  const isCurrentEpisode = episodes?.episodes.find(
    (episode) => episode.episodeId === query
  );
  return {
    metadataBase: new URL(URI),
    title: `Watching Episode ${isCurrentEpisode?.number} | ${info?.anime.info.name} | AniFire`,
    generator: "Next.js",
    applicationName: "Anifire App",
    description: info?.anime.info.description,
    keywords: ["anime", "free anime", "no-ads", "no-popups", "anifire", info?.anime.info.name || "", `watch ${info?.anime.info.id} on Anifire`, `Watch ${info?.anime.info.name} on Anifire`],
    authors: [{ name: "Sahil Ahmed", url: "https://github.com/zeddxx" }],
    creator: "Sahil Ahmed | Zeddxx",
    publisher: "Sahil Ahmed | Zeddxx",
    openGraph: {
      description: info?.anime.info.description,
      title: `Watch ${isCurrentEpisode?.title ? isCurrentEpisode.title : `Episode ${isCurrentEpisode?.number}`} Exclusively on AniFire without any popups or ads.`,
    },
    alternates: {
        canonical: "https://anifire-beta.vercel.app",
      },
      formatDetection: {
        telephone: false,
      },
      twitter: {
        card: "summary",
        title: `Watch ${isCurrentEpisode?.title ? isCurrentEpisode.title : `Episode ${isCurrentEpisode?.number}`} from (${info?.anime.info.name}) Exclusively on AniFire without any popups or ads.`,
        description: info?.anime.info.description,
        siteId: `https://ani-fire.vercel.app/${info?.anime.info.id}`,
        creator: "@Zeddxx",
        creatorId: "Sahil Ahmed",
        images: [info?.anime.info.poster || ""],
      },
  };
}

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
  searchParams: { [key: string] : string | string[]}
}) {
  return <div className="">{children}</div>;
}
