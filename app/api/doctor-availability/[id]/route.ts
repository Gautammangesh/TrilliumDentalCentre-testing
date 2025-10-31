import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import connectDB from "@/lib/db/mongodb"
import DoctorAvailability from "@/lib/models/doctor-availability.model"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = params
    const body = await request.json()

    const availability = await DoctorAvailability.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!availability) {
      return NextResponse.json({ success: false, error: "Availability not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: availability })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = params

    const availability = await DoctorAvailability.findByIdAndDelete(id)

    if (!availability) {
      return NextResponse.json({ success: false, error: "Availability not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
