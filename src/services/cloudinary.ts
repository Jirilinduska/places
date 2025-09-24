import cloudinary, { getPublicIdFromUrl } from "@/lib/cloudinary"

export async function deleteImageFromCloudinaryService(imgPublicUrl: string) {
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