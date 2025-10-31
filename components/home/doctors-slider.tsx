"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DoctorCard } from "@/components/doctors/doctor-card"
import { doctorsData } from "@/lib/data/doctors"
import { Button } from "@/components/ui/button"

export function DoctorsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % doctorsData.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % doctorsData.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + doctorsData.length) % doctorsData.length)
  }

  // Calculate visible doctors (show 3 at a time on desktop)
  const getVisibleDoctors = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(doctorsData[(currentIndex + i) % doctorsData.length])
    }
    return visible
  }

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Desktop view - show 3 cards in slider */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-8">
          {getVisibleDoctors().map((doctor, index) => (
            <DoctorCard
              key={`${doctor.id}-${currentIndex}-${index}`}
              name={doctor.name}
              specialty={doctor.specialty}
              description={doctor.description}
              image={doctor.image}
              social={doctor.social}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Mobile/Tablet view - show 1 card */}
      <div className="lg:hidden">
        <DoctorCard
          name={doctorsData[currentIndex].name}
          specialty={doctorsData[currentIndex].specialty}
          description={doctorsData[currentIndex].description}
          image={doctorsData[currentIndex].image}
          social={doctorsData[currentIndex].social}
          index={0}
        />
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white shadow-lg z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white shadow-lg z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {doctorsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to doctor ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
