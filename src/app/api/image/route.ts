import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const { image } = await req.json()
        const uploadRes = await cloudinary.uploader.upload(image, {
          folder: "places_been",
        })
        return NextResponse.json({ url: uploadRes.secure_url })
      } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
      }
}