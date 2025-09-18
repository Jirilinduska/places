"use server"

import { clerkClient } from "@clerk/nextjs/server"

export async function getUserFromClerk(userID: string) {
    const client = clerkClient()
    const user = (await client).users.getUser(userID)

    const username = (await user).username
    const imageUrl = (await user).imageUrl

    return { username, imageUrl }
}