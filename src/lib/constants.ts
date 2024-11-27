export const BASE_URL = () => {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXT_PUBLIC_ANIME_BASE_URL) {
      throw new Error("Please add anime base url");
    }

    return process.env.NEXT_PUBLIC_ANIME_BASE_URL as string;
  } else {
    return "http://localhost:8000/api/v2/hianime";
  }
};

export const FILTERS = {
  type: ["all", "movies", "tv", "ova"],
  status: ["all", "finished-airing", "currently-airing", "not-yet-aired"],
  rated: ["all", "g", "pg", "pg-13"],
  score: [
    "all",
    "appalling",
    "horrible",
    "very-bad",
    "bad",
    "average",
    "fine",
    "good",
    "very-good",
    "great",
    "masterpiece",
  ],
  season: ["all", "spring", "summer", "fall", "winter"],
  language: ["all", "sub", "dub"],
  sort: [
    "default",
    "recently-added",
    "recently-updated",
    "score",
    "name-a-z",
    "release-date",
    "most-watched",
  ],
} as const;
