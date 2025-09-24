import { UserMongo } from "@/models/UserMongo"

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