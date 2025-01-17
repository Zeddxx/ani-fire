export type ApiResponse<T> =
  | { success: false; status: number; message: string }
  | { success: true; data: T };

export type LatestEpisodeAnimes = {
  id: string;
  name: string;
  poster: string;
  type: string;
  episodes: {
    sub: number;
    dub: number;
  };
};

export type SpotlightAnimes = {
  id: string;
  name: string;
  jname: string;
  poster: string;
  description: string;
  rank: number;
  otherInfo: string[];
  episodes: {
    sub: number;
    dub: number;
  };
};

export type TopAnimes = {
  episodes: {
    sub: number;
    dub: number;
  };
  id: string;
  name: string;
  poster: string;
  rank: number;
};

export type Top10Animes = {
  today: TopAnimes[];
  month: TopAnimes[];
  week: TopAnimes[];
};

export type Episodes = {
  sub: number;
  dub: number;
};

export type TopAiringAnime = {
  id: string;
  name: string;
  jname: string;
  poster: string;
  type: string;
  episodes: Episodes;
};

export type TopUpcomingAnime = {
  id: string;
  name: string;
  poster: string;
  duration: string;
  type: string;
  rating: string;
  episodes: Episodes;
};

export type TrendingAnime = {
  id: string;
  name: string;
  poster: string;
  rank: number;
};

export type SharedAnimeType = {
  id: string;
  name: string;
  poster: string;
  type: string;
  episodes: Episodes;
};

export type HomePage = {
  genres: string[];
  latestEpisodeAnimes: LatestEpisodeAnimes[];
  spotlightAnimes: SpotlightAnimes[];
  top10Animes: Top10Animes[];
  topAiringAnimes: TopAiringAnime[];
  topUpcomingAnimes: TopUpcomingAnime[];
  trendingAnimes: TrendingAnime[];
  mostPopularAnimes: SharedAnimeType[];
  mostFavoriteAnimes: SharedAnimeType[];
  latestCompletedAnimes: SharedAnimeType[];
};

export type AnimeStats = {
  rating: string;
  quality: string;
  episodes: Episodes;
  type: string;
  duration: string;
};

export type Episodes = {
  sub: number;
  dub: number;
};

export type PromotionalVideo = {
  title?: string;
  source?: string;
  thumbnail?: string;
};

export type CharacterVoiceActor = {
  character: Character;
  voiceActor: VoiceActor;
};

export type Character = {
  id: string;
  poster: string;
  name: string;
  cast: string;
};

export type VoiceActor = {
  id: string;
  poster: string;
  name: string;
  cast: string;
};

export type Info = {
  id: string;
  name: string;
  poster: string;
  description: string;
  stats: {
    rating: string;
    quality: string;
    episodes: {
      sub: number;
      dub: number;
    };
    type: string;
    duration: string;
  };
  promotionalVideos: PromotionalVideo[];
  charactersVoiceActors: CharacterVoiceActor[];
};

export type MoreInfo = {
  aired: string;
  genres: string[];
  status: string;
  studios: string;
  duration: string;
  japanese: string;
  synonyms: string;
  premiered: string;
  producers: string[];
  malscore: string;
};

export type PopularAnime = {
  episodes: Episodes;
  id: string;
  jname: string;
  name: string;
  poster: string;
  type: string;
};

export type RecommendedAnime = {
  id: string;
  name: string;
  poster: string;
  duration: string;
  type: string;
  rating: string;
  episodes: Episodes;
};

export type RelatedAnime = {
  id: string;
  name: string;
  poster: string;
  duration: string;
  type: string;
  rating: string;
  episodes: Episodes;
};

export type Season = {
  id: string;
  name: string;
  title: string;
  poster: string;
  isCurrent: boolean;
};

export type AnimeInfo = {
  anime: {
    info: Info;
    moreInfo: MoreInfo;
  };
  mostPopularAnimes: PopularAnime[];
  recommendedAnimes: RecommendedAnime[];
  relatedAnimes: RelatedAnime[];
  seasons: Season[];
};

export type EpisodesDetails = {
  number: number;
  title: string;
  episodeId: string;
  isFiller: boolean;
};

export type AnimeEpisodes = {
  totalEpisodes: number;
  episodes: Array<EpisodesDetails>;
};

export type AnimeStreamingLinks = {
  headers: {
    Referer: string;
    "User-Agent": string;
  };
  sources: [
    {
      url: string;
      type: string;
    },
  ];
  tracks: [
    {
      file: string;
      kind: string;
      label: string;
    },
  ];
  intro: {
    start: number;
    end: number;
  };
  outro: {
    start: number;
    end: number;
  };
  anilistID: number | null;
  malID: number | null;
};

export type AnimeEpisodeServers = {
  episodeId: string;
  episodeNo: number;
  sub: [
    {
      serverId: number;
      serverName: string;
    },
  ];
  dub: [
    {
      serverId: number;
      serverName: string;
    },
  ];
  raw: [
    {
      serverId: number;
      serverName: string;
    },
  ];
};

export type AnimeEntry = {
  id: string;
  title: string;
  imgSrc: string;
  type: string;
  currentEp: number | undefined;
  episodeId: string;
  totalEpisodes: number;
};

export type ScheduledAnimes = {
  id: string;
  time: string;
  name: string;
  jname: string;
  airingTimestamp: number;
  secondsUntilAiring: number;
  episode: number;
};
