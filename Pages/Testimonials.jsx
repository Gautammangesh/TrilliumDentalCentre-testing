import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "../components/HeroSection";
import ModernTestimonialCard from "../components/ModernTestimonialCard";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => base44.entities.Testimonial.list("-created_date"),
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <HeroSection 
        title="Patient Testimonials"
        subtitle="Real stories from our satisfied patients across India"
      />

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#8B2635'}}>
              Loyal Customers Across India
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hundreds of families trust us with their dental care
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <Card key={index} className="border-none rounded-2xl">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16">
              <Quote className="w-16 h-16 mx-auto mb-4" style={{color: '#F4C2C2'}} />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No testimonials yet
              </h3>
              <p className="text-gray-500">
                Be the first to share your experience with Trillium Dental Centre
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <ModernTestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "20+", label: "Years of Excellence" },
              { value: "100s", label: "Happy Families" },
              { value: "12+", label: "Expert Specialists" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-white"
              >
                <div className="text-5xl font-bold mb-2" style={{color: '#8B2635'}}>{stat.value}</div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
