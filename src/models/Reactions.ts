import { IReactions } from "@/interfaces/interfaces"
import { Schema, model, models } from "mongoose"


const ReactionsSchema = new Schema<IReactions>({
    postID: { type: String, required: true },
    hearts: { type: [String], default: [] },
    trees: { type: [String], default: [] },
    mountains: { type: [String], default: [] },
    water: { type: [String], default: [] },
    bikes: { type: [String], default: [] },
})

export const Reactions = models.Reactions || model<IReactions>("Reactions", ReactionsSchema)