/* eslint-disable @next/next/no-img-element */
import { getAnimeInfoById } from "@/lib/function";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Anifire beta anime description.";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  //Feting regular information from API
  const info = await getAnimeInfoById(params.id);

  return new ImageResponse(
    (
      <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.4rem',
        height: "100%",
        width: "100%",
        background: "white"
      }}
      >
        <img
          src={info?.anime.info.poster}
          alt={info?.anime.info.name}
          style={{
            height: '100%',
            width: '100%',
            objectFit: "cover"
          }}
        />
        <h1 className="text-black">{info?.anime.info.name}</h1>
        <p className="truncate w-56">{info?.anime.info.description}</p>
      </div>
    ),
    {
      ...size,
    }
  );
}
