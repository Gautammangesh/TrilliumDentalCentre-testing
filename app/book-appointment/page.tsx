"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Percent, MessageCircle, PhoneIcon, Mail, CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/shared/hero-section"
import { BRAND_COLORS } from "@/lib/constants"

const services = [
  "Full Mouth Rehabilitation",
  "Dental Implants",
  "Root Canal Treatment",
  "Orthodontic Care (Braces/Invisalign)",
  "Teeth Whitening",
  "Digital Smile Designing",
  "Gum Treatment (Periodontics)",
  "Pediatric Dentistry",
  "Dentures",
  "Crowns, Inlays & Onlays",
  "Porcelain Veneers",
  "Oral Surgery",
  "TMJ Dysfunction Therapy",
  "Tobacco Cessation Therapy",
  "Emergency Dental Care",
  "Preventive Checkup",
  "Other",
]

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
]

export default function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    patient_name: "",
    email: "",
    phone: "",
    service: "",
    preferred_date: "",
    preferred_time: "",
    message: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual appointment booking with API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setBookingComplete(true)
    setIsSubmitting(false)
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-pink-50">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="max-w-lg border-pink-200 shadow-2xl">
            <CardContent className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for choosing Trillium Dental Centre. We've received your appointment request.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                <h3 className="font-semibold text-gray-700 mb-3">Notifications Sent:</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <Mail className="w-4 h-4" />
                  <span>Email ✓</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp ✓</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <PhoneIcon className="w-4 h-4" />
                  <span>SMS ✓</span>
                </div>
              </div>

              {paymentMethod === "online" && (
                <Badge className="bg-green-100 text-green-800 text-base px-4 py-2 mb-6">
                  <Percent className="w-4 h-4 mr-2" />
                  20% Discount Applied!
                </Badge>
              )}
              <Button onClick={() => (window.location.href = "/")} style={{ backgroundColor: BRAND_COLORS.maroon }}>
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <HeroSection title="Book Your Appointment" subtitle="Schedule your visit and get 20% OFF with online payment" />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8 text-center">
            <Badge className="bg-yellow-100 text-yellow-800 text-lg px-6 py-3">
              <Percent className="w-5 h-5 mr-2" />
              Special Offer: 20% OFF with Online Payment!
            </Badge>
          </div>

          <Card className="border-pink-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3" style={{ color: BRAND_COLORS.maroon }}>
                <Calendar className="w-7 h-7" />
                Appointment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.patient_name}
                      onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (WhatsApp) *</label>
                    <Input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">We'll send confirmation via WhatsApp & SMS</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service *</label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                    <Input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                    <Select
                      value={formData.preferred_time}
                      onValueChange={(value) => setFormData({ ...formData, preferred_time: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message (Optional)</label>
                  <Textarea
                    placeholder="Any specific concerns or requirements?"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Payment Method */}
                <div className="border-t border-pink-200 pt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method *</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "online" ? "border-2 bg-pink-50" : "border hover:border-pink-300"
                      }`}
                      style={paymentMethod === "online" ? { borderColor: BRAND_COLORS.maroon } : {}}
                      onClick={() => setPaymentMethod("online")}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <CreditCard className="w-6 h-6" style={{ color: BRAND_COLORS.maroon }} />
                          <h3 className="font-semibold text-gray-900">Online Payment</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Pay now and get instant confirmation</p>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Percent className="w-3 h-3 mr-1" />
                          Save 20%
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "clinic" ? "border-2 bg-pink-50" : "border hover:border-pink-300"
                      }`}
                      style={paymentMethod === "clinic" ? { borderColor: BRAND_COLORS.maroon } : {}}
                      onClick={() => setPaymentMethod("clinic")}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-6 h-6" style={{ color: BRAND_COLORS.maroon }} />
                          <h3 className="font-semibold text-gray-900">Pay at Clinic</h3>
                        </div>
                        <p className="text-sm text-gray-600">Pay when you visit us</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full hover:opacity-90 text-lg py-6 text-white"
                  style={{ backgroundColor: BRAND_COLORS.maroon }}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Booking..."
                    : paymentMethod === "online"
                      ? "Proceed to Payment"
                      : "Confirm Appointment"}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Email, WhatsApp & SMS confirmation will be sent automatically
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
