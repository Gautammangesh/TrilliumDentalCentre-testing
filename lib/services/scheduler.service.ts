import connectDB from "@/lib/db/mongodb"
import Appointment from "@/lib/models/appointment.model"
import { NotificationService } from "./notification.service"

export class SchedulerService {
  /**
   * Check for appointments that need reminders
   * This should be called every 5 minutes by a cron job
   */
  static async processAppointmentReminders() {
    try {
      await connectDB()

      const now = new Date()
      const reminderWindow = new Date(now.getTime() + 15 * 60000) // 15 minutes from now

      // Find confirmed appointments that:
      // 1. Are scheduled within the next 15 minutes
      // 2. Haven't received a reminder yet
      // 3. Are confirmed status
      const appointments = await Appointment.find({
        status: "confirmed",
        reminderSent: false,
        preferredDate: {
          $gte: now,
          $lte: reminderWindow,
        },
      })

      console.log(`[v0] Found ${appointments.length} appointments needing reminders`)

      const results = {
        success: 0,
        failed: 0,
        errors: [] as any[],
      }

      for (const appointment of appointments) {
        try {
          // Send reminder notification
          const result = await NotificationService.sendAppointmentReminder(appointment.toObject())

          // Mark as sent
          appointment.reminderSent = true
          await appointment.save()

          results.success++
          console.log(`[v0] Reminder sent for appointment ${appointment._id}`)
        } catch (error) {
          results.failed++
          results.errors.push({
            appointmentId: appointment._id,
            error: error instanceof Error ? error.message : "Unknown error",
          })
          console.error(`[v0] Failed to send reminder for appointment ${appointment._id}:`, error)
        }
      }

      return {
        processed: appointments.length,
        ...results,
      }
    } catch (error) {
      console.error("[v0] Scheduler error:", error)
      throw error
    }
  }

  /**
   * Clean up old appointments
   * This should be called daily
   */
  static async cleanupOldAppointments() {
    try {
      await connectDB()

      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      // Delete completed or cancelled appointments older than 30 days
      const result = await Appointment.deleteMany({
        status: { $in: ["completed", "cancelled"] },
        updatedAt: { $lt: thirtyDaysAgo },
      })

      console.log(`[v0] Cleaned up ${result.deletedCount} old appointments`)

      return {
        deletedCount: result.deletedCount,
      }
    } catch (error) {
      console.error("[v0] Cleanup error:", error)
      throw error
    }
  }

  /**
   * Auto-complete past appointments
   * This should be called daily
   */
  static async autoCompletePastAppointments() {
    try {
      await connectDB()

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(23, 59, 59, 999)

      // Find confirmed appointments from yesterday or earlier
      const result = await Appointment.updateMany(
        {
          status: "confirmed",
          preferredDate: { $lt: yesterday },
        },
        {
          $set: { status: "completed" },
        },
      )

      console.log(`[v0] Auto-completed ${result.modifiedCount} past appointments`)

      return {
        completedCount: result.modifiedCount,
      }
    } catch (error) {
      console.error("[v0] Auto-complete error:", error)
      throw error
    }
  }
}
