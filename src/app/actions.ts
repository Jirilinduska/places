"use server"

import { ActitivyReason, ReportReason } from "@/interfaces/interfaces"
import cloudinary, { getPublicIdFromUrl } from "@/lib/cloudinary"
import { connectDB } from "@/lib/mongo"
import { Activity } from "@/models/Activity"
import { Post } from "@/models/Post"
import { Reactions } from "@/models/Reactions"
import { Report } from "@/models/Report"
import { UserMongo } from "@/models/UserMongo"
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function getUserFromClerk(userID: string) {
    const client = clerkClient()
    const user = (await client).users.getUser(userID)

    const username = (await user).username
    const imageUrl = (await user).imageUrl

    return { username, imageUrl }
}

export async function deleteImageFromCloudinary(imgPublicUrl: string) {
    try {
        const publicID = getPublicIdFromUrl(imgPublicUrl)
        if (!publicID) {
            return { success: false, errMsg: "Post not found" }
        }
        const result = await cloudinary.uploader.destroy(publicID)
        return { success: true }
    } catch (error: any) {
        return { success: false, errMsg: error.message }
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
    } catch (error: any) {
        return { success: false, errMsg: error.message }
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

    } catch (error: any) {
        return { success: false, errMsg: error.message }
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
    } catch (error: any) {
        return { success: false, errMsg: error.message }
    }
}

export async function createActivity(userID: string, activity: ActitivyReason, reportID?: string, postID?: string) {
    try {
        await Activity.create({ userID, activity, reportID, postID })
        return { success: true }
    } catch (error: any) {
        return { success: false, errMsg: error.message }
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
    } catch (error: any) {
        return { success: false, errMsg: error.message }
    }
}