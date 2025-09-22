
import { IActivity } from "@/interfaces/interfaces"
import { Schema, model, models } from "mongoose"


const ActivitySchema = new Schema<IActivity>({
    activity: { type: String, required: true },
    userID: { type: String, required: true },
    postID: { type: String, default: ""},
    reportID: { type: String, default: ""},
    createdAt: { type: Date, default: Date.now }
})

export const Activity = models.Activity || model<IActivity>("Activity", ActivitySchema)