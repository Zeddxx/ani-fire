export type Episodes = {
    dub: null | number | undefined
    sub: null | number | undefined
}

export type LatestAnimeProps = {
    duration: string | number;
    episodes: Episodes
    id: string
    name: string
    poster: string
    rating: null | number | undefined
    type: string
}

export type SpotLightAnimesProps = {
    description: string
    episodes: Episodes
    jname: string
    rank: number
    id: string
    name: string
    poster: string
    otherInfo: string[]
}

export type MonthAnimeProps = {
    episodes: Episodes
    id: string
    name: string
    rank: number
    poster: string
}

export type Top10AnimeProps = {
    month: MonthAnimeProps[]
    today: MonthAnimeProps[]
    week: MonthAnimeProps[]
}

export type TopAiringAnimesProps = {
    id: string
    jname: string
    name: string
    poster: string
    otherInfo: string[]
}

export type TopUpcomingAnimes = {
    duration: string
    episodes: Episodes
    id: string
    name: string
    poster: string
    rating: number | string | null
    type: string
}

export type TrendingAnimeProps = {
    id: string
    name: string
    poster: string
    rank: number | null
}

export type HomeAnimeProps = {
    genres: string[]
    latestEpisodeAnimes: LatestAnimeProps[] 
    spotlightAnimes: SpotLightAnimesProps[]
    top10Animes: Top10AnimeProps
    topAiringAnimes: TopAiringAnimesProps[]
    topUpcomingAnimes: TopUpcomingAnimes[]
    trendingAnimes: TrendingAnimeProps[]
}

export type StatsProps = {
    duration: string
    episodes: Episodes
    quality: string
    rating: string
    type: string
}

export type Info = {
    description: string
    id: string
    name: string
    poster: string
    stats: StatsProps
}

export type MoreInfoProps = {
    aired: string
    duration: string
    genres: string[]
    japanese: string
    premiered: string
    producers: string[]
    status: string
    studios: string
    synonyms: string
}

export type InfoProps = {
    info: Info
    moreInfo: MoreInfoProps
}

export type RelatedAnimeProps = {
    id: string
    episodes: Episodes
    jname: string
    name: string
    poster: string
    type: string
}

export type SeasonsProps = {
    id: string
    isCurrent: boolean
    name: string
    poster: string
    title: string
}

export type AnimeInfoTypeProps = {
    anime: InfoProps
    recommendedAnimes: TopUpcomingAnimes[]
    relatedAnimes: RelatedAnimeProps[]
    seasons: SeasonsProps[]
}

export type Dub = {
    serverName: string,
    serverId: number
}

export type Sub = {
    serverId: number
    serverName: string
}

export type GetAnimeServerEpisodes = {
    dub: Dub[]
    episodeId: string
    episodeNo: number
    sub: Sub[]
}

export type Episode = {
    episodeId: string
    isFiller: boolean
    number: number
    title: string
}

export type GetAnimeEpisodes = {
    episodes: Episode[]
    totalEpisodes: number
}

export type AnimesProps = {
    duration: string
    episodes: { sub: number, dub: number }
    id: string
    name: string
    poster: string
    rating: string
    type: string
}

export type MostPopularAnimesProps = {
    episodes: { sub: number, dub: number }
    id: string
    jname: string
    name: string
    poster: string
    type: string
}

export type SearchedAnimeProps = {
    animes: AnimesProps[],
    currentPage: number
    hasNextPage: boolean
    mostPopularAnimes: MostPopularAnimesProps[]
    totalPages: number
}

type Sources = {
    isM3U8: boolean
    url: string
}

export type SubtitlesProps = {
    lang: string
    url: string
}

export type AnimeStreamingProp = {
    anilistID: number
    malID: number
    sources: Sources[]
    subtitles: SubtitlesProps[]
}

export type AnimeByCategoryTypes = {
    animes: AnimesProps[]
    category: string
    currentPage: number
    genres: string[]
    hasNextPage: boolean
    top10Animes: Top10AnimeProps
    totalPages: number
}

export type AnimeByGenreTypes = {
    animes: AnimesProps[]
    currentPage: number
    genreName: string
    genres: string[]
    hasNextPage: boolean
    topAiringAnimes: Top10AnimeProps
    totalPages: number
}

export type ScheduleAnimeTypes = {
    name: string
    jname: string
    time: string
    id: string
}