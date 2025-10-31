"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send } from "lucide-react"
import { toast } from "sonner"

export function NotificationTest() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    whatsappNumber: "",
  })

  const handleTest = async () => {
    if (!formData.email && !formData.whatsappNumber) {
      toast.error("Please provide at least email or WhatsApp number")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/notifications/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Test notifications sent successfully!")
      } else {
        toast.error("Failed to send test notifications")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Notifications</CardTitle>
        <CardDescription>Send test email and WhatsApp notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="test-email">Email Address</Label>
          <Input
            id="test-email"
            type="email"
            placeholder="test@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="test-whatsapp">WhatsApp Number (with country code)</Label>
          <Input
            id="test-whatsapp"
            type="tel"
            placeholder="+919876543210"
            value={formData.whatsappNumber}
            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
          />
        </div>
        <Button onClick={handleTest} disabled={loading} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Send Test Notifications
        </Button>
      </CardContent>
    </Card>
  )
}
