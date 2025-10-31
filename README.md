# Trillium Dental Centre - Full-Stack Application

A modern, production-ready dental clinic management system built with Next.js 16, TypeScript, MongoDB, and comprehensive notification systems.

## Features

### Patient-Facing Features
- 🏥 **Modern Design**: Beautiful, responsive UI with smooth animations
- 📱 **Mobile-First**: Fully responsive across all devices
- 📅 **Online Booking**: Smart appointment booking with doctor availability checking
- 💬 **Multi-Channel Notifications**: Real-time Email & WhatsApp confirmations
- 🖼️ **Gallery**: Showcase of facilities and treatments
- 📝 **Blog System**: Educational content with video support via Cloudinary
- ⭐ **Testimonials**: Patient reviews and feedback
- 📞 **Contact Forms**: Easy communication with the clinic

### Admin Panel Features
- 🔐 **Secure Authentication**: NextAuth-based admin login
- 📊 **Dashboard**: Real-time statistics and appointment overview
- 📅 **Appointment Management**: View, update, and manage all appointments
- 🗓️ **Doctor Availability**: Set unavailable dates to prevent bookings
- 📝 **Blog Management**: Create and manage blog posts with video uploads
- 🔔 **Notification Testing**: Test email and WhatsApp integrations
- ⏰ **Automated Reminders**: Cron jobs for appointment reminders

### Technical Features
- ⚡ **Real-time Notifications**: Instant email and WhatsApp alerts
- 🤖 **Automated Reminders**: 15-minute pre-appointment notifications
- 🎥 **Video Support**: Cloudinary integration for blog videos
- 🗄️ **MongoDB Database**: Scalable NoSQL database
- 🔄 **Auto-cleanup**: Daily maintenance tasks via cron jobs
- 🔒 **Secure API**: Protected admin routes with authentication
- ♿ **Accessible**: WCAG compliant with semantic HTML

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js v5
- **File Storage**: Cloudinary (images & videos)
- **Email**: Resend / Nodemailer
- **WhatsApp**: Meta WhatsApp Business Cloud API
- **Cron Jobs**: Vercel Cron

### Infrastructure
- **Hosting**: Vercel
- **Database**: MongoDB Atlas
- **CDN**: Cloudinary
- **Analytics**: Vercel Analytics

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth endpoints
│   │   ├── appointments/          # Appointment CRUD
│   │   ├── blogs/                 # Blog CRUD
│   │   ├── doctor-availability/   # Availability management
│   │   ├── upload/                # Cloudinary uploads
│   │   ├── cron/                  # Automated tasks
│   │   └── notifications/         # Notification endpoints
│   ├── admin/
│   │   ├── login/                 # Admin login page
│   │   ├── dashboard/             # Admin dashboard
│   │   ├── appointments/          # Appointment management
│   │   ├── availability/          # Doctor availability
│   │   ├── blogs/                 # Blog management
│   │   └── settings/              # Settings & testing
│   ├── blogs/                     # Public blog pages
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── admin/                     # Admin panel components
│   ├── blog/                      # Blog components
│   ├── layout/                    # Layout components
│   ├── shared/                    # Shared components
│   └── ui/                        # shadcn/ui components
├── lib/
│   ├── config/                    # Configuration files
│   │   ├── cloudinary.ts          # Cloudinary setup
│   │   ├── email.ts               # Email service
│   │   └── whatsapp.ts            # WhatsApp API
│   ├── db/
│   │   └── mongodb.ts             # Database connection
│   ├── models/                    # MongoDB models
│   │   ├── appointment.model.ts
│   │   ├── blog.model.ts
│   │   ├── doctor-availability.model.ts
│   │   └── admin.model.ts
│   ├── services/                  # Business logic
│   │   ├── notification.service.ts
│   │   └── scheduler.service.ts
│   ├── auth.ts                    # NextAuth config
│   ├── constants.ts               # App constants
│   └── utils.ts                   # Utility functions
├── types/                         # TypeScript definitions
├── docs/                          # Documentation
│   ├── WHATSAPP_SETUP.md
│   ├── CRON_SETUP.md
│   └── DEPLOYMENT.md
├── .env.example                   # Environment variables template
├── vercel.json                    # Vercel cron configuration
└── README.md
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Email service (Resend or SMTP)
- WhatsApp Business API (optional)

### Installation

1. **Clone and install dependencies**:

\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables**:

Copy `.env.example` to `.env.local` and fill in your credentials:

\`\`\`env
# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trillium-dental

# Cloudinary (for video/image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service
RESEND_API_KEY=re_your_resend_api_key
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# WhatsApp Business Cloud API
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_VERIFY_TOKEN=your_verify_token

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Cron Job Secret
CRON_SECRET=your_cron_secret_key
\`\`\`

3. **Run the development server**:

\`\`\`bash
npm run dev
\`\`\`

4. **Open [http://localhost:3000](http://localhost:3000)**

## Configuration Guide

### 1. MongoDB Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP (or use 0.0.0.0/0 for all IPs)
4. Get your connection string and add to `MONGODB_URI`

### 2. Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret from dashboard
3. Add credentials to environment variables

### 3. Email Service Setup

**Option A: Resend (Recommended)**
1. Sign up at [Resend](https://resend.com)
2. Get your API key
3. Add to `RESEND_API_KEY`

**Option B: Gmail SMTP**
1. Enable 2-factor authentication on Gmail
2. Generate an App Password
3. Add SMTP credentials to environment variables

### 4. WhatsApp Business API Setup

See detailed guide in `docs/WHATSAPP_SETUP.md`

1. Create Meta Developer account
2. Set up WhatsApp Business App
3. Get Phone Number ID and Access Token
4. Add credentials to environment variables

### 5. Create Admin User

After setting up MongoDB, create an admin user:

\`\`\`javascript
// Run in MongoDB shell or Compass
db.admins.insertOne({
  name: "Admin",
  email: "admin@trilliumdental.com",
  password: "$2a$10$YourHashedPasswordHere", // Use bcrypt to hash
  role: "super-admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
\`\`\`

Or use this Node.js script:

\`\`\`javascript
const bcrypt = require('bcryptjs');
const password = await bcrypt.hash('your_password', 10);
console.log(password); // Use this in MongoDB
\`\`\`

## Key Features Explained

### Appointment System

- **Smart Booking**: Checks doctor availability before confirming
- **Time Slot Management**: Prevents double-booking
- **Status Tracking**: pending → confirmed → completed
- **Automatic Notifications**: Email + WhatsApp on booking

### Notification System

- **Instant Confirmations**: Sent immediately on booking
- **Status Updates**: Notified when appointment status changes
- **Automated Reminders**: Sent 15 minutes before appointment
- **Multi-channel**: Email and WhatsApp support

### Blog System

- **Rich Content**: Full markdown/HTML support
- **Video Integration**: Upload videos to Cloudinary
- **SEO Optimized**: Proper meta tags and slugs
- **View Tracking**: Automatic view counting

### Admin Panel

- **Dashboard**: Real-time statistics
- **Appointment Management**: Full CRUD operations
- **Availability Control**: Block dates when doctor unavailable
- **Blog Management**: Create/edit/delete posts
- **Testing Tools**: Test notifications before going live

### Automated Tasks (Cron Jobs)

1. **Appointment Reminders** (Every 5 minutes)
   - Finds appointments in next 15 minutes
   - Sends email and WhatsApp reminders
   - Marks as reminder sent

2. **Database Cleanup** (Daily at 2 AM)
   - Auto-completes past appointments
   - Deletes old completed/cancelled appointments

## Deployment

### Deploy to Vercel

1. **Push to GitHub**:
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Add all environment variables
   - Deploy

3. **Configure Cron Jobs**:
   - Cron jobs are automatically configured via `vercel.json`
   - Check Vercel Dashboard → Cron Jobs to verify

See detailed deployment guide in `docs/DEPLOYMENT.md`

## What You Need to Provide

### Required Setup

1. **MongoDB Database**
   - Create MongoDB Atlas cluster
   - Add connection string to environment variables

2. **Cloudinary Account**
   - Sign up and get API credentials
   - Used for blog images and videos

3. **Email Service**
   - Choose Resend or Gmail SMTP
   - Configure credentials

4. **Admin Account**
   - Create admin user in MongoDB
   - Use for accessing admin panel

### Optional Setup

5. **WhatsApp Business API**
   - For WhatsApp notifications
   - See `docs/WHATSAPP_SETUP.md`

6. **Custom Domain**
   - Connect your domain in Vercel
   - Update environment variables

### Content Updates

7. **Images**
   - Replace placeholder images with real photos
   - Add clinic photos to gallery
   - Add doctor photos

8. **Text Content**
   - Update services descriptions
   - Add real testimonials
   - Update contact information

9. **Legal Pages**
   - Add Privacy Policy
   - Add Terms of Service
   - Add Refund Policy

## API Endpoints

### Public Endpoints

- `GET /api/blogs` - List all published blogs
- `GET /api/blogs/[slug]` - Get single blog
- `POST /api/appointments` - Create appointment
- `GET /api/doctor-availability` - Check availability

### Protected Endpoints (Admin Only)

- `PUT /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Delete appointment
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/[slug]` - Update blog
- `DELETE /api/blogs/[slug]` - Delete blog
- `POST /api/doctor-availability` - Set availability
- `POST /api/upload` - Upload to Cloudinary

### Cron Endpoints

- `GET /api/cron/reminders` - Process appointment reminders
- `GET /api/cron/cleanup` - Cleanup old data

## Testing

### Test Notifications

1. Go to Admin Panel → Settings
2. Use the "Test Notifications" section
3. Enter your email and WhatsApp number
4. Click "Send Test Notifications"

### Test Appointment Flow

1. Book an appointment from the public site
2. Check email and WhatsApp for confirmation
3. Login to admin panel
4. Update appointment status
5. Verify status update notifications

### Test Cron Jobs Locally

\`\`\`bash
# Test reminder cron
curl -X GET http://localhost:3000/api/cron/reminders \
  -H "Authorization: Bearer your_cron_secret"

# Test cleanup cron
curl -X GET http://localhost:3000/api/cron/cleanup \
  -H "Authorization: Bearer your_cron_secret"
\`\`\`

## Troubleshooting

### Common Issues

**Database Connection Failed**
- Check MongoDB URI is correct
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

**Notifications Not Sending**
- Verify API keys are correct
- Check email/WhatsApp service status
- Review function logs in Vercel

**Cron Jobs Not Running**
- Ensure `vercel.json` is in project root
- Verify `CRON_SECRET` is set
- Check Vercel plan (Hobby or higher required)

**Admin Login Failed**
- Verify admin user exists in database
- Check password is properly hashed
- Ensure `NEXTAUTH_SECRET` is set

## Documentation

- [WhatsApp Setup Guide](docs/WHATSAPP_SETUP.md)
- [Cron Job Configuration](docs/CRON_SETUP.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## Support

For issues or questions:
- Check the documentation in `/docs`
- Review error logs in Vercel dashboard
- Check MongoDB logs in Atlas

## License

Proprietary - © 2025 Trillium Dental Centre. All rights reserved.
