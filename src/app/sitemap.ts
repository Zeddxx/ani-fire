import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ani-fire.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://ani-fire.vercel.app/home",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
