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

export type AnimeInfo = {
  anime: {
    info: {
      id: string;
      name: string;
      poster: string;
      description: string;
      stats: AnimeStats;
      promotionalVideos: PromotionalVideo[];
      characterVoiceActor: CharacterVoiceActor[];
    };
    moreInfo: {
      aired: string;
      genres: string[];
      status: string;
      studios: string;
      duration: string;
    };
  };
  mostPopularAnimes: [
    {
      episodes: {
        sub: number;
        dub: number;
      };
      id: string;
      jname: string;
      name: string;
      poster: string;
      type: string;
    }
  ];
  recommendedAnimes: [
    {
      id: string;
      name: string;
      poster: string;
      duration: string;
      type: string;
      rating: string;
      episodes: {
        sub: number;
        dub: number;
      };
    }
  ];
  relatedAnimes: [
    {
      id: string;
      name: string;
      poster: string;
      duration: string;
      type: string;
      rating: string;
      episodes: {
        sub: number;
        dub: number;
      };
    }
  ];
  seasons: [
    {
      id: string;
      name: string;
      title: string;
      poster: string;
      isCurrent: boolean;
    }
  ];
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

export type MoreInfo = {
  aired: string;
  genres: string[];
  status: string;
  studios: string;
  duration: string;
  // Add any additional fields as needed
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
    info: AnimeInfo;
    moreInfo: MoreInfo;
  }[];
  mostPopularAnimes: PopularAnime[];
  recommendedAnimes: RecommendedAnime[];
  relatedAnimes: RelatedAnime[];
  seasons: Season[];
};

export type AnimeEpisodes = {
  totalEpisodes: number;
  episodes: [
    {
      number: number;
      title: string;
      episodeId: string;
      isFiller: boolean;
    }
  ];
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
    }
  ];
  tracks: [
    {
      file: string;
      kind: string;
      label: string;
    }
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
    }
  ];
  dub: [
    {
      serverId: number;
      serverName: string;
    }
  ];
  raw: [
    {
      serverId: number;
      serverName: string;
    }
  ];
};
