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

export const TOP_SEARCHES = [
  "Solo Leveling",
  "Dandadan",
  "Blue Lock",
  "One Piece",
  "Solo Leveling: Specials",
  "Bleach: Thousand-Year Blood War",
  "Blue Lock Season 2",
  "Shangri-La Frontier Season 2",
  "Dragon Ball Daima",
  "Tower of God Season 2: Workshop Battle",
] as const;

export const NavbarLinks = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Trendings",
    href: "/trendings",
  },
  {
    name: "Popular",
    href: "/popular",
  },
  {
    name: "Genre",
    href: "/genre",
  },
] as const;

export const COLORS = [
  "#77a759",
  "#ff7f00",
  "#ba00ff",
  "#ff0000",
  "##ffff00",
  "#d1cfaf",
];

export const LANDING_NAV_ITEMS = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Movies",
    href: "/movies",
  },
  {
    name: "TV Shows",
    href: "/tv",
  },
  {
    name: "Most Popular",
    href: "/most-popular",
  },
  {
    name: "Top Airing",
    href: "/top-airing",
  },
];
