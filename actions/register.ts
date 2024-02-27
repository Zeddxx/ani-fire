"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { RegisterSchema } from "@/lib/validation"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values)

    if(!validateFields.success) {
        return { error: "Invalid Fields!" }
    }

    const { email, password, name } = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)

    if(existingUser) {
        return { error: "Email already exists!" }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return { success: "User Registered!" }
}