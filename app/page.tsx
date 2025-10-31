"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { achievementsData } from "@/lib/data/achievements"
import { doctorsData } from "@/lib/data/doctors"
import { BRAND_COLORS } from "@/lib/constants"
import { HeroSlider } from "@/components/home/hero-slider"
import { TestimonialSlider } from "@/components/home/testimonial-slider"
import { DoctorsSlider } from "@/components/home/doctors-slider"
import { AboutSection } from "@/components/home/about-section"
import { TeethKnowSection } from "@/components/home/teeth-know-section"

export default function Home() {
  const featuredDoctors = doctorsData.slice(0, 4)

  const whyChooseUsPoints = [
    {
      title: "State-of-the-Art Technology",
      description: "Latest dental equipment and advanced treatment methods",
    },
    {
      title: "Expert Multi-Specialist Team",
      description: "12+ experienced specialists across all dental fields",
    },
    {
      title: "Global Safety Standards",
      description: "World-class sterilization and infection control protocols",
    },
    {
      title: "Patient-Centered Care",
      description: "Personalized treatment plans with transparency and empathy",
    },
  ]

  return (
    <div>
      {/* Discount Badge */}

      <HeroSlider />

      {/* Achievements */}
      <section
        className="py-16 mt-16"
        style={{ background: `linear-gradient(to bottom, ${BRAND_COLORS.cream}, ${BRAND_COLORS.pink})` }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievementsData.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg"
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <div className="text-3xl font-bold mb-2" style={{ color: BRAND_COLORS.maroon }}>
                  {achievement.number}
                </div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TeethKnowSection moved to be just above Meet Our Experience Dentist section */}
      <TeethKnowSection />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND_COLORS.blue }}>
              Meet Our Experience Dentist
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a
              paradisematic country, in which roasted parts of sentences
            </p>
          </motion.div>

          <div className="mb-12">
            <DoctorsSlider />
          </div>

          <div className="text-center">
            <Link href="/doctors">
              <Button size="lg" className="hover:opacity-90" style={{ backgroundColor: BRAND_COLORS.blue }}>
                View All Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Slider - now with auto-slide */}
      <TestimonialSlider />

      <AboutSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND_COLORS.maroon }}>
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600">Excellence in dental care with cutting-edge technology</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-pink-200 bg-white">
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${BRAND_COLORS.pink}, #FFC0CB)` }}
                    >
                      <CheckCircle className="w-8 h-8" style={{ color: BRAND_COLORS.maroon }} />
                    </div>
                    <h3 className="font-bold mb-2" style={{ color: BRAND_COLORS.maroon }}>
                      {point.title}
                    </h3>
                    <p className="text-sm text-gray-600">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-white"
        style={{ background: `linear-gradient(to right, ${BRAND_COLORS.maroon}, #A0344A)` }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Book Your Consultation Today</h2>
            <p className="text-xl text-pink-100 mb-8">
              Take the first step towards your dream smile. Get 20% OFF with online payment!
            </p>
            <Link href="/book-appointment">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 font-semibold text-lg px-8"
                style={{ color: BRAND_COLORS.maroon }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Now & Save 20%
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
