import { handleError } from "@/helpers/handleError"
import cloudinary, { getPublicIdFromUrl } from "@/lib/cloudinary"

export type DeleteImageFromCloudinaryServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function deleteImageFromCloudinaryService(imgPublicUrl: string) : Promise<DeleteImageFromCloudinaryServiceType> {
    try {
        const publicID = getPublicIdFromUrl(imgPublicUrl)
        if (!publicID) {
            throw new Error("Something went wrong")
        }
        await cloudinary.uploader.destroy(publicID)
        return { success: true }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Delete image from cloudinary",
            component: "deleteImageFromCloudinaryService()",
            input: { imgPublicUrl }
        })
        return { success: false, errMsg }
    }
}