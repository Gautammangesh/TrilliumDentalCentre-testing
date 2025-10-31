"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { BRAND_COLORS } from "@/lib/constants"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-20" style={{ background: `linear-gradient(to bottom, ${BRAND_COLORS.pink}, white)` }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: BRAND_COLORS.maroon }}>
              About Trillium Dental Centre
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We pride ourselves in bringing to you a modern, next-generation, state-of-the-art dental care facility in
              Vikhroli. As a trusted dental healthcare provider for about 2 decades, our mission is to deliver
              patient-centered, advanced, and ethical care with empathy and safety.
            </p>
            <div className="space-y-4">
              {[
                "20+ years of trusted service",
                "State-of-the-art facility with latest technology",
                "Multi-specialist expert team",
                "Global safety and sterilization standards",
                "Hundreds of satisfied families",
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] md:h-[600px]"
          >
            {/* Top left image */}
            <div className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 rounded-2xl overflow-hidden shadow-xl z-10">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop"
                alt="Modern dental clinic reception"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top right image - overlapping */}
            <div className="absolute top-12 right-0 w-56 md:w-72 h-40 md:h-52 rounded-2xl overflow-hidden shadow-xl z-20">
              <Image
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop"
                alt="Advanced dental equipment"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom left image - large and overlapping */}
            <div className="absolute bottom-12 left-8 w-64 md:w-80 h-56 md:h-72 rounded-2xl overflow-hidden shadow-xl z-30">
              <Image
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop"
                alt="Professional dental team"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom right image - small accent */}
            <div className="absolute bottom-0 right-4 w-40 md:w-52 h-40 md:h-52 rounded-2xl overflow-hidden shadow-xl z-20">
              <Image
                src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=400&fit=crop"
                alt="Patient receiving dental care"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
