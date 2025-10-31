import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IAppointment extends Document {
  patientName: string
  email: string
  phone: string
  whatsappNumber?: string
  service: string
  preferredDate: Date
  preferredTime: string
  message?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  reminderSent: boolean
  notificationSent: boolean
  createdAt: Date
  updatedAt: Date
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    whatsappNumber: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
    },
    preferredDate: {
      type: Date,
      required: [true, "Preferred date is required"],
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"],
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
AppointmentSchema.index({ preferredDate: 1, status: 1 })
AppointmentSchema.index({ email: 1 })

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema)

export default Appointment
