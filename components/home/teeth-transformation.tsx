"use client"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BRAND_COLORS } from "@/lib/constants"
import Link from "next/link"

export function TeethTransformation() {
  return (
    <div className="text-center">
      <Card className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-blue-50 border-2 border-pink-200 p-4 md:p-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video on Left */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hailuo_Video_teeth%20transformation%20damage%20to_439429250409934849-CtMojHVNwdXRpdsFQan6rXHvyWRmt1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Text and Button on Right */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold"
              style={{ color: BRAND_COLORS.maroon }}
            >
              Know Your Teeth
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-center max-w-md"
            >
              Discover comprehensive dental care solutions tailored to your unique needs. Transform your smile with our
              expert team.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Link href="/services">
                <Button
                  size="lg"
                  className="text-white font-semibold px-8 py-6 text-lg"
                  style={{ backgroundColor: BRAND_COLORS.maroon }}
                >
                  Explore Our Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Card>
    </div>
  )
}
