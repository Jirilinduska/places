import { INewPlaceData } from "@/interfaces/interfaces"
import mongoose, { Schema, model, models } from "mongoose"


interface ICreatePost extends INewPlaceData {
    tripDate: Date
    userID: string
    createdAt: Date
}

const PostSchema = new Schema<ICreatePost>({
    beenThere: { type: Boolean, required: true },
    country_code: { type: String, required: true },
    images: { type: [String], default: [] },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    note: { type: String },
    placeName: { type: String, required: true },
    placeTitle: { type: String, required: true },
    stars: { type: Number, default: 0 },
    tripDate: { type: Date, required: true  },
    userID: { type: String, required: true },
    municipality: { type: String },
    county: { type: String },
    isPublic: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
})

export const Post = models.Post || model<ICreatePost>("Post", PostSchema)