import { connectDB } from "@/lib/mongo"
import { Post } from "@/models/Post"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

    const { userId } = await auth()
    await connectDB()

    try {

        const postsDB = await Post.find({ userID: userId }).lean()

        const placesBeen      = postsDB.filter(x => x.beenThere).length
        const placesWantVisit = postsDB.filter(x => !x.beenThere).length

        const posts = postsDB.map(x => ({
            _id: x._id,
            lat: x.lat,
            lon: x.lon,
            placeTitle: x.placeTitle,
            placeName: x.placeName,
            images: x.images,
            beenThere: x.beenThere,
            tripData: x.tripDate
        }))
        
        return NextResponse.json({ posts, placesBeen, placesWantVisit })

    } catch (error) {
        return NextResponse.json({ error: "ERROR" }, { status: 500 })
    }
    
}