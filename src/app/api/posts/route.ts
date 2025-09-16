import { connectDB } from "@/lib/mongo"
import { Post } from "@/models/Post"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"



export async function POST(req: NextRequest) {

    const { userId } = await auth()
    const body = await req.json()
    await connectDB()

    console.log(userId)
    console.log(body)

    try {
        
        await Post.create({
            ...body,
            tripDate: new Date(body.tripDate),
            userID: userId,
        })

        return NextResponse.json({ success: true }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Creating post failed" }, { status: 500 })
    }
}