'use server';

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const getComments = async (animeId: string) => {
    try {
        const comments = await db.comment.findMany({
            where: {
              animeId
            },
            skip: 0,
            take: 5,
            include: {
              author: {
                select: {
                  name: true,
                  email: true,
                  image: true,
                  role: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            },
          })

        return comments;
    } catch (error) {
        console.log(error);
    }
}

export const commentsCount = async (animeId: string) => {
  try {
    const count = await db.comment.count({
      where: {
        animeId
      }
    })
  
    return count;
  } catch (error) {
    console.log(error);
  }
}

export const getUsersCommentCounts = async (userId: string) => {
  try {
      const user = await db.comment.findMany({
          where: {
            userId
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
      return user
  } catch (error) {
      return null;
  }
}

export const deleteUserComment = async (userId: string, commentId: string) => {
  const user = await currentUser()
  try {
    if(!userId) return null;

    if(user?.id !== userId) throw Error;

    const deleteComment = await db.comment.delete({
      where: {
        id: commentId
      }
    })
  } catch (error) {
    return null;
  }
}