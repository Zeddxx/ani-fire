import { z } from "zod"

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