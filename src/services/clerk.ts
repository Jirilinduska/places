import { deleteImageFromCloudinary } from "@/app/actions"
import { handleError } from "@/helpers/handleError"
import { getPublicIdFromUrl } from "@/lib/cloudinary"
import { connectDB } from "@/lib/mongo"
import { UserMongo } from "@/models/UserMongo"
import { clerkClient } from "@clerk/nextjs/server"

export type GetUserFromClerkServiceType =
  | { success: true, username: string, imageUrl: string}
  | { success: false, errMsg: string }


export async function getUserFromClerkService(userID: string) : Promise<GetUserFromClerkServiceType> {
    try {
        const client = await clerkClient()
        const user = await client.users.getUser(userID)
        const username = user.username || ""
        const imageUrl = user.imageUrl || ""
        return { success: true, imageUrl, username }
    } catch (error) {
        const { errMsg } = await handleError(error, {
            action: "Get user from clerk",        
            component: "getUserFromClerkService()",
            input: { userID }
        })
        return { success: false, errMsg }
    }
}

export type GetUserNameFromClerkServiceType =
  | { success: true, username: string }
  | { success: false, errMsg: string }

export async function getUsernameFromClerkService(userID: string) : Promise<GetUserNameFromClerkServiceType> {
    try {
        const client = await clerkClient()
        const user = await client.users.getUser(userID)
        const username = user.username || ""
        return { success: true, username }
    } catch (error) {
        const { errMsg } = await handleError(error, {
            action: "Get clerk username",        
            component: "getUsernameFromClerkService()",
            input: { userID }
        })
        return { success: false, errMsg }
    }
}

export type BanUserServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function banUserService(userID: string) : Promise<BanUserServiceType> {
    try {

        const client = await clerkClient()
        const userClerk = await client.users.getUser(userID)

        if(!userClerk) {
            throw new Error("User not found in clerk database")  
        }

        await connectDB()

        const userMongoDB = await UserMongo.findOne({ userIDClerk: userID })
        if(!userMongoDB) {
            throw new Error("User not found in mongo database")
        }

        userMongoDB.isBanned = true
        await userMongoDB.save()
        return { success: true }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Ban User",        
            component: "banUserService()",
            input: { userID }
        })
        return { success: false, errMsg }
    }
}

export type UnbanUserServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function unbanUserService(userID: string) : Promise<UnbanUserServiceType> {
    try {
        const client = await clerkClient()
        const userClerk = await client.users.getUser(userID)

        if(!userClerk) {
            throw new Error("User not found in clerk database")  
        }

        await connectDB()
        const userMongoDB = await UserMongo.findOne({ userIDClerk: userID })
        if(!userMongoDB) {
            throw new Error("User not found in mongo database")
        }

        await client.users.unbanUser(userID)
        userMongoDB.isBanned = false
        await userMongoDB.save()
        return { success: true }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Unban User",        
            component: "unbanUserService()",
            input: { userID }
        })
        return { success: false, errMsg }
    }
}

export type ChangeUsernameClerkServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function changeUsernameClerkService(userId: string, newUsername: string) : Promise<ChangeUsernameClerkServiceType> {

    try {
        if(!newUsername) throw new Error("Username cannot be empty")
        if(newUsername.trim().length < 3) throw new Error("Username must be at least 3 characters long")
        const client = await clerkClient()
        await client.users.updateUser(userId, {username: newUsername})
        return { success: true }   
    } catch (error) {
        const { errMsg } = await handleError(error, {
            action: "Change clerk user name",        
            component: "changeUsernameClerkService()",
            input: { userId, newUsername }
        })
        return { success: false, errMsg }
    }
}

export type DeleteUserImgByAdminServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function deleteUserImgByAdminService(userIdToDelete: string) : Promise<DeleteUserImgByAdminServiceType> {
    try {

        const client = await clerkClient()
        const userClerk = await client.users.getUser(userIdToDelete)

        if(!userClerk) {
            throw new Error("User not found in clerk database")
        }

        await connectDB()

        const currentImg = userClerk.imageUrl

        const isCloudinary = currentImg?.includes("res.cloudinary.com")
        if(isCloudinary) {
            const publicID = getPublicIdFromUrl(currentImg)
            if(publicID) await deleteImageFromCloudinary(publicID)
        }
        await client.users.deleteUserProfileImage(userIdToDelete)
        return { success: true }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Delete user profile image by admin",        
            component: "deleteUserImgByAdminService()",
            input: { userIdToDelete }
        })
        return { success: false, errMsg }
    }
}