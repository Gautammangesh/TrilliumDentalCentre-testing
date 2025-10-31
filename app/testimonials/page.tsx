"use client"

import { Quote, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSection } from "@/components/shared/hero-section"
import { BRAND_COLORS } from "@/lib/constants"

// Mock testimonials data - replace with actual API call later
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    comment:
      "Excellent service! Dr. Pooja and her team transformed my smile completely. The full mouth rehabilitation was painless and the results are amazing.",
    service: "Full Mouth Rehabilitation",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 5,
    comment:
      "Best dental clinic in Mumbai! Got my dental implants done here. The 3D CBCT scan made the whole process so precise. Highly recommend!",
    service: "Dental Implants",
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Anita Desai",
    rating: 5,
    comment:
      "My daughter was scared of dentists, but Dr. Sneha made her so comfortable. The pediatric care here is exceptional!",
    service: "Pediatric Dentistry",
    date: "2024-01-05",
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <HeroSection title="Patient Testimonials" subtitle="Real stories from our satisfied patients across India" />

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND_COLORS.maroon }}>
              Loyal Customers Across India
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hundreds of families trust us with their dental care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-pink-200 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <Quote className="w-10 h-10 mb-4" style={{ color: BRAND_COLORS.lightPink }} />
                    <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.comment}</p>
                    <div className="flex items-center gap-1 mb-3">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <div className="border-t border-pink-100 pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.service}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "20+", label: "Years of Excellence" },
              { value: "100s", label: "Happy Families" },
              { value: "12+", label: "Expert Specialists" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-white"
              >
                <div className="text-5xl font-bold mb-2" style={{ color: BRAND_COLORS.maroon }}>
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
