import { connectDB } from "@/lib/mongo"
import { Post } from "@/models/Post"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

    const { userId } = await auth()
    await connectDB()

    try {

        const postsDB = await Post.find({ userID: userId }).lean()

        const postsBeen = postsDB.filter(x => x.beenThere)

        const placesWantVisit = postsDB.filter(x => !x.beenThere).length
        const placesBeen      = postsDB.filter(x => x.beenThere).length

        const placesBeenLastYear = postsBeen  
            .filter(x => new Date(x.tripDate).getFullYear() === new Date().getFullYear() - 1).length

        const placesBeenThisYear = postsBeen
            .filter(x => new Date(x.tripDate).getFullYear() === new Date().getFullYear()).length

        const posts = postsDB.map(x => ({
            _id: x._id,
            lat: x.lat,
            lon: x.lon,
            placeTitle: x.placeTitle,
            placeName: x.placeName,
            images: x.images,
            beenThere: x.beenThere,
            tripDate: x.tripDate
        }))
        
        return NextResponse.json({ posts, placesBeen, placesWantVisit, placesBeenLastYear, placesBeenThisYear })

    } catch (error) {
        return NextResponse.json({ error: "ERROR" }, { status: 500 })
    }
    
}