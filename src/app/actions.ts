"use server"

import { ActitivyReason, IAppSettings, IPost, ReportReason } from "@/interfaces/interfaces"
import cloudinary, { getPublicIdFromUrl } from "@/lib/cloudinary"
import { connectDB } from "@/lib/mongo"
import { Activity } from "@/models/Activity"
import { AppSettings } from "@/models/AppSettings"
import { Post } from "@/models/Post"
import { Reactions } from "@/models/Reactions"
import { Report } from "@/models/Report"
import { UserMongo } from "@/models/UserMongo"
import { auth, clerkClient } from "@clerk/nextjs/server"




// ========== CLERK ==========
export async function getUserFromClerk(userID: string) {
    const client = clerkClient()
    const user = (await client).users.getUser(userID)

    const username = (await user).username
    const imageUrl = (await user).imageUrl

    return { username, imageUrl }
}

export async function getUsernameFromClerk(userID: string) {
    const client = clerkClient()
    const user = (await client).users.getUser(userID)

    const username = (await user).username

    return { username }
}

// ========== CLOUDINARY ==========
export async function deleteImageFromCloudinary(imgPublicUrl: string) {
    try {
        const publicID = getPublicIdFromUrl(imgPublicUrl)
        if (!publicID) {
            return { success: false, errMsg: "Post not found" }
        }
        await cloudinary.uploader.destroy(publicID)
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}

export async function getUserFromMongo(userID: string) {
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

export async function UpdatePost(newPost: IPost) {
    
    const { userId } = await auth()
    const { _id, userID, ...updateData } = newPost

    if(userId !== newPost.userID) {
        return { success: false, errMsg: "You cannot do that" }
    }

    try {
        await connectDB()
        const result = await Post.findOneAndUpdate(
            { _id, userID },
            { $set: updateData },
            { new: true }
        )
        if (!result) {
            return { success: false, errMsg: "Somethng went wrong" }
        }
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}

export async function deletePost(postID: string) {

    const { userId } = await auth()

    try {
        await connectDB()
        const post = await Post.findById(postID)

        if (!post) {
            return { success: false, errMsg: "Post not found" }
        }

        if (post.userID !== userId) {
            return { success: false, errMsg: "You cannot do that" }
        }

        if (post.images.length > 0) {
            for (const x of post.images) {
                const res = await deleteImageFromCloudinary(x)
                if(!res.success) {
                    return { success: false, errMsg: "Error during deleting image from cloud" }
                }
            }
        }

        await Post.findByIdAndDelete(postID)
        await Reactions.findOneAndDelete({ postID })

        return { success: true }

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}


export async function createReport(postID: string, reason: ReportReason, comment: string) {

    const { userId } = await auth()
    if(!userId) return // TODO 

    try {
        await connectDB()
        const report = await Report.create({ reportedBy: userId, postID, reason, comment })
        const { success, errMsg } = await createActivity(userId, "report_post", report._id)
        if(success) {
            return { success: true }
        } else {
            return { success: false, errMsg }
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}

export async function createActivity(userID: string, activity: ActitivyReason, reportID?: string, postID?: string) {
    try {
        await Activity.create({ userID, activity, reportID, postID })
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}

export async function changeUsernameClerk(userId: string, newUsername: string) {
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


export async function getAdminAppSettings(userId: string) {

    const { isAdmin } = await getUserFromMongo(userId)
    if(!isAdmin) return { success: false, errMsg: "Not allowed" } 

    try {
        let appSettingsDB = await AppSettings.findOne().lean<IAppSettings>()
        if(!appSettingsDB) {
            const created = await AppSettings.create({})
            appSettingsDB = created.toObject()
        } 

        const appSettings: IAppSettings = {
            maintenance: appSettingsDB?.maintenance || false,
            profileBgImages: appSettingsDB?.profileBgImages || []
        }

        return { success: true, appSettings }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}

export async function uploadAdminProfileBgImage(userId: string, base64data: string) {

    const { isAdmin } = await getUserFromMongo(userId)
    if(!isAdmin) return { success: false, errMsg: "Not allowed" } 

    try {
        let appSettings = await AppSettings.findOne()
        if(!appSettings) {
            appSettings = await AppSettings.create({})
        }

        const uploaded = await cloudinary.uploader.upload(base64data)
        const imgUrl = uploaded.secure_url 
        appSettings?.profileBgImages.push(imgUrl)
        await appSettings.save()
        return { success: true, imgUrl }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}