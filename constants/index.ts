export const NavbarItems = [
  { name: "Home", href: "/" },
  { name: "Search", href: "/" },
  { name: "Recomdation", href: "/" },
  { name: "Upcoming Anime", href: "/" },
  { name: "Trending Anime", href: "/" },
];

export const defaultUrl = process.env.NEXT_PUBLIC_ANIME_URL;

export const AsideNavbarItems = [
  { name: "Home", icon: "/assets/home.svg" },
  { name: "Suggestions", icon: "/assets/add.svg" },
];

export const CategoriesItems = [
  { name: "Most Popular", icon: "/assets/popular.svg" },
  { name: "Most Favorite", icon: "/assets/star.svg" },
];

export const GeneralItems = [{ name: "Sign in", icon: "/assets/user.svg" }];

export const MenuItems = [
  { name: "Home", href: "/home" },
  { name: "Movies", href: "/movie" },
  { name: "TV Series", href: "/tv" },
  { name: "Most Popular", href: "/most-popular" },
  { name: "Top Airing", href: "/top-airing" },
];

export const TopSearchItems = [
  { name: "Solo Leveling", href: "/search?keyword=solo leveling&page=1" },
  { name: "One Piece", href: "/search?keyword=one piece&page=1" },
  {
    name: "Jujutsu Kaisen 2nd Season",
    href: "/search?keyword=jujutsu kaisen&page=1",
  },
  { name: "Blue Exorcist: Shimane Illuminati Saga", href: "/search?keyword=blue exorcist&page=1" },
  { name: "Domestic Kanojo", href: "/search?keyword=domestic kanojo&page=1" },
  { name: "Demon Slayer", href: "/search?keyword=demon slayer&page=1" },
  { name: "Your lie in April", href: "/search?keyword=your lie in april&page=1" },
  { name: "Your Name", href: "/search?keyword=your name&page=1" },
  { name: "Classroom Of Elite Season 3", href: "/search?keyword=classroom of elite&page=1" },
  { name: "Sasaki And Peeps", href: "/search?keyword=sasaki and peeps&page=1" },
  { name: "I Want To Eat Your Pancrease", href: "/search?keyword=i want to eat your pancrease&page=1" },
];

export const MainNavbarItems = [
  { name: "Home", href: "/home" },
  { name: "Subbed Anime", href: "/anime/subbed-anime" },
  { name: "Dubbed Anime", href: "/anime/dubbed-anime" },
  { name: "Most Popular", href: "/anime/most-popular" },
  { name: "Movies", href: "/anime/movies" },
  { name: "TV Series", href: "/anime/tv" },
  { name: "OVAs", href: "/anime/ova" },
  { name: "ONAs", href: "/anime/ona" },
  { name: "Specials", href: "/anime/special" },
  { name: "Events", href: "/anime/event" },
];
