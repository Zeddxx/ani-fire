'use server';

import { db } from "@/lib/db";

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