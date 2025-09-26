import { IErrorLog } from "@/interfaces/interfaces"
import { Schema, model, models } from "mongoose"

const ErrorLogSchema = new Schema<IErrorLog>({
    message: { type: String, required: true },
    context: {
        route: { type: String, required: false },
        component: { type: String, required: false },
        action: { type: String, required: false },
        userID: { type: String, required: false },
        input: { type: Schema.Types.Mixed, required: false },
        url: { type: String, required: false }
    },
    env: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isSolved: { type: Boolean, default: false }
});


export const ErrorLog = models.ErrorLog || model<IErrorLog>("ErrorLog", ErrorLogSchema)
