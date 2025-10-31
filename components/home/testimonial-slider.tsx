"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { BRAND_COLORS } from "@/lib/constants"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Full Mouth Rehabilitation Patient",
    comment:
      "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Dental Implant Patient",
    comment:
      "Best dental clinic in Mumbai! Got my dental implants done here. The 3D CBCT scan made the whole process so precise. The team is professional and caring. Highly recommend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Anita Desai",
    role: "Pediatric Dentistry Patient",
    comment:
      "My daughter was scared of dentists, but Dr. Sneha made her so comfortable. The pediatric care here is exceptional! The staff is patient and understanding with children.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Vikram Patel",
    role: "Orthodontic Treatment Patient",
    comment:
      "The orthodontic treatment transformed my smile completely. The clear aligners were comfortable and the results exceeded my expectations. Thank you Trillium Dental!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Meera Reddy",
    role: "Root Canal Treatment Patient",
    comment:
      "I was nervous about getting a root canal, but Dr. Tarun made it completely painless. The microscope technology they use is amazing. No pain at all during or after!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: BRAND_COLORS.maroon }}>
            Testimony
          </h2>
          <p className="text-lg text-gray-600">Our Happy Customer Says</p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-xl transition-all duration-300 -ml-6"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-xl transition-all duration-300 -mr-6"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Content */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                {/* Profile Image with Quote Badge */}
                <div className="relative inline-block mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-white shadow-xl">
                    <img
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Quote Badge */}
                  <div
                    className="absolute bottom-0 right-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: BRAND_COLORS.maroon }}
                  >
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="max-w-3xl mx-auto mb-8 px-4">
                  <p className="text-gray-600 text-lg leading-relaxed">{testimonials[currentIndex].comment}</p>
                </div>

                {/* Name and Role */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Diamond Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group focus:outline-none"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div
                  className={`w-3 h-3 rotate-45 transition-all duration-300 ${
                    index === currentIndex ? "scale-125" : "bg-gray-300 group-hover:bg-gray-400"
                  }`}
                  style={{
                    backgroundColor: index === currentIndex ? BRAND_COLORS.maroon : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
