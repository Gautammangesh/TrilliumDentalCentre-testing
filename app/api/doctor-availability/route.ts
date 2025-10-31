import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import connectDB from "@/lib/db/mongodb"
import DoctorAvailability from "@/lib/models/doctor-availability.model"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const query: any = {}

    if (date) {
      query.date = new Date(date)
    } else if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const availability = await DoctorAvailability.find(query).sort({ date: 1 }).lean()

    return NextResponse.json({ success: true, data: availability })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()

    const availability = await DoctorAvailability.create(body)

    return NextResponse.json({ success: true, data: availability }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
