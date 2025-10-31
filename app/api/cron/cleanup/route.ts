import { type NextRequest, NextResponse } from "next/server"
import { SchedulerService } from "@/lib/services/scheduler.service"

export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      return NextResponse.json({ success: false, error: "CRON_SECRET not configured" }, { status: 500 })
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Starting cleanup cron job")

    const [cleanupResult, autoCompleteResult] = await Promise.all([
      SchedulerService.cleanupOldAppointments(),
      SchedulerService.autoCompletePastAppointments(),
    ])

    console.log("[v0] Cleanup cron job completed")

    return NextResponse.json({
      success: true,
      message: "Cleanup completed",
      data: {
        cleanup: cleanupResult,
        autoComplete: autoCompleteResult,
      },
    })
  } catch (error: any) {
    console.error("[v0] Cleanup cron job failed:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
