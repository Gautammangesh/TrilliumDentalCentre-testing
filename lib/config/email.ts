import { Resend } from "resend"
import nodemailer from "nodemailer"

// Resend configuration - only initialize if API key exists
export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Nodemailer configuration (fallback)
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    // Try Resend first
    if (resend && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Trillium Dental Centre <noreply@trilliumdental.com>",
        to,
        subject,
        html,
      })
    } else {
      // Fallback to Nodemailer
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html,
      })
    }
    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}
