import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryImage({ image, index, onImageClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 border-pink-200">
        <div className="relative">
          <img 
            src={image.url}
            alt={image.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div 
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            onClick={() => onImageClick(image)}
          >
            <Maximize2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <CardContent className="p-4">
          <p className="font-semibold text-gray-900">{image.title}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
