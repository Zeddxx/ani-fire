"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllAnime,
  getAllGenres,
  getAnimeByCategory,
  getAnimeByGenres,
  getAnimeComments,
  getAnimeEpisodeServer,
  getAnimeEpisodes,
  getAnimeInfoById,
  getAnimeSchedules,
  getCommentsCount,
  getSearchedAnime,
  getStreamEpisode,
  postComment,
} from "../function";
import { z } from "zod";
import { CommentSchema } from "../validation";
import { deleteUserComment, getUsersCommentCounts } from "@/actions/get-comments";

export const useGetAllAnime = () => {
  return useQuery({
    queryKey: ["getAllAnime"],
    queryFn: getAllAnime,
  });
};

export const useGetAnimeInfo = (id: string) => {
  return useQuery({
    queryKey: ["getAnimeInfo"],
    queryFn: () => getAnimeInfoById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useGetAnimeEpisodes = (id: string) => {
  return useQuery({
    queryKey: ["getAnimeEpisodes"],
    queryFn: () => getAnimeEpisodes(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useGetAnimeEpisodeServer = (id: string) => {
  return useQuery({
    queryKey: ["getAnimeServer"],
    queryFn: () => getAnimeEpisodeServer(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};


export const useGetAnimeStreaming = (
  id: string,
  server: string,
  category: string
) => {
  return useQuery({
    queryKey: ["getAnimeStreamings"],
    queryFn: () => getStreamEpisode(id, server, category),
    enabled: !!id && !!server && !!category,
    refetchOnWindowFocus: false,
  });
};

export const useGetSearchedAnime = (query: string, pageNo: number) => {
  return useQuery({
    queryKey: ["getSearchedAnime"],
    queryFn: () => getSearchedAnime(query, pageNo),
    enabled: !!query,
  });
};

export const useGetAllGenre = () => {
  return useQuery({
    queryKey: ["getAllGenres"],
    queryFn: getAllGenres,
  });
};

export const useGetAnimeByCategory = (category: string, page: number) => {
  return useQuery({
    queryKey: ["getAnimeByCategory"],
    queryFn: () => getAnimeByCategory(category, page),
  });
};

export const useGetAnimeByGenres = (name: string, page: number) => {
  return useQuery({
    queryKey: ["getAnimeByGenres"],
    queryFn: () => getAnimeByGenres(name, page),
    enabled: !!name,
  });
};

export const useGetAnimeSchedule = (date: string) => {
  return useQuery({
    queryKey: ["getAnimeByDate"],
    queryFn: () => getAnimeSchedules(date),
    enabled: !!date,
  });
};

export const useGetAnimeComments = (animeId: string) => {
  return useQuery({
    queryKey: ["getAnimeComments", animeId],
    queryFn: () => getAnimeComments(animeId),
    enabled: !!animeId,
  });
};

export const useCreateComment = (animeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["getAnimeComments", animeId],
    mutationFn: (values: z.infer<typeof CommentSchema>) => postComment(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getAnimeComments", animeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAnimeCommentsCount", animeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserCommentsCount", data?.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['deleteUserComment']
      })
    },
  });
};

export const useGetCommentCount = (animeId: string) => {
  return useQuery({
    queryKey: ["getAnimeCommentsCount", animeId],
    queryFn: () => getCommentsCount(animeId),
    enabled: !!animeId
  });
};

export const useGetUserCommentsCount = (userId: string) => {
  return useQuery({
    queryKey: ["getUserCommentsCount", userId],
    queryFn: () => getUsersCommentCounts(userId),
    enabled: !!userId
  })
}

export const useDeleteUserComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteUserComment'],
    mutationFn: ({ userId, commentId } : { userId: string, commentId: string }) => deleteUserComment(userId, commentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getUserCommentCount']
      })
      queryClient.invalidateQueries({
        queryKey: ['getAnimeCommentsCount']
      })
      queryClient.invalidateQueries({
        queryKey: ['getAnimeComments']
      })
    }
  })
}