"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Users, Clock, Star } from "lucide-react"
import { BRAND_COLORS } from "@/lib/constants"

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView])

  return <div ref={ref}>{count}</div>
}

export function Achievements() {
  const achievements = [
    {
      icon: Award,
      value: 20,
      suffix: "+",
      label: "Years of Excellence",
    },
    {
      icon: Users,
      value: 10000,
      suffix: "+",
      label: "Happy Patients",
    },
    {
      icon: Clock,
      value: 15000,
      suffix: "+",
      label: "Successful Treatments",
    },
    {
      icon: Star,
      value: 14,
      suffix: "+",
      label: "Expert Specialists",
    },
  ]

  return (
    <div
      className="py-16 px-4"
      style={{ background: `linear-gradient(135deg, ${BRAND_COLORS.maroon} 0%, #A0344A 100%)` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter end={achievement.value} />
                  {achievement.suffix}
                </div>
                <p className="text-pink-100 text-sm md:text-base">{achievement.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
