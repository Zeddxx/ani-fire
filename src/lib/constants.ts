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

export const URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://ani-fire.vercel.app";

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
  "#c4d89d",
  "#efafd2",
  "#df7c73",
  "#bc9eca",
  "#99b5c1",
  "#c1a29f",
  "#79c6b8",
];

export const LANDING_NAV_ITEMS = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Movies",
    href: "/category/movie",
  },
  {
    name: "TV Shows",
    href: "/category/tv",
  },
  {
    name: "Most Popular",
    href: "/category/most-popular",
  },
  {
    name: "Top Airing",
    href: "/category/top-airing",
  },
];

export const SidebarItems: Array<{ title: string; href: string }> = [
  {
    title: "Home",
    href: "/home",
  },
  {
    title: "Subbed Anime",
    href: "/category/subbed-anime",
  },
  {
    title: "Dubbed Anime",
    href: "/category/dubbed-anime",
  },
  {
    title: "Most Popular",
    href: "/category/most-popular",
  },
  {
    title: "TV Series",
    href: "/category/tv",
  },
  {
    title: "Movies",
    href: "/category/movie",
  },
  {
    title: "OVAs",
    href: "/category/ova",
  },
  {
    title: "ONAs",
    href: "/category/ona",
  },
  {
    title: "Specials",
    href: "/category/special",
  },
];

export const GENRES: string[] = [
  "action",
  "adventure",
  "cars",
  "comedy",
  "dementia",
  "demons",
  "drama",
  "ecchi",
  "fantasy",
  "game",
  "harem",
  "historical",
  "horror",
  "isekai",
  "josei",
  "kids",
  "magic",
  "martial-arts",
  "mecha",
  "military",
  "music",
  "mystery",
  "parody",
  "police",
  "psycological",
  "romance",
  "samurai",
  "school",
  "sci-fi",
  "seinen",
  "shoujo",
  "shoujo-ai",
  "shounen",
  "shounen-ai",
  "slice-of-life",
  "space",
  "sports",
  "super-power",
  "supernatural",
  "thriller",
  "vampire",
] as const;

export const catagories: string[] = [
  "most-favorite",
  "most-popular",
  "subbed-anime",
  "dubbed-anime",
  "recently-updated",
  "recently-added",
  "top-upcoming",
  "top-airing",
  "movie",
  "special",
  "ova",
  "ona",
  "tv",
  "completed",
] as const;

export const LOGS: Array<{ type: "fix" | "add" | "change"; feature: string }> =
  [
    {
      type: "add",
      feature:
        "Added history for the latest watched anime by resuming from where you left off.",
    },
    {
      type: "add",
      feature: "Loading skeleton for several pages.",
    },
    {
      type: "add",
      feature: "Auth functionality (still in the development phase).",
    },
    {
      type: "fix",
      feature: "Fixed the size of the Navbar anifire logo for mobile.",
    },
    {
      type: "fix",
      feature: "Fixed the height of the main landing page search button.",
    },
    {
      type: "change",
      feature:
        "Changed the 'Latest Watching' section to show all watched shows.",
    },
    {
      type: "change",
      feature: "Changed the speed of the anime spotlight carousel.",
    },
  ];
