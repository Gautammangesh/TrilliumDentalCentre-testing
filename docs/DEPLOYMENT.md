# Deployment Guide

This guide will help you deploy the Trillium Dental Centre application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. GitHub account with your code repository
3. All required environment variables ready

## Step 1: Prepare Your Repository

1. Push your code to GitHub:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/trillium-dental.git
   git push -u origin main
   \`\`\`

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

4. Add environment variables (see below)
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. Login to Vercel:
   \`\`\`bash
   vercel login
   \`\`\`

3. Deploy:
   \`\`\`bash
   vercel
   \`\`\`

4. Follow the prompts and add environment variables

## Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

### Required Variables

\`\`\`env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app

# Application URLs
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api

# Cron Secret
CRON_SECRET=your_secure_random_string
\`\`\`

### Email Service (Choose One)

**Option 1: Resend (Recommended)**
\`\`\`env
RESEND_API_KEY=re_your_api_key
\`\`\`

**Option 2: Nodemailer/SMTP**
\`\`\`env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
\`\`\`

### WhatsApp Business API

\`\`\`env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_VERIFY_TOKEN=your_verify_token
\`\`\`

### Cloudinary

\`\`\`env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

### Payment Gateway (Optional)

\`\`\`env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
\`\`\`

## Step 4: Create Admin User

After deployment, create an admin user by running this script in MongoDB:

\`\`\`javascript
db.admins.insertOne({
  name: "Admin",
  email: "admin@trilliumdental.com",
  password: "$2a$10$hashed_password_here", // Use bcrypt to hash
  role: "super-admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
\`\`\`

Or use MongoDB Compass/Atlas to insert the document.

## Step 5: Verify Deployment

1. **Check deployment status**: Vercel Dashboard → Deployments
2. **Test the application**: Visit your deployed URL
3. **Verify cron jobs**: Dashboard → Cron Jobs
4. **Check function logs**: Dashboard → Functions → Logs

## Step 6: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` environment variables

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Admin login works
- [ ] Database connection is working
- [ ] Email notifications are sending
- [ ] WhatsApp notifications are sending (if configured)
- [ ] Cron jobs are running
- [ ] Image/video uploads work
- [ ] All pages are accessible

## Monitoring & Maintenance

### 1. Monitor Cron Jobs
- Check Vercel Dashboard → Cron Jobs regularly
- Set up email alerts for failures

### 2. Database Backups
- Enable automated backups in MongoDB Atlas
- Schedule: Daily backups recommended

### 3. Error Tracking
- Monitor Vercel function logs
- Set up error tracking (Sentry, LogRocket, etc.)

### 4. Performance Monitoring
- Use Vercel Analytics
- Monitor API response times

## Troubleshooting

### Build Failures

1. **Check build logs** in Vercel dashboard
2. **Verify dependencies** in package.json
3. **Test build locally**: `npm run build`

### Runtime Errors

1. **Check function logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Test API endpoints** using Postman/curl

### Database Connection Issues

1. **Verify MongoDB URI** is correct
2. **Check IP whitelist** in MongoDB Atlas (allow all: 0.0.0.0/0)
3. **Test connection** using MongoDB Compass

### Cron Jobs Not Running

1. **Verify Vercel plan** (Hobby or higher required)
2. **Check vercel.json** is in project root
3. **Verify CRON_SECRET** is set

## Scaling Considerations

### For High Traffic:

1. **Upgrade Vercel plan** for better performance
2. **Enable caching** for static content
3. **Optimize database queries** with indexes
4. **Use CDN** for images/videos
5. **Implement rate limiting** on API routes

### Database Scaling:

1. **Upgrade MongoDB cluster** as needed
2. **Add read replicas** for better performance
3. **Implement connection pooling**
4. **Archive old data** regularly

## Support

For deployment issues:
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- MongoDB Support: [mongodb.com/support](https://www.mongodb.com/support)
- Documentation: Check `/docs` folder in project
