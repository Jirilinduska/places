import { deleteImageFromCloudinary, getUserFromMongo } from "@/app/actions"
import { getPublicIdFromUrl } from "@/lib/cloudinary"
import { UserMongo } from "@/models/UserMongo"
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function getUserFromClerkService(userID: string) {
    const client = await clerkClient()
    const user = (await client).users.getUser(userID)
    const username = (await user).username
    const imageUrl = (await user).imageUrl
    return { username, imageUrl }
}

export async function getUsernameFromClerkService(userID: string) {
    const client = await clerkClient()
    const user = (await client).users.getUser(userID)
    const username = (await user).username
    return { username }
}

export async function banUserService(userID: string) {
    const { userId } = await auth()
    if(!userId) return  // TODO 
    const { isAdmin } = await getUserFromMongo(userId)
    if(!isAdmin) return // TODO 
    try {
        const client = await clerkClient()
        const userClerk = await client.users.banUser(userID)
        if(!userClerk) return { success: false, errMsg: "User not found in clerk database" }
        const userMongoDB = await UserMongo.findOne({ userIDClerk: userID })
        if(!userMongoDB) return { success: false, errMsg: "User not found in mongo database" }
        userMongoDB.isBanned = true
        await userMongoDB.save()
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}

export async function unbanUserService(userID: string) {
    try {
        const client = await clerkClient()
        const userClerk = await client.users.unbanUser(userID)
        if(!userClerk) return { success: false, errMsg: "User not found in clerk database" }
        const userMongoDB = await UserMongo.findOne({ userIDClerk: userID })
        if(!userMongoDB) return { success: false, errMsg: "User not found in mongo database" }
        userMongoDB.isBanned = false
        await userMongoDB.save()
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
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


export async function deleteUserImgByAdminService(userIdToDelete: string) {
    try {
        const client = await clerkClient()
        const currentImg = (await client.users.getUser(userIdToDelete)).imageUrl
        await client.users.deleteUserProfileImage(userIdToDelete)

        const isCloudinary = currentImg?.includes("res.cloudinary.com")
        if(isCloudinary) {
            const publicID = getPublicIdFromUrl(currentImg)
            if(publicID) await deleteImageFromCloudinary(publicID)
        }
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}