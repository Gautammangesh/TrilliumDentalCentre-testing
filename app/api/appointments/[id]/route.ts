import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import connectDB from "@/lib/db/mongodb"
import Appointment from "@/lib/models/appointment.model"
import { authOptions } from "@/lib/auth"
import { NotificationService } from "@/lib/services/notification.service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = params

    const appointment = await Appointment.findById(id).lean()

    if (!appointment) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: appointment })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = params
    const body = await request.json()

    const oldAppointment = await Appointment.findById(id)
    if (!oldAppointment) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 })
    }

    const oldStatus = oldAppointment.status

    const appointment = await Appointment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (oldStatus !== appointment.status) {
      try {
        await NotificationService.sendStatusUpdate(appointment.toObject(), oldStatus)
      } catch (error) {
        console.error("Failed to send status update notification:", error)
      }
    }

    return NextResponse.json({ success: true, data: appointment })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const { id } = params

    const appointment = await Appointment.findByIdAndDelete(id)

    if (!appointment) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
