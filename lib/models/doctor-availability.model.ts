import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IDoctorAvailability extends Document {
  date: Date
  isAvailable: boolean
  reason?: string
  timeSlots: {
    time: string
    isBooked: boolean
  }[]
  createdAt: Date
  updatedAt: Date
}

const DoctorAvailabilitySchema = new Schema<IDoctorAvailability>(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    reason: {
      type: String,
      trim: true,
    },
    timeSlots: [
      {
        time: {
          type: String,
          required: true,
        },
        isBooked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Index for efficient date queries
DoctorAvailabilitySchema.index({ date: 1 })

const DoctorAvailability: Model<IDoctorAvailability> =
  mongoose.models.DoctorAvailability ||
  mongoose.model<IDoctorAvailability>("DoctorAvailability", DoctorAvailabilitySchema)

export default DoctorAvailability
