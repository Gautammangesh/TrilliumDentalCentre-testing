import { type NextRequest, NextResponse } from "next/server"
import { NotificationService } from "@/lib/services/notification.service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const testAppointment = {
      patientName: body.patientName || "Test Patient",
      email: body.email,
      phone: body.phone || "+919876543210",
      whatsappNumber: body.whatsappNumber,
      service: "General Checkup",
      preferredDate: new Date(),
      preferredTime: "10:00 AM",
      status: "confirmed",
    }

    const result = await NotificationService.sendAppointmentConfirmation(testAppointment)

    return NextResponse.json({
      success: true,
      message: "Test notifications sent",
      result,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
