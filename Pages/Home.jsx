import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import AchievementCard from "../components/AchievementCard";
import { achievementsData } from "../components/achievementsData";

export default function Home() {
  const specialties = [
    "Full Mouth Rehabilitation",
    "Dental Implants",
    "Root Canal Treatment",
    "Orthodontic Care",
    "Teeth Whitening",
    "Digital Smile Designing"
  ];

  const whyChooseUsPoints = [
    {
      title: "State-of-the-Art Technology",
      description: "Latest dental equipment and advanced treatment methods"
    },
    {
      title: "Expert Multi-Specialist Team",
      description: "12+ experienced specialists across all dental fields"
    },
    {
      title: "Global Safety Standards",
      description: "World-class sterilization and infection control protocols"
    },
    {
      title: "Patient-Centered Care",
      description: "Personalized treatment plans with transparency and empathy"
    }
  ];

  return (
    <div>
      {/* Hero Section with Video */}
      <section className="relative overflow-hidden" style={{background: 'linear-gradient(135deg, #F4C2C2 0%, #FFF8E7 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{color: '#8B2635'}}>
                Your Path to a<br />
                <span className="text-green-700">Healthy Smile</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience premium dental care at Trillium Dental Centre - 
                a trusted healthcare provider for over 2 decades in Vikhroli, Mumbai.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl("BookAppointment")}>
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 font-semibold" style={{color: '#8B2635'}}>
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment - Get 20% OFF
                  </Button>
                </Link>
                <Link to={createPageUrl("Services")}>
                  <Button size="lg" variant="outline" className="border-2 hover:bg-white" style={{borderColor: '#8B2635', color: '#8B2635'}}>
                    Explore Services
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-4 border-2" style={{borderColor: '#F4C2C2'}}>
                <div className="relative pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/LJbounD5sXk"
                    title="Modern Dental Hospital Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16" style={{background: 'linear-gradient(to bottom, #FFF8E7, #F4C2C2)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievementsData.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview - MOVED ABOVE ABOUT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#8B2635'}}>
              Our Specialties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive dental solutions delivered by expert specialists
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {specialties.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-pink-200 h-full bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6" style={{color: '#8B2635'}} />
                      <h3 className="font-semibold text-gray-900">{service}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={createPageUrl("Services")}>
              <Button size="lg" className="hover:opacity-90" style={{backgroundColor: '#8B2635'}}>
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - NOW BELOW SERVICES */}
      <section className="py-20" style={{background: 'linear-gradient(to bottom, #F4C2C2, white)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#8B2635'}}>
                About Trillium Dental Centre
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We pride ourselves in bringing to you a modern, next-generation, 
                state-of-the-art dental care facility in Vikhroli. As a trusted 
                dental healthcare provider for about 2 decades, our mission is to 
                deliver patient-centered, advanced, and ethical care with empathy 
                and safety.
              </p>
              <div className="space-y-4">
                {[
                  "20+ years of trusted service",
                  "State-of-the-art facility with latest technology",
                  "Multi-specialist expert team",
                  "Global safety and sterilization standards",
                  "Hundreds of satisfied families"
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&q=80"
                alt="Modern Dental Clinic"
                className="rounded-2xl shadow-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80"
                alt="Dental Treatment"
                className="rounded-2xl shadow-lg h-48 w-full object-cover mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80"
                alt="Professional Dentist"
                className="rounded-2xl shadow-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80"
                alt="Dental Care"
                className="rounded-2xl shadow-lg h-48 w-full object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#8B2635'}}>
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600">
              Excellence in dental care with cutting-edge technology
            </p>
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
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #F4C2C2, #FFC0CB)'}}>
                      <CheckCircle className="w-8 h-8" style={{color: '#8B2635'}} />
                    </div>
                    <h3 className="font-bold mb-2" style={{color: '#8B2635'}}>{point.title}</h3>
                    <p className="text-sm text-gray-600">{point.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white" style={{background: 'linear-gradient(to right, #8B2635, #A0344A)'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Book Your Consultation Today
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              Take the first step towards your dream smile. Get 20% OFF with online payment!
            </p>
            <Link to={createPageUrl("BookAppointment")}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 font-semibold text-lg px-8" style={{color: '#8B2635'}}>
                <Calendar className="w-5 h-5 mr-2" />
                Book Now & Save 20%
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
