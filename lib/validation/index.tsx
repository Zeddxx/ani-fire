import { z } from "zod"

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    image: z.optional(z.string()),
    email: z.optional(z.string().email())
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(1, {
        message: "Password required!"
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: "Username must be at least 3 characters!"
    }),
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required!"
    })
})

export const CommentSchema = z.object({
    content: z.string().min(1, { message: "Comment is required!" }),
    isSpoiler: z.boolean().default(false),
    userId: z.string(),
    animeId: z.string()
})