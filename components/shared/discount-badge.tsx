"use client"
import { motion } from "framer-motion"

export function DiscountBadge() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50"
    >
      {/* Sparkles */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <div className="absolute -top-2 -left-2 text-yellow-400 text-xl">✨</div>
        <div className="absolute -top-3 -right-3 text-yellow-300 text-sm">✨</div>
        <div className="absolute -bottom-2 -left-3 text-yellow-300 text-sm">✨</div>
      </motion.div>

      {/* Badge */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="relative bg-red-600 rounded-full shadow-2xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center cursor-pointer"
        style={{
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
      >
        <div className="flex flex-col items-center gap-0.5 text-white">
          <div className="text-2xl md:text-4xl font-bold leading-none">20%</div>
          <div className="text-xs md:text-sm font-bold leading-none">OFF</div>
          <div className="text-[10px] md:text-xs text-center leading-tight mt-0.5">Online Booking</div>
        </div>
      </motion.div>
    </motion.div>
  )
}
