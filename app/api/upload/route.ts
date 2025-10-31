import { type NextRequest, NextResponse } from "next/server"
import cloudinary, { uploadToCloudinary } from "@/lib/config/cloudinary"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "general"
    const resourceType = (formData.get("resourceType") as "image" | "video") || "image"

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    const result: any = await uploadToCloudinary(file, folder, resourceType)

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        duration: result.duration,
        format: result.format,
        resourceType: result.resource_type,
      },
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get("publicId")
    const resourceType = (searchParams.get("resourceType") as "image" | "video") || "image"

    if (!publicId) {
      return NextResponse.json({ success: false, error: "No publicId provided" }, { status: 400 })
    }

    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })

    return NextResponse.json({ success: true, data: {} })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
