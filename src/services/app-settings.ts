import { IAppSettings } from "@/interfaces/interfaces"
import cloudinary from "@/lib/cloudinary"
import { AppSettings } from "@/models/AppSettings"


export async function getAdminAppSettingsService() {
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

export async function uploadAdminProfileBgImageService(base64data: string) {
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