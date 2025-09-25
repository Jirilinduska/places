import { Activity } from "@/models/Activity"
import { UserMongo } from "@/models/UserMongo"
import { deleteAllPostsService } from "./posts"
import { clerkClient } from "@clerk/nextjs/server"
import { deleteUserImgByAdminService } from "./clerk"

export async function getUserFromMongoService(userID: string) {
    try {
        let user = await UserMongo.findOne({ userIDClerk: userID })
        if(!user) {
            await UserMongo.create({ userIDClerk: userID, profileBgImg: "", isAdmin: false })
        }
        user = await UserMongo.findOne({ userIDClerk: userID })
        return { success: true, profileBG: user.profileBgImg, isAdmin: user.isAdmin }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
    
}

export async function updateProfileBgService(userID: string, imgUrl: string) {
    try {
        let user = await UserMongo.findOne({ userIDClerk: userID })
        if(!user) {
            await UserMongo.create({ userIDClerk: userID, profileBgImg: "", isAdmin: false })
            user = await UserMongo.findOne({ userIDClerk: userID })
        }
        user.profileBgImg = imgUrl
        await user.save()
        return { success: true  }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
    
}

export async function deleteUserForoverService(clerkUserIdToDelete: string) {
    try {

        const client = await clerkClient()
        const userClerk = await client.users.getUser(clerkUserIdToDelete)
        if(!userClerk) return { success: false, errMsg: "User not found in clerk database" }


        const userMongo = await UserMongo.findOne({ userIDClerk: clerkUserIdToDelete })
        if(!userMongo) return { success: false, errMsg: "User not found in mongo database" }

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
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
    
}
