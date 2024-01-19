'use client'

import { useQuery } from "@tanstack/react-query"
import { getAllAnime, getAllGenres, getAnimeByCategory, getAnimeByGenres, getAnimeEpisodeServer, getAnimeEpisodes, getAnimeInfoById, getAnimeSchedules, getSearchedAnime, getStreamEpisode } from "../function"

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

export const useGetAnimeByCategory = (category: string, page: number) => {
    return useQuery({
        queryKey: ['getAnimeByCategory'],
        queryFn: () => getAnimeByCategory(category, page)
    })
}

export const useGetAnimeByGenres = (name: string, page: number) => {
    return useQuery({
        queryKey: ['getAnimeByGenres'],
        queryFn: () => getAnimeByGenres(name, page),
        enabled: !!name
    })
}

export const useGetAnimeSchedule = (date: string) => {
    return useQuery({
        queryKey: ['getAnimeByDate'],
        queryFn: () => getAnimeSchedules(date),
        enabled: !!date
    })
}