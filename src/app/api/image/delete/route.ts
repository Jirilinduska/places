import { NextRequest, NextResponse } from "next/server";
import cloudinary, { getPublicIdFromUrl } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { imageURL } = await req.json()
    console.log("IMG: ", imageURL)
    const publicID = getPublicIdFromUrl(imageURL)
    if (!publicID) {
        return NextResponse.json({ error: "Invalid URL" }, { status: 400 })
    }
    const result = await cloudinary.uploader.destroy(publicID)
    return NextResponse.json({ result })
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  }
}