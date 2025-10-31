import type React from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader user={session.user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
