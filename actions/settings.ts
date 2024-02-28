'use server'

import * as z from "zod"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { SettingsSchema } from "@/lib/validation"

export const settings = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await currentUser();

    if(!user) {
        return { error: "Unauthorized!" }
    }

    const dbUser = await getUserById(user.id!);

    if(!dbUser) {
        return { error: "Unauthorized!" }
    }

    const updateUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values
        }
    })

    return { success: "User updated successfully!" }
}