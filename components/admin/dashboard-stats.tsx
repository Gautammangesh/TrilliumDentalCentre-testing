"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react"

export function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const [totalRes, pendingRes, confirmedRes, cancelledRes] = await Promise.all([
          fetch("/api/appointments"),
          fetch("/api/appointments?status=pending"),
          fetch("/api/appointments?status=confirmed"),
          fetch("/api/appointments?status=cancelled"),
        ])

        const [total, pending, confirmed, cancelled] = await Promise.all([
          totalRes.json(),
          pendingRes.json(),
          confirmedRes.json(),
          cancelledRes.json(),
        ])

        setStats({
          total: total.pagination?.total || 0,
          pending: pending.pagination?.total || 0,
          confirmed: confirmed.pagination?.total || 0,
          cancelled: cancelled.pagination?.total || 0,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Appointments",
      value: stats.total,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Confirmed",
      value: stats.confirmed,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
