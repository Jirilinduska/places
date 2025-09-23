import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

export default cloudinary


export const getPublicIdFromUrl = (url: string) => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.findIndex(p => p === "upload");
    if (uploadIndex === -1) return null;
    const withoutVersion = parts.slice(uploadIndex + 2).join("/");
    const lastDot = withoutVersion.lastIndexOf(".");
    return lastDot !== -1 ? withoutVersion.slice(0, lastDot) : withoutVersion;
  } catch (err) {
    console.error("getPublicIdFromUrl error:", err);
    return null;
  }
}
  
