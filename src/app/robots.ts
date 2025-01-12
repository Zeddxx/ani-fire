import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth/*", "/private/"],
    },
    sitemap: "https://ani-fire.vercel.app/sitemap.xml",
  };
}
