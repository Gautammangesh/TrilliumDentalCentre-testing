"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/shared/hero-section"
import { BRAND_COLORS, CONTACT_INFO } from "@/lib/constants"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <HeroSection
        title="Contact Us"
        subtitle="Get in touch with our team for any queries or to schedule an appointment"
      />

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3" style={{ color: BRAND_COLORS.maroon }}>
                    <MapPin className="w-6 h-6" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {CONTACT_INFO.address.line1}
                    <br />
                    {CONTACT_INFO.address.line2}
                    <br />
                    {CONTACT_INFO.address.area}
                    <br />
                    {CONTACT_INFO.address.city}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3" style={{ color: BRAND_COLORS.maroon }}>
                    <Phone className="w-6 h-6" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-lg font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: BRAND_COLORS.maroon }}
                  >
                    {CONTACT_INFO.phone}
                  </a>
                  <p className="text-sm text-gray-600 mt-2">Also available on WhatsApp</p>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3" style={{ color: BRAND_COLORS.maroon }}>
                    <Clock className="w-6 h-6" />
                    Opening Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">{CONTACT_INFO.hours.weekdays}</span>
                      <span className="font-semibold" style={{ color: BRAND_COLORS.maroon }}>
                        {CONTACT_INFO.hours.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sunday</span>
                      <span className="font-semibold text-gray-500">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3" style={{ color: BRAND_COLORS.maroon }}>
                    <Mail className="w-6 h-6" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-gray-700">Instagram: @trillium_dental_centre</p>
                    <p className="text-gray-700">Facebook: Trillium Dental</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle style={{ color: BRAND_COLORS.maroon }}>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                      <Textarea
                        placeholder="Your Message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full hover:opacity-90"
                        style={{ backgroundColor: BRAND_COLORS.maroon }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: BRAND_COLORS.maroon }}>
            Find Us Here
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.3087878493575!2d72.92506337937029!3d19.110425735950578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7ebaaaaaaab%3A0xadaf4d1e75607435!2sTrillium%20Dental%20Clinic!5e1!3m2!1sen!2sin!4v1761573114195!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>
        </div>
      </section>
    </div>
  )
}
