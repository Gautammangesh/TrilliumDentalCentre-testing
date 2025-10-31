import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialCard({ testimonial, index }) {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-pink-200 bg-white">
        <CardContent className="p-6">
          <Quote className="w-10 h-10 mb-4" style={{color: '#F4C2C2'}} />
          
          <div className="flex mb-4">
            {renderStars(testimonial.rating)}
          </div>

          <p className="text-gray-700 leading-relaxed mb-6 italic">
            "{testimonial.testimonial}"
          </p>

          <div className="border-t border-pink-100 pt-4">
            <p className="font-semibold" style={{color: '#8B2635'}}>
              {testimonial.patient_name}
            </p>
            {testimonial.treatment && (
              <p className="text-sm text-gray-600 mt-1">
                {testimonial.treatment}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
