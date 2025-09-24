import { createActivity, getUserFromMongo } from "@/app/actions"
import { IAppSettings, ResolveReport } from "@/interfaces/interfaces"
import cloudinary from "@/lib/cloudinary"
import { AppSettings } from "@/models/AppSettings"
import { Post } from "@/models/Post"
import { Report } from "@/models/Report"
import { auth } from "@clerk/nextjs/server"

export async function getAdminAppSettingsService(userId: string) {

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

export async function uploadAdminProfileBgImageService(userId: string, base64data: string) {

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

export async function getProfileBackgroundsService() {
    const { userId } = await auth()
    if(!userId) return
    try {
        const appSettings = await AppSettings.findOne()
        return { success: true, images: appSettings.profileBgImages }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}