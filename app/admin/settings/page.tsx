import { NotificationTest } from "@/components/admin/notification-test"
import { CronStatus } from "@/components/admin/cron-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and test integrations</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure email and WhatsApp notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    {process.env.RESEND_API_KEY || process.env.SMTP_USER ? "Configured ✓" : "Not configured"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">WhatsApp Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    {process.env.WHATSAPP_ACCESS_TOKEN ? "Configured ✓" : "Not configured"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <CronStatus />

        <NotificationTest />
      </div>
    </div>
  )
}
