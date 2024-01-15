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
  { name: "Solo Leveling", href: "/search?keyword=solo-leveling" },
  { name: "Solo Leveling", href: "/search?keyword=solo-leveling" },
  {
    name: "Jujutsu Kaisen 2nd Season",
    href: "/search?keyword=jujutsu-kaisen-",
  },
  { name: "Solo Leveling", href: "/search?keyword=solo-leveling" },
  { name: "Solo Leveling", href: "/search?keyword=solo-leveling" },
];

export const MainNavbarItems = [
  { name: "Home", href: "/home" },
  { name: "Subbed Anime", href: "/anime/subbed-anime" },
  { name: "Dubbed Anime", href: "/anime/dubbed-anime" },
  { name: "Most Popular", href: "/anime/most-popular" },
];
