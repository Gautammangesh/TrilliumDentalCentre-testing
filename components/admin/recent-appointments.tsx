"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentAppointments() {
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await fetch("/api/appointments?limit=5")
        const data = await res.json()
        setAppointments(data.data || [])
      } catch (error) {
        console.error("Failed to fetch appointments:", error)
      }
    }

    fetchAppointments()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div>
                <p className="font-medium">{appointment.patientName}</p>
                <p className="text-sm text-muted-foreground">{appointment.service}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(appointment.preferredDate), "MMM dd, yyyy")} at {appointment.preferredTime}
                </p>
              </div>
              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
