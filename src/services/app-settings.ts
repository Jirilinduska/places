import { handleError } from "@/helpers/handleError"
import { IAppSettings } from "@/interfaces/interfaces"
import cloudinary from "@/lib/cloudinary"
import { connectDB } from "@/lib/mongo"
import { AppSettings } from "@/models/AppSettings"


export type GetAdminAppSettingsServiceType =
  | { success: true, appSettings: IAppSettings }
  | { success: false, errMsg: string }

export async function getAdminAppSettingsService() : Promise<GetAdminAppSettingsServiceType> {
    try {
        await connectDB()
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
        const { errMsg } = await handleError(error,{
            action: "Get Admin Settings Data",
            component: "getAdminAppSettingsService()"
        })
        return { success: false, errMsg }
    }
}

export type UploadAdminProfileBgImageServiceType =
  | { success: true, imgUrl: string }
  | { success: false, errMsg: string }

export async function uploadAdminProfileBgImageService(base64data: string) : Promise<UploadAdminProfileBgImageServiceType> {
    try {
        await connectDB()
        let appSettings = await AppSettings.findOne()
        const uploaded = await cloudinary.uploader.upload(base64data)
        const imgUrl = uploaded.secure_url 
        appSettings?.profileBgImages.push(imgUrl)
        await appSettings.save()
        return { success: true, imgUrl }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Upload new profile bg by admin",
            component: "uploadAdminProfileBgImageService()",
            input: { base64data }
        })
        return { success: false, errMsg }
    }
}

export type GetProfileBackgroundsServiceType =
  | { success: true, images: string[] }
  | { success: false, errMsg: string }

export async function getProfileBackgroundsService() : Promise<GetProfileBackgroundsServiceType> {
    try {
        await connectDB()
        const appSettings = await AppSettings.findOne()
        return { success: true, images: appSettings.profileBgImages }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Get profile background",
            component: "getProfileBackgroundsService()"
        })
        return { success: false, errMsg }
    }
}