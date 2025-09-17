import { REACTION_BIKES, REACTION_HEARTS, REACTION_MOUNTAINS, REACTION_TREES, REACTION_WATER } from "@/constants/constants"
import { removeAllReactions } from "@/helpers/removeAllReactions"
import { connectDB } from "@/lib/mongo"
import { Reactions } from "@/models/Reactions"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    
    const { postID, reactionType, wantRemove } = await req.json()
    const { userId } = await auth()
   
    if(!userId) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
    }
   
    await connectDB()

    try {
        const reactions = await Reactions.findOne({ postID })
        removeAllReactions(reactions, userId)
        if(!wantRemove) {
            if (reactionType === REACTION_BIKES) reactions.bikes.push(userId)
            if (reactionType === REACTION_HEARTS) reactions.hearts.push(userId)
            if (reactionType === REACTION_MOUNTAINS) reactions.mountains.push(userId)
            if (reactionType === REACTION_TREES) reactions.trees.push(userId)
            if (reactionType === REACTION_WATER) reactions.water.push(userId)
        }
        await reactions.save()
        return NextResponse.json({ reactions, status: 201 })

    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
    }
}