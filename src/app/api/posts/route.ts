import { connectDB } from "@/lib/mongo"
import { Post } from "@/models/Post"
import { Reactions } from "@/models/Reactions"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"


// CREATE NEW POST 
export async function POST(req: NextRequest) {

    const { userId } = await auth()
    const body = await req.json()
    await connectDB()
    
    try {
        
        const newPost = await Post.create({
            ...body,
            tripDate: new Date(body.tripDate),
            userID: userId,
        })

        await Reactions.create({ postID: newPost._id })

        return NextResponse.json({ success: true }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Creating post failed" }, { status: 500 })
    }
}