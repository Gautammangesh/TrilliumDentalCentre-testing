"use client"

import { motion } from "framer-motion"
import { doctorsData } from "@/lib/data/doctors"
import { DoctorCard } from "@/components/doctors/doctor-card"
import { BRAND_COLORS } from "@/lib/constants"

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: BRAND_COLORS.maroon }}>
              Meet Our Expert Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of highly qualified specialists brings decades of combined experience in providing world-class
              dental care. Each doctor is dedicated to delivering personalized treatment with compassion and expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctorsData.map((doctor, index) => (
              <DoctorCard
                key={doctor.id}
                name={doctor.name}
                specialty={doctor.specialty}
                description={doctor.description}
                image={doctor.image}
                social={doctor.social}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 text-white"
        style={{ background: `linear-gradient(to right, ${BRAND_COLORS.maroon}, #A0344A)` }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Meet Our Team?</h2>
            <p className="text-lg text-pink-100 mb-6">
              Book your consultation today and experience the difference expert care makes
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
