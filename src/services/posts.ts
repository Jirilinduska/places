import { deleteImageFromCloudinary } from "@/app/actions"
import { IPost } from "@/interfaces/interfaces"
import { getPublicIdFromUrl } from "@/lib/cloudinary"
import { connectDB } from "@/lib/mongo"
import { Post } from "@/models/Post"
import { Reactions } from "@/models/Reactions"
import { auth } from "@clerk/nextjs/server"

export async function updatePostService(newPost: IPost) {
    
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

export async function deletePostService(postID: string) {

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

export async function deleteAllPostsService(userID: string) {
    try {
        const posts = await Post.find({ userID })
        if(posts.length === 0) return { success: true }

        for(const p of posts) {
            const images = p.images
            if(images.length === 0) continue
            for(const i of images) {
                const publicID = getPublicIdFromUrl(i)
                if(publicID) await deleteImageFromCloudinary(publicID)
            }
            await Reactions.deleteMany({ postID: p._id })
        }

        await Post.deleteMany({ userID })
        return { success: true }

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}