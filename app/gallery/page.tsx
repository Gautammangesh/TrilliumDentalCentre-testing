"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Maximize2, Play } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { HeroSection } from "@/components/shared/hero-section"
import { BRAND_COLORS } from "@/lib/constants"

const galleryData = [
  {
    category: "clinic",
    url: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80",
    title: "Modern Dental Clinic",
    type: "image",
  },
  {
    category: "clinic",
    url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    title: "Professional Dental Care",
    type: "image",
  },
  {
    category: "clinic",
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    title: "State-of-the-Art Equipment",
    type: "image",
  },
  {
    category: "clinic",
    url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
    title: "Advanced Dental Technology",
    type: "image",
  },
  {
    category: "clinic",
    type: "video",
    url: "https://www.youtube.com/embed/JtC01miQZZc",
    title: "Clinic Tour Video",
  },
  {
    category: "treatments",
    url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    title: "Dental Checkup",
    type: "image",
  },
  {
    category: "treatments",
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    title: "Professional Teeth Cleaning",
    type: "image",
  },
  {
    category: "treatments",
    type: "video",
    url: "https://www.youtube.com/embed/v1s8rVqCndo",
    title: "Dental Implant Procedure",
  },
  {
    category: "results",
    url: "https://images.unsplash.com/photo-1609552082958-03f43dd8e5d2?w=800&q=80",
    title: "Beautiful Smile Results",
    type: "image",
  },
  {
    category: "results",
    type: "video",
    url: "https://www.youtube.com/embed/H5iGElOC_74",
    title: "Patient Testimonial",
  },
]

const galleryCategories = [
  { value: "all", label: "All Photos" },
  { value: "clinic", label: "Our Clinic" },
  { value: "treatments", label: "Treatments" },
  { value: "results", label: "Results" },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredImages =
    activeCategory === "all" ? galleryData : galleryData.filter((img) => img.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
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
                  style={{ backgroundColor: activeCategory === category.value ? BRAND_COLORS.maroon : "transparent" }}
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
                            <Play className="w-5 h-5" style={{ color: BRAND_COLORS.maroon }} />
                            <p className="font-semibold text-gray-900">{item.title}</p>
                          </div>
                        </CardContent>
                      </div>
                    ) : (
                      <div className="relative">
                        <img
                          src={item.url || "/placeholder.svg"}
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
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center mt-4 text-lg font-semibold">{selectedImage.title}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
