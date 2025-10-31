import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db/mongodb"
import Appointment from "@/lib/models/appointment.model"
import { NotificationService } from "@/lib/services/notification.service"

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Find appointments that are 15 minutes away and haven't received reminders
    const now = new Date()
    const fifteenMinutesLater = new Date(now.getTime() + 15 * 60000)

    const appointments = await Appointment.find({
      status: "confirmed",
      reminderSent: false,
      preferredDate: {
        $gte: now,
        $lte: fifteenMinutesLater,
      },
    })

    const results = []

    for (const appointment of appointments) {
      try {
        await NotificationService.sendAppointmentReminder(appointment.toObject())
        appointment.reminderSent = true
        await appointment.save()
        results.push({ id: appointment._id, success: true })
      } catch (error) {
        console.error(`Failed to send reminder for appointment ${appointment._id}:`, error)
        results.push({ id: appointment._id, success: false, error })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${appointments.length} appointments`,
      results,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
