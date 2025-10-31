import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export const uploadToCloudinary = async (file: File, folder: string, resourceType: "image" | "video" = "image") => {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `trillium-dental/${folder}`,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
      .end(buffer)
  })
}

export const deleteFromCloudinary = async (publicId: string, resourceType: "image" | "video" = "image") => {
  return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}
