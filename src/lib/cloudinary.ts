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
      const parts = url.split('/');
      // vezmeme všechny části za "upload/"
      const uploadIndex = parts.findIndex(p => p === 'upload');
      if (uploadIndex === -1) return null;
  
      // spojíme zbytek do public_id s cestou + odstraníme ext
      const publicIdWithExt = parts.slice(uploadIndex + 1).join('/');
      const lastDot = publicIdWithExt.lastIndexOf('.');
      const publicId = lastDot !== -1 ? publicIdWithExt.slice(0, lastDot) : publicIdWithExt;
      return publicId;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
