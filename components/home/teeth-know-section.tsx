"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TeethTransformation } from "./teeth-transformation"
import { DentalChatbot } from "./dental-chatbot"
import { BRAND_COLORS } from "@/lib/constants"

export function TeethKnowSection() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND_COLORS.blue }}>
              See The Transformation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Witness the amazing results our expert dental care can achieve for your smile
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TeethTransformation />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <Button
              size="lg"
              onClick={() => setIsChatbotOpen(true)}
              className="text-white font-semibold text-lg px-8 hover:shadow-xl transition-all"
              style={{ backgroundColor: BRAND_COLORS.maroon }}
            >
              Know Your Teeth
            </Button>
          </motion.div>
        </div>
      </section>

      <DentalChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  )
}
