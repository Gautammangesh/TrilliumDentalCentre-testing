"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Clock, Send, User, Calendar, ClockIcon, PhoneCall } from "lucide-react"
import { CONTACT_INFO, SERVICES } from "@/lib/constants"

export function InfoCards() {
  const [formData, setFormData] = useState({
    department: "",
    name: "",
    email: "",
    date: "",
    time: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Quick appointment form submitted:", formData)
    // Handle form submission
  }

  return (
    <div className="relative -mt-32 z-10 max-w-7xl mx-auto px-4">
      <div className="grid md:grid-cols-12 gap-0 rounded-2xl overflow-hidden shadow-2xl">
        {/* Emergency Cases - Smaller width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-3 bg-cyan-500 p-8 text-white"
        >
          <div className="flex items-center gap-3 mb-6">
            <Phone className="w-7 h-7" />
            <h3 className="text-2xl font-bold">Emergency Cases</h3>
          </div>
          <p className="text-white/95 mb-6 leading-relaxed">
            We provide 24/7 emergency dental care. Call us immediately for urgent dental issues.
          </p>
          <a href={`tel:${CONTACT_INFO.phone}`} className="text-2xl font-bold hover:underline inline-block">
            {CONTACT_INFO.phone}
          </a>
        </motion.div>

        {/* Opening Hours - Smaller width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-3 bg-cyan-400 p-8 text-white"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-7 h-7" />
            <h3 className="text-2xl font-bold">Opening Hours</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg">Monday - Friday</span>
              <span className="font-bold text-lg">8:00 - 19:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">Saturday</span>
              <span className="font-bold text-lg">10:00 - 17:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg">Sunday</span>
              <span className="font-bold text-lg">Closed</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Appointment Form - Larger width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-6 bg-blue-600 p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6">Make an Appointment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Department */}
              <div className="relative">
                <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger className="bg-blue-500/50 border-white/30 text-white placeholder:text-white/70 h-12 pl-4">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.slice(0, 8).map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                  <User className="w-5 h-5" />
                </div>
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-blue-500/50 border-white/30 text-white placeholder:text-white/70 h-12 pl-10"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                  <Send className="w-5 h-5" />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-blue-500/50 border-white/30 text-white placeholder:text-white/70 h-12 pl-10"
                />
              </div>

              {/* Date */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                  <Calendar className="w-5 h-5" />
                </div>
                <Input
                  type="date"
                  placeholder="Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-blue-500/50 border-white/30 text-white placeholder:text-white/70 h-12 pl-10"
                />
              </div>

              {/* Time */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <Input
                  type="time"
                  placeholder="Time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="bg-blue-500/50 border-white/30 text-white placeholder:text-white/70 h-12 pl-10"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-blue-500/50 border-white/30 text-white placeholder:text-white/70 h-12 pl-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full md:w-auto bg-white/20 hover:bg-white/30 text-white font-semibold h-12 px-8 border border-white/30"
            >
              Make an Appointment
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
