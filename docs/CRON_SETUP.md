# Cron Job Setup Guide

This application uses automated cron jobs to send appointment reminders and perform maintenance tasks.

## Vercel Cron Jobs (Recommended for Production)

The application is configured to use Vercel Cron Jobs, which are automatically set up when you deploy to Vercel.

### Configuration

The `vercel.json` file contains the cron job configuration:

\`\`\`json
{
  "crons": [
    {
      "path": "/api/cron/reminders",
      "schedule": "*/5 * * * *"
    },
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 2 * * *"
    }
  ]
}
\`\`\`

### Cron Jobs Explained

#### 1. Appointment Reminders (`/api/cron/reminders`)
- **Schedule**: Every 5 minutes (`*/5 * * * *`)
- **Purpose**: Checks for appointments scheduled in the next 15 minutes and sends reminder notifications
- **Actions**:
  - Finds confirmed appointments within 15-minute window
  - Sends email and WhatsApp reminders
  - Marks appointments as reminder sent

#### 2. Cleanup & Auto-Complete (`/api/cron/cleanup`)
- **Schedule**: Daily at 2:00 AM (`0 2 * * *`)
- **Purpose**: Maintains database hygiene
- **Actions**:
  - Auto-completes past confirmed appointments
  - Deletes completed/cancelled appointments older than 30 days

### Security

All cron endpoints are protected with the `CRON_SECRET` environment variable. Vercel automatically includes this in the Authorization header when calling cron jobs.

Make sure to set `CRON_SECRET` in your environment variables:

\`\`\`env
CRON_SECRET=your_secure_random_string_here
\`\`\`

### Monitoring Cron Jobs

1. **Vercel Dashboard**:
   - Go to your project → Deployments → Cron Jobs
   - View execution logs and status

2. **Application Logs**:
   - Check Vercel function logs for detailed execution information
   - Look for `[v0]` prefixed log messages

### Testing Cron Jobs Locally

You can test cron jobs locally using curl:

\`\`\`bash
# Test reminder cron
curl -X GET http://localhost:3000/api/cron/reminders \\
  -H "Authorization: Bearer your_cron_secret"

# Test cleanup cron
curl -X GET http://localhost:3000/api/cron/cleanup \\
  -H "Authorization: Bearer your_cron_secret"
\`\`\`

## Alternative: External Cron Services

If not using Vercel, you can use external cron services:

### 1. Cron-job.org
1. Sign up at [cron-job.org](https://cron-job.org)
2. Create new cron jobs pointing to your API endpoints
3. Add Authorization header with your CRON_SECRET

### 2. EasyCron
1. Sign up at [easycron.com](https://easycron.com)
2. Configure cron jobs with your endpoints
3. Set custom headers for authentication

### 3. GitHub Actions (Free)

Create `.github/workflows/cron.yml`:

\`\`\`yaml
name: Appointment Reminders

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes

jobs:
  send-reminders:
    runs-on: ubuntu-latest
    steps:
      - name: Call reminder endpoint
        run: |
          curl -X GET ${{ secrets.APP_URL }}/api/cron/reminders \\
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
\`\`\`

## Troubleshooting

### Reminders Not Sending

1. **Check cron execution**:
   - Verify cron jobs are running in Vercel dashboard
   - Check function logs for errors

2. **Verify CRON_SECRET**:
   - Ensure it's set in environment variables
   - Match the value used in Authorization header

3. **Check appointment data**:
   - Ensure appointments have `status: "confirmed"`
   - Verify `preferredDate` is in the future
   - Check `reminderSent` is false

4. **Notification issues**:
   - Verify email/WhatsApp credentials are configured
   - Check notification service logs

### Cron Job Not Running

1. **Vercel Plan**: Cron jobs require Hobby plan or higher
2. **Deployment**: Ensure latest code is deployed
3. **Configuration**: Verify `vercel.json` is in project root

## Best Practices

1. **Monitor regularly**: Check cron execution logs weekly
2. **Test before production**: Use test endpoints to verify functionality
3. **Set up alerts**: Configure Vercel notifications for cron failures
4. **Backup strategy**: Consider redundant cron services for critical reminders
5. **Time zones**: All times are in UTC; adjust schedules accordingly

## Cron Schedule Syntax

\`\`\`
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, Sunday = 0 or 7)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
\`\`\`

Examples:
- `*/5 * * * *` - Every 5 minutes
- `0 * * * *` - Every hour
- `0 2 * * *` - Daily at 2:00 AM
- `0 9 * * 1` - Every Monday at 9:00 AM
