import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db/mongodb"
import Appointment from "@/lib/models/appointment.model"
import DoctorAvailability from "@/lib/models/doctor-availability.model"
import { NotificationService } from "@/lib/services/notification.service"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const date = searchParams.get("date")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    const query: any = {}
    if (status) query.status = status
    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      query.preferredDate = { $gte: startDate, $lt: endDate }
    }

    const skip = (page - 1) * limit

    const [appointments, total] = await Promise.all([
      Appointment.find(query).sort({ preferredDate: 1, preferredTime: 1 }).skip(skip).limit(limit).lean(),
      Appointment.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Check doctor availability
    const availability = await DoctorAvailability.findOne({
      date: new Date(body.preferredDate),
    })

    if (availability && !availability.isAvailable) {
      return NextResponse.json({ success: false, error: "Doctor is not available on this date" }, { status: 400 })
    }

    // Check if time slot is available
    if (availability) {
      const timeSlot = availability.timeSlots.find((slot) => slot.time === body.preferredTime)
      if (timeSlot && timeSlot.isBooked) {
        return NextResponse.json({ success: false, error: "This time slot is already booked" }, { status: 400 })
      }
    }

    const appointment = await Appointment.create(body)

    // Mark time slot as booked
    if (availability) {
      const timeSlotIndex = availability.timeSlots.findIndex((slot) => slot.time === body.preferredTime)
      if (timeSlotIndex !== -1) {
        availability.timeSlots[timeSlotIndex].isBooked = true
        await availability.save()
      }
    }

    try {
      await NotificationService.sendAppointmentConfirmation(appointment.toObject())
      appointment.notificationSent = true
      await appointment.save()
    } catch (error) {
      console.error("Failed to send notifications:", error)
    }

    return NextResponse.json({ success: true, data: appointment }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
