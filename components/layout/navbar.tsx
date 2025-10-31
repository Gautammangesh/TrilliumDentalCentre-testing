"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Stethoscope, ImageIcon, MessageSquare, Phone, Menu, X, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BRAND_COLORS, CONTACT_INFO } from "@/lib/constants"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Services", path: "/services", icon: Stethoscope },
    { name: "Gallery", path: "/gallery", icon: ImageIcon },
    { name: "Testimonials", path: "/testimonials", icon: MessageSquare },
    { name: "Contact", path: "/contact", icon: Phone },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-800 to-rose-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-2 hover:text-pink-200 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {CONTACT_INFO.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {CONTACT_INFO.hours.weekdays}: {CONTACT_INFO.hours.time}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Left Side - Teeth Symbol Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/32cdbdb36_Screenshot_2025-10-04_081758-removebg-preview.png"
                alt="Trillium Dental Centre"
                className="h-12 md:h-16 lg:h-20 object-contain"
              />
            </Link>

            {/* Center - Tagline */}
            <div className="text-center flex-1 mx-2 md:mx-8">
              <h2 className="text-base md:text-2xl lg:text-3xl font-bold" style={{ color: BRAND_COLORS.maroon }}>
                Pathway to healthy smile...
              </h2>
              <p className="text-xs md:text-sm lg:text-base hidden sm:block" style={{ color: BRAND_COLORS.maroon }}>
                Transforming Smiles, Enhancing Confidence
              </p>
            </div>

            {/* Right Side - Flower Logo */}
            <div className="hidden md:block">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/b9f56f5e4_image.png"
                alt="Trillium Flower"
                className="h-12 md:h-16 lg:h-20 w-12 md:w-16 lg:w-20 object-contain"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-pink-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation Links - Below Header */}
          <div className="hidden lg:flex items-center justify-center gap-6 pb-4 border-t border-gray-100 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path) ? "text-white" : "text-gray-700 hover:bg-pink-50"
                }`}
                style={isActive(item.path) ? { backgroundColor: BRAND_COLORS.maroon } : {}}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            <Link href="/book-appointment">
              <Button className="hover:opacity-90 rounded-full" style={{ backgroundColor: BRAND_COLORS.maroon }}>
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2 border-t border-gray-100 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path) ? "text-white" : "text-gray-700 hover:bg-pink-50"
                  }`}
                  style={isActive(item.path) ? { backgroundColor: BRAND_COLORS.maroon } : {}}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              <Link href="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" style={{ backgroundColor: BRAND_COLORS.maroon }}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
