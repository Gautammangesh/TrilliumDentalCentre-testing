"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, CheckCircle, Clock } from "lucide-react"

export function CronStatus() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkStatus = async () => {
    setLoading(true)
    try {
      // This is a mock - in production, you'd track cron execution in the database
      setStatus({
        reminders: {
          lastRun: new Date().toISOString(),
          status: "success",
          processed: 5,
        },
        cleanup: {
          lastRun: new Date(Date.now() - 86400000).toISOString(),
          status: "success",
          deleted: 12,
        },
      })
    } catch (error) {
      console.error("Failed to check cron status:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Cron Job Status</CardTitle>
            <CardDescription>Automated task execution status</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={checkStatus} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Appointment Reminders</p>
              <p className="text-sm text-muted-foreground">Runs every 5 minutes</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium">Database Cleanup</p>
              <p className="text-sm text-muted-foreground">Runs daily at 2:00 AM</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Cron jobs are automatically managed by Vercel. Check the Vercel dashboard for
            detailed execution logs.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
