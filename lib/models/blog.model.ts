import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IBlog extends Document {
  title: string
  slug: string
  description: string
  content: string
  author: string
  category: string
  tags: string[]
  featuredImage: {
    url: string
    publicId: string
  }
  videoClip?: {
    url: string
    publicId: string
    duration?: number
  }
  published: boolean
  views: number
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: String,
      required: true,
      default: "Trillium Dental Centre",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    featuredImage: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
    videoClip: {
      url: String,
      publicId: String,
      duration: Number,
    },
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Indexes for efficient queries
BlogSchema.index({ slug: 1 })
BlogSchema.index({ published: 1, createdAt: -1 })
BlogSchema.index({ category: 1 })

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema)

export default Blog
