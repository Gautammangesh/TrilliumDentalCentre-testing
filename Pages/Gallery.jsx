import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Maximize2, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import HeroSection from "../components/HeroSection";
import { galleryData, galleryCategories } from "../components/galleryData";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = activeCategory === "all" 
    ? galleryData 
    : galleryData.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(to bottom, white, #F4C2C2)'}}>
      <HeroSection 
        title="Our Gallery"
        subtitle="Witness the transformation - photos, videos, and our modern facility"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 bg-pink-100">
              {galleryCategories.map((category) => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value}
                  onClick={() => setActiveCategory(category.value)}
                  className="data-[state=active]:text-white transition-colors"
                  style={{backgroundColor: activeCategory === category.value ? '#8B2635' : 'transparent'}}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid md:grid-cols-3 gap-6">
              {filteredImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 border-pink-200">
                    {item.type === "video" ? (
                      <div className="relative">
                        <div className="relative pb-[56.25%]">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={item.url}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <Play className="w-5 h-5" style={{color: '#8B2635'}} />
                            <p className="font-semibold text-gray-900">{item.title}</p>
                          </div>
                        </CardContent>
                      </div>
                    ) : (
                      <div className="relative">
                        <img 
                          src={item.url}
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div 
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          onClick={() => setSelectedImage(item)}
                        >
                          <Maximize2 className="w-12 h-12 text-white" />
                        </div>
                        <CardContent className="p-4">
                          <p className="font-semibold text-gray-900">{item.title}</p>
                        </CardContent>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div>
              <img 
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center mt-4 text-lg font-semibold">{selectedImage.title}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
