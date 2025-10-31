import { type NextRequest, NextResponse } from "next/server"
import { SchedulerService } from "@/lib/services/scheduler.service"

export const dynamic = "force-dynamic"
export const maxDuration = 60 // Maximum execution time in seconds

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      return NextResponse.json({ success: false, error: "CRON_SECRET not configured" }, { status: 500 })
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Starting appointment reminder cron job")

    const result = await SchedulerService.processAppointmentReminders()

    console.log("[v0] Reminder cron job completed:", result)

    return NextResponse.json({
      success: true,
      message: "Appointment reminders processed",
      data: result,
    })
  } catch (error: any) {
    console.error("[v0] Reminder cron job failed:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
