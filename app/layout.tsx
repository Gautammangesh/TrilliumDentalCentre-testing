import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { TrilliumSymbol } from "@/components/shared/trillium-symbol"
import DiscountBadge from "@/components/DiscountBadge"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trillium Dental Centre - Pathway to Healthy Smile",
  description:
    "Premium dental care in Vikhroli, Mumbai. 20+ years of excellence with expert specialists and state-of-the-art technology.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
          <Navbar />
          <main>{children}</main>
          <TrilliumSymbol />
          <Footer />
        </div>
        <DiscountBadge />
        <Analytics />
      </body>
    </html>
  )
}
