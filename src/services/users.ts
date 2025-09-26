import { Activity } from "@/models/Activity"
import { UserMongo } from "@/models/UserMongo"
import { deleteAllPostsService } from "./posts"
import { clerkClient } from "@clerk/nextjs/server"
import { handleError } from "@/helpers/handleError"
import { connectDB } from "@/lib/mongo"

export type GetUserFromMongoServiceType =
  | { success: true, profileBG: string, isAdmin: boolean }
  | { success: false, errMsg: string }

export async function getUserFromMongoService(userID: string) : Promise<GetUserFromMongoServiceType> {
    try {
        await connectDB()
        let user = await UserMongo.findOne({ userIDClerk: userID })
        if(!user) {
            await UserMongo.create({ userIDClerk: userID, profileBgImg: "", isAdmin: false })
        }
        user = await UserMongo.findOne({ userIDClerk: userID })
        return { success: true, profileBG: user.profileBgImg, isAdmin: user.isAdmin }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Get user from mongoDB",
            component: "getUserFromMongoService()",
            input: { userID }
        })
        return { success: false, errMsg }
    }
    
}

export type UpdateProfileBgServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function updateProfileBgService(userID: string, imgUrl: string) : Promise<UpdateProfileBgServiceType> {
    try {
        await connectDB()
        let user = await UserMongo.findOne({ userIDClerk: userID })
        if(!user) {
            await UserMongo.create({ userIDClerk: userID, profileBgImg: "", isAdmin: false })
            user = await UserMongo.findOne({ userIDClerk: userID })
        }
        user.profileBgImg = imgUrl
        await user.save()
        return { success: true }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Update profile background image",
            component: "updateProfileBgService()",
            input: { userID, imgUrl }
        })
        return { success: false, errMsg }
    }
    
}
export type DeleteUserForoverServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function deleteUserForoverService(clerkUserIdToDelete: string) : Promise<DeleteUserForoverServiceType> {
    try {
        const client = await clerkClient()
        const userClerk = await client.users.getUser(clerkUserIdToDelete)
        if(!userClerk) {
            throw new Error("User not found in clerk database")
        }

        await connectDB()

        const userMongo = await UserMongo.findOne({ userIDClerk: clerkUserIdToDelete })
        if(!userMongo) {
            throw new Error("User not found in mongo database")
        }

        // Smazání aktivit
        await Activity.deleteMany({ userID: clerkUserIdToDelete })

        // Smazání všech posts, images, reakcí
        await deleteAllPostsService(clerkUserIdToDelete)

        // Reports není potřeba mazat


        // Smazání uživatele clerk, mongo
        await client.users.deleteUser(clerkUserIdToDelete)
        await UserMongo.findOneAndDelete({ userIDClerk: clerkUserIdToDelete })

        return { success: true  }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Delete user forever",
            component: "deleteUserForoverService()",
            input: { clerkUserIdToDelete }
        })
        return { success: false, errMsg }
    }
    
}
