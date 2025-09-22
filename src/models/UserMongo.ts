import { IUserMongo } from "@/interfaces/interfaces"
import { Schema, model, models } from "mongoose"


const UserMongoSchema = new Schema<IUserMongo>({
    isAdmin: { type: Boolean, default: false },
    profileBgImg: { type: String, default: "" },
    userIDClerk: { type: String, required: true }
})

export const UserMongo = models.UserMongo || model<IUserMongo>("UserMongo", UserMongoSchema)