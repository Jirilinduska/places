import { INewReport } from "@/interfaces/interfaces"
import mongoose, { Schema, model, models } from "mongoose"


const ReportSchema = new Schema<INewReport>({
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    reportedBy: { type: String, required: true },
    reason: { type: String, required: true },
    comment: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
})

export const Report = models.Report || model<INewReport>("Report", ReportSchema)