"use client"

import { motion } from "framer-motion"
import { Twitter, Facebook, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { BRAND_COLORS } from "@/lib/constants"

interface DoctorCardProps {
  name: string
  specialty: string
  description: string
  image: string
  social: {
    twitter: string
    facebook: string
    instagram: string
    google: string
  }
  index: number
}

export function DoctorCard({ name, specialty, description, image, social, index }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -15,
        scale: 1.05,
        zIndex: 10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="cursor-pointer"
    >
      <Card className="bg-white hover:shadow-2xl transition-all duration-300 h-full">
        <CardContent className="p-8 text-center flex flex-col h-full">
          {/* Circular Image */}
          <div className="mb-6">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
              <img
                src={
                  image ||
                  `/placeholder.svg?height=192&width=192&query=professional ${specialty.toLowerCase() || "/placeholder.svg"} dentist portrait`
                }
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>

          {/* Specialty */}
          <p className="text-lg mb-4" style={{ color: BRAND_COLORS.maroon }}>
            {specialty}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

          <div className="flex justify-center items-center gap-4 mt-auto">
            <a
              href={social.twitter}
              className="text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={social.facebook}
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={social.instagram}
              className="text-gray-400 hover:text-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a href={social.google} className="text-gray-400 hover:text-red-600 transition-colors" aria-label="Google">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
