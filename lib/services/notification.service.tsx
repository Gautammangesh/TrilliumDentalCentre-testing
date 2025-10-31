import { sendEmail } from "@/lib/config/email"
import { sendWhatsAppMessage } from "@/lib/config/whatsapp"
import { format } from "date-fns"

interface AppointmentData {
  patientName: string
  email: string
  phone: string
  whatsappNumber?: string
  service: string
  preferredDate: Date
  preferredTime: string
  status: string
}

export class NotificationService {
  static async sendAppointmentConfirmation(appointment: AppointmentData) {
    const emailSubject = "Appointment Confirmation - Trillium Dental Centre"
    const emailHtml = this.getConfirmationEmailTemplate(appointment)

    const whatsappMessage = this.getConfirmationWhatsAppMessage(appointment)

    const results = await Promise.allSettled([
      sendEmail(appointment.email, emailSubject, emailHtml),
      appointment.whatsappNumber
        ? sendWhatsAppMessage(appointment.whatsappNumber, whatsappMessage)
        : Promise.resolve({ success: true }),
    ])

    return {
      email: results[0].status === "fulfilled" ? results[0].value : { success: false },
      whatsapp: results[1].status === "fulfilled" ? results[1].value : { success: false },
    }
  }

  static async sendAppointmentReminder(appointment: AppointmentData) {
    const emailSubject = "Appointment Reminder - Trillium Dental Centre"
    const emailHtml = this.getReminderEmailTemplate(appointment)

    const whatsappMessage = this.getReminderWhatsAppMessage(appointment)

    const results = await Promise.allSettled([
      sendEmail(appointment.email, emailSubject, emailHtml),
      appointment.whatsappNumber
        ? sendWhatsAppMessage(appointment.whatsappNumber, whatsappMessage)
        : Promise.resolve({ success: true }),
    ])

    return {
      email: results[0].status === "fulfilled" ? results[0].value : { success: false },
      whatsapp: results[1].status === "fulfilled" ? results[1].value : { success: false },
    }
  }

  static async sendStatusUpdate(appointment: AppointmentData, oldStatus: string) {
    const emailSubject = `Appointment ${appointment.status.toUpperCase()} - Trillium Dental Centre`
    const emailHtml = this.getStatusUpdateEmailTemplate(appointment, oldStatus)

    const whatsappMessage = this.getStatusUpdateWhatsAppMessage(appointment)

    const results = await Promise.allSettled([
      sendEmail(appointment.email, emailSubject, emailHtml),
      appointment.whatsappNumber
        ? sendWhatsAppMessage(appointment.whatsappNumber, whatsappMessage)
        : Promise.resolve({ success: true }),
    ])

    return {
      email: results[0].status === "fulfilled" ? results[0].value : { success: false },
      whatsapp: results[1].status === "fulfilled" ? results[1].value : { success: false },
    }
  }

  private static getConfirmationEmailTemplate(appointment: AppointmentData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .detail-label { font-weight: bold; color: #6b7280; }
            .detail-value { color: #111827; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: #ec4899; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${appointment.patientName},</p>
              <p>Thank you for choosing Trillium Dental Centre. Your appointment has been successfully booked.</p>
              
              <div class="appointment-details">
                <h3 style="margin-top: 0; color: #ec4899;">Appointment Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Service:</span>
                  <span class="detail-value">${appointment.service}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${format(new Date(appointment.preferredDate), "MMMM dd, yyyy")}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Time:</span>
                  <span class="detail-value">${appointment.preferredTime}</span>
                </div>
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">Status:</span>
                  <span class="detail-value" style="color: #10b981; font-weight: bold;">CONFIRMED</span>
                </div>
              </div>

              <p><strong>Important:</strong> Please arrive 10 minutes before your scheduled time.</p>
              <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>

              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" class="button">Contact Us</a>
              </div>
            </div>
            <div class="footer">
              <p><strong>Trillium Dental Centre</strong></p>
              <p>Vikhroli, Mumbai | Phone: +91 XXXXXXXXXX</p>
              <p>Your pathway to a healthy smile</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private static getReminderEmailTemplate(appointment: AppointmentData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .reminder-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px; }
            .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏰ Appointment Reminder</h1>
            </div>
            <div class="content">
              <p>Dear ${appointment.patientName},</p>
              
              <div class="reminder-box">
                <h3 style="margin-top: 0; color: #f59e0b;">Your appointment is coming up soon!</h3>
                <p style="margin: 0;">This is a friendly reminder about your upcoming dental appointment.</p>
              </div>
              
              <div class="appointment-details">
                <div class="detail-row">
                  <span style="font-weight: bold;">Service:</span>
                  <span>${appointment.service}</span>
                </div>
                <div class="detail-row">
                  <span style="font-weight: bold;">Date:</span>
                  <span>${format(new Date(appointment.preferredDate), "MMMM dd, yyyy")}</span>
                </div>
                <div class="detail-row" style="border-bottom: none;">
                  <span style="font-weight: bold;">Time:</span>
                  <span>${appointment.preferredTime}</span>
                </div>
              </div>

              <p><strong>Please arrive 10 minutes early.</strong></p>
              <p>We look forward to seeing you!</p>
            </div>
            <div class="footer">
              <p><strong>Trillium Dental Centre</strong></p>
              <p>Vikhroli, Mumbai</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private static getStatusUpdateEmailTemplate(appointment: AppointmentData, oldStatus: string): string {
    const statusColors: Record<string, string> = {
      confirmed: "#10b981",
      cancelled: "#ef4444",
      completed: "#3b82f6",
      pending: "#f59e0b",
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .status-update { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Status Update</h1>
            </div>
            <div class="content">
              <p>Dear ${appointment.patientName},</p>
              <p>Your appointment status has been updated.</p>
              
              <div class="status-update">
                <p style="margin: 0; color: #6b7280;">Status changed from</p>
                <h3 style="margin: 10px 0; color: ${statusColors[oldStatus] || "#6b7280"}; text-transform: uppercase;">${oldStatus}</h3>
                <p style="margin: 0; color: #6b7280;">to</p>
                <h3 style="margin: 10px 0; color: ${statusColors[appointment.status] || "#6b7280"}; text-transform: uppercase;">${appointment.status}</h3>
              </div>

              <p><strong>Appointment Details:</strong></p>
              <p>Service: ${appointment.service}<br>
              Date: ${format(new Date(appointment.preferredDate), "MMMM dd, yyyy")}<br>
              Time: ${appointment.preferredTime}</p>

              ${appointment.status === "cancelled" ? '<p style="color: #ef4444;"><strong>If you did not request this cancellation, please contact us immediately.</strong></p>' : ""}
            </div>
            <div class="footer">
              <p><strong>Trillium Dental Centre</strong></p>
              <p>Vikhroli, Mumbai</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private static getConfirmationWhatsAppMessage(appointment: AppointmentData): string {
    return `✅ *Appointment Confirmed - Trillium Dental Centre*

Dear ${appointment.patientName},

Your appointment has been successfully booked!

📋 *Details:*
Service: ${appointment.service}
Date: ${format(new Date(appointment.preferredDate), "MMM dd, yyyy")}
Time: ${appointment.preferredTime}

⏰ Please arrive 10 minutes early.

If you need to reschedule, contact us at least 24 hours in advance.

Thank you for choosing Trillium Dental Centre!
Your pathway to a healthy smile 😊`
  }

  private static getReminderWhatsAppMessage(appointment: AppointmentData): string {
    return `⏰ *Appointment Reminder - Trillium Dental Centre*

Dear ${appointment.patientName},

This is a reminder about your upcoming appointment:

📋 *Details:*
Service: ${appointment.service}
Date: ${format(new Date(appointment.preferredDate), "MMM dd, yyyy")}
Time: ${appointment.preferredTime}

Please arrive 10 minutes early.

See you soon! 😊`
  }

  private static getStatusUpdateWhatsAppMessage(appointment: AppointmentData): string {
    return `🔔 *Appointment Status Update - Trillium Dental Centre*

Dear ${appointment.patientName},

Your appointment status has been updated to: *${appointment.status.toUpperCase()}*

📋 *Details:*
Service: ${appointment.service}
Date: ${format(new Date(appointment.preferredDate), "MMM dd, yyyy")}
Time: ${appointment.preferredTime}

${appointment.status === "cancelled" ? "If you did not request this, please contact us immediately." : ""}

Thank you!`
  }
}
