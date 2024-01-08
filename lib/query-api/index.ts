'use client'

import { useQuery } from "@tanstack/react-query"
import { getAllAnime, getAllGenres, getAnimeEpisodeServer, getAnimeEpisodes, getAnimeInfoById, getSearchedAnime, getStreamEpisode } from "../function"

export const useGetAllAnime = () => {
    return useQuery({
        queryKey: ['getAllAnime'],
        queryFn: getAllAnime
    })
}

export const useGetAnimeInfo = (id: string) => {
    return useQuery({
        queryKey: ["getAnimeInfo"],
        queryFn: () => getAnimeInfoById(id),
        enabled: !!id
    })
}

export const useGetAnimeEpisodes = (id: string) => {
    return useQuery({
        queryKey: ["getAnimeEpisodes"],
        queryFn: () => getAnimeEpisodes(id),
        enabled: !!id
    })
}

export const useGetAnimeEpisodeServer = (id: string) => {
    return useQuery({
        queryKey: ['getAnimeServer'],
        queryFn: () => getAnimeEpisodeServer(id),
        enabled: !!id
    })
}

export const useGetAnimeStreaming = (id: string, server: string, category: string) => {
    return useQuery({
        queryKey: ['getAnimeStreaming'],
        queryFn: () => getStreamEpisode(id, server, category),
        enabled: !!id && !!server && !!category
    })
}

export const useGetSearchedAnime = (query: string, pageNo: number) => {
    return useQuery({
        queryKey: ['getSearchedAnime'],
        queryFn: () => getSearchedAnime(query, pageNo),
        enabled: !!query
    })
}

export const useGetAllGenre = () => {
    return useQuery({
        queryKey: ['getAllGenres'],
        queryFn: getAllGenres,
    })
}