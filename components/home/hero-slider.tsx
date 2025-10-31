"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Slide {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  image: string
}

const slides: Slide[] = [
  {
    title: "Transform Your Smile with Expert Care",
    subtitle: "From unhealthy to healthy teeth - experience the magic of modern dentistry",
    buttonText: "Know Your Teeth",
    buttonLink: "#teeth-know",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-ADZ2yeM0N6lZHthVnUuAJOKrzwsIFS.png",
  },
  {
    title: "Professional Dental Examination",
    subtitle: "Advanced technology for comprehensive dental care and healthy smiles",
    buttonText: "Book Consultation",
    buttonLink: "/book-appointment",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%20%281%29-zGbOHEabZtcHCnmpsksJcR16zW76sm.png",
  },
  {
    title: "Expert Dental Solutions",
    subtitle: "Specialized care for all your dental needs with state-of-the-art equipment",
    buttonText: "Learn More",
    buttonLink: "/services",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-28%20091632-HdjJznNSSCFXmRhVbg4tGSyo3HBPLA.png",
  },
  {
    title: "Clear Aligners & Orthodontics",
    subtitle: "Achieve your perfect smile with invisible aligners and modern orthodontic solutions",
    buttonText: "Get Started",
    buttonLink: "/book-appointment",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-28%20091533-PYFsd1bvoE7N85ye7D4q00mdIPM9Nd.png",
  },
  {
    title: "Beautiful, Confident Smiles",
    subtitle: "Experience world-class cosmetic dentistry and smile transformation",
    buttonText: "Transform Your Smile",
    buttonLink: "/book-appointment",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-28%20091452-7B8wRifUfQnD7JmuW3ttwlQngHXY35.png",
  },
  {
    title: "Modern Achieve Your Desired Perfect Smile",
    subtitle: "Experience world-class dental care with state-of-the-art technology and expert specialists",
    buttonText: "Make an Appointment",
    buttonLink: "/book-appointment",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80",
  },
  {
    title: "Advanced Dental Implants & Full Mouth Rehabilitation",
    subtitle: "Restore your smile with cutting-edge implant technology and comprehensive care",
    buttonText: "Learn More",
    buttonLink: "/services",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1920&q=80",
  },
  {
    title: "20+ Years of Trusted Dental Excellence",
    subtitle: "Serving families in Vikhroli with compassionate, ethical, and advanced dental solutions",
    buttonText: "Book Consultation",
    buttonLink: "/book-appointment",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Changed from 5000ms to 4000ms
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority={currentSlide === 0}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-4 md:px-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">{slides[currentSlide].subtitle}</p>
            <Link href={slides[currentSlide].buttonLink}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-6">
                {slides[currentSlide].buttonText}
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}
