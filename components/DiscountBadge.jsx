"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function DiscountBadge() {
  return (
    <Link href="/appointment">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
        className="fixed right-4 md:right-8 bottom-4 md:bottom-8 z-40 cursor-pointer group"
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
          {/* Animated pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #FFD700, transparent)" }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Starburst image background with text overlay */}
          <div className="relative w-28 h-20 md:w-44 md:h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            {/* Background starburst image */}
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/ac26c97f2_Screenshot_2025-10-15_175924-removebg-preview.png"
              alt="Discount Badge"
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
              }}
            />

            {/* Text content on top */}
            <div className="relative text-center px-3 md:px-6 z-10">
              <div className="flex items-center justify-center mb-1 md:mb-2">
                <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-white animate-pulse" />
              </div>
              <div className="text-xl md:text-3xl font-black leading-none mb-0.5 md:mb-1 text-white">20%</div>
              <div className="text-[8px] md:text-xs font-bold uppercase leading-tight mb-0.5 md:mb-1 text-white">
                OFF
              </div>
              <div className="text-[7px] md:text-[10px] font-semibold text-white">Online Booking</div>
            </div>
          </div>

          {/* Decorative sparkles around */}
          <motion.div
            className="absolute bottom-4 md:bottom-6 left-1 md:left-2 w-2 h-2 md:w-3 md:h-3"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
          >
            <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-400" />
          </motion.div>

          <motion.div
            className="absolute top-6 md:top-10 left-0 w-2 h-2 md:w-3 md:h-3"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          >
            <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-400" />
          </motion.div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 pointer-events-none"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        />
      </motion.div>
    </Link>
  )
}
