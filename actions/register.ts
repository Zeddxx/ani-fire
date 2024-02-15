"use server";

import bcrypt from 'bcryptjs';
import { RegisterSchema } from "@/lib/validation";
import * as z from "zod"
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid Fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email);

    if(existingUser) {
        return { error: "Email already in use! 💀" };
    }

    const userCreated = await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    if(!userCreated) return { error: "User creation failed! 🥲" }

    return { success: "User created successfully!" }
}