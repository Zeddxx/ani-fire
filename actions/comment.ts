'use server';

import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import { CommentSchema } from '@/lib/validation';
import * as z from 'zod'

export const comment = async (values: z.infer<typeof CommentSchema>) => {
    const validatedComment = CommentSchema.safeParse(values);
    
    if(!validatedComment.success) {
        return { error: "Invalid comment field!" }
    }

    const { content, userId, isSpoiler, animeId } = validatedComment.data;

    const existingUser = await getUserById(userId);
    
    if(!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Unauthorized access!" };
    }

    if(!content && !userId && !animeId) {
        return { error: "Please provide required details."}
    }

   const comment = await db.comment.create({
    data: {
        userId,
        content,
        isSpoiler,
        animeId
    }
   })

   return { success: "Comment created successfully! 🎉", comment }
}