import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentAppointments } from "@/components/admin/recent-appointments"
import { AvailabilityCalendar } from "@/components/admin/availability-calendar"

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session.user?.name}</p>
      </div>

      <DashboardStats />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentAppointments />
        <AvailabilityCalendar />
      </div>
    </div>
  )
}
