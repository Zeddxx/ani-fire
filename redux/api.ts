import { AnimeStreamingProp } from "@/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const animeApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_ANIME_URL : 'http://localhost:4000' ,
    }),
    endpoints: (builder) => ({
        getAnimeStreamingEpisode: builder.query<AnimeStreamingProp, { id: string, server: string, category: string }>({
            query: ({
                id,
                server,
                category
            } : {
                id: string
                server: string
                category: string
            }) => ({
                url: `/anime/episode-srcs?id=${id}&server=${server}&category=${category}`,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
    })
})


export const {
 useGetAnimeStreamingEpisodeQuery
} = animeApi