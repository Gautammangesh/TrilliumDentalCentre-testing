"use client"

import { motion } from "framer-motion"
import { servicesData, whyChooseUsData } from "@/lib/data/services"
import { HeroSection } from "@/components/shared/hero-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BRAND_COLORS } from "@/lib/constants"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Our Dental Services"
        subtitle="Comprehensive dental care delivered by expert specialists using state-of-the-art technology"
      />

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND_COLORS.maroon }}>
              Advanced Dental Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience world-class dental care with our comprehensive range of services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-pink-100">
                    <CardContent className="p-6">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: BRAND_COLORS.lightPink }}
                      >
                        <IconComponent className="w-7 h-7" style={{ color: BRAND_COLORS.maroon }} />
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: BRAND_COLORS.maroon }}>
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      {service.specialists && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Specialists:</p>
                          {service.specialists.map((specialist, idx) => (
                            <Badge key={idx} variant="secondary" className="mr-2 mb-2">
                              {specialist}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {service.features && (
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-green-600 mt-0.5">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND_COLORS.maroon }}>
              Why Choose Trillium?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Excellence in dental care with commitment to your wellbeing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsData.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-pink-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: BRAND_COLORS.maroon }}
                  >
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">{reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
