import { clerkClient } from "@clerk/nextjs/server"

export async function getUserFromClerkService(userID: string) {
    const client = clerkClient()
    const user = (await client).users.getUser(userID)
    const username = (await user).username
    const imageUrl = (await user).imageUrl
    return { username, imageUrl }
}

export async function getUsernameFromClerkService(userID: string) {
    const client = clerkClient()
    const user = (await client).users.getUser(userID)
    const username = (await user).username
    return { username }
}

export async function changeUsernameClerkActivity(userId: string, newUsername: string) {
    if(!newUsername) {
        return { success: false, errMsg: "Username cannot be empty" }
    }
    if(newUsername.trim().length < 3) {
        return { success: false, errMsg: "Username must be at least 3 characters long" }
    }

    try {
        const client = await clerkClient()
        await client.users.updateUser(userId, {
          username: newUsername
        })
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}