// Type definitions for the application

export interface Service {
  name: string
  category: string
  description: string
  features?: string[]
  specialists?: string[]
  price_range?: string
  duration?: string
  image_url?: string
  active?: boolean
}

export interface Appointment {
  id?: string
  patient_name: string
  email: string
  phone: string
  service: string
  preferred_date: string
  preferred_time: string
  message?: string
  payment_status?: "paid" | "pending"
  discount_applied?: boolean
  status?: "pending" | "confirmed" | "cancelled"
  notification_sent?: boolean
  whatsapp_sent?: boolean
  sms_sent?: boolean
  created_at?: string
}

export interface Testimonial {
  id?: string
  patient_name: string
  service: string
  rating: number
  comment: string
  date: string
  image_url?: string
  verified?: boolean
}

export interface GalleryItem {
  id?: string
  title: string
  category: string
  image_url: string
  description?: string
  before_image?: string
  after_image?: string
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status?: "new" | "read" | "replied"
  created_at?: string
}

export interface BlogPost {
  id?: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  category: string
  image_url?: string
  published: boolean
  published_at?: string
  created_at?: string
}
