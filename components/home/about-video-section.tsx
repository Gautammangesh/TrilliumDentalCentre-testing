"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { BRAND_COLORS } from "@/lib/constants"

export function AboutVideoSection() {
  const [showVideo, setShowVideo] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start timer when section is visible
            const timer = setTimeout(() => {
              setShowVideo(true)
            }, 3000) // 3 seconds delay

            return () => clearTimeout(timer)
          }
        })
      },
      { threshold: 0.5 }, // Trigger when 50% of section is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20"
      style={{ background: `linear-gradient(to bottom, ${BRAND_COLORS.pink}, white)` }}
    >
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
            className="relative"
          >
            {showVideo ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dhvfahvcv&public_id=Welcome_to_our_newly_modernised_Dental_Care_facility_e6syjg&profile=cld-default&autoplay=true"
                  width="100%"
                  height="400"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                />
              </motion.div>
            ) : (
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gray-200 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-pulse text-gray-500">Loading video...</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
