
import { IAppSettings } from "@/interfaces/interfaces"
import { Schema, model, models } from "mongoose"


const AppSettingsSchema = new Schema<IAppSettings>({
    maintenance: { type: Boolean, default: false },
    profileBgImages: { type: [String], default: [] }
})

export const AppSettings = models.AppSettings || model<IAppSettings>("AppSettings", AppSettingsSchema)