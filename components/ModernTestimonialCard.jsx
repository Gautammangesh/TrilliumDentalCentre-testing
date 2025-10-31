import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function ModernTestimonialCard({ testimonial, index }) {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
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
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-none bg-white rounded-2xl">
        {testimonial.image_url && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={testimonial.image_url}
              alt={testimonial.patient_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          </div>
        )}
        
        <CardContent className="p-6">
          <Quote className="w-8 h-8 mb-3 opacity-20" style={{color: '#8B2635'}} />
          
          <p className="text-gray-700 leading-relaxed mb-4 italic line-clamp-4">
            "{testimonial.testimonial}"
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{background: 'linear-gradient(135deg, #8B2635, #A0344A)'}}>
              {testimonial.patient_name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{testimonial.patient_name}</p>
              {testimonial.treatment && (
                <p className="text-sm text-gray-500">{testimonial.treatment}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
