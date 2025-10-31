import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import ModernServiceCard from "../components/ModernServiceCard";
import { servicesData, whyChooseUsData } from "../components/servicesData";

export default function Services() {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#8B2635'}}>
              Advanced Dental Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience world-class dental care with our comprehensive range of services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ModernServiceCard key={index} service={service} index={index} />
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#8B2635'}}>
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
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{backgroundColor: '#8B2635'}}>
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
  );
}
