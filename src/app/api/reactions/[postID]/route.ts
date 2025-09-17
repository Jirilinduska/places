import { connectDB } from "@/lib/mongo"
import { Reactions } from "@/models/Reactions"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params } : { params: Promise<{ postID: string }> }) {
    
    const { postID } = await params
    await connectDB()

    try {
        const reactions = await Reactions.findOne({ postID })
        return NextResponse.json({ reactions })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
    }
}