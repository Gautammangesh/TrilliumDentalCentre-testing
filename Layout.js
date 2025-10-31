import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, Stethoscope, Image, MessageSquare, 
  Phone, Menu, X, Calendar, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HelpButton from "./components/HelpButton";
import DiscountBadge from "./components/DiscountBadge";

export default function Layout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Home", path: createPageUrl("Home"), icon: Home },
    { name: "Services", path: createPageUrl("Services"), icon: Stethoscope },
    { name: "Gallery", path: createPageUrl("Gallery"), icon: Image },
    { name: "Testimonials", path: createPageUrl("Testimonials"), icon: MessageSquare },
    { name: "Contact", path: createPageUrl("Contact"), icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <style>{`
        :root {
          --trillium-maroon: #8B2635;
          --trillium-pink: #F4C2C2;
          --trillium-cream: #FFF8E7;
          --trillium-green: #4A7C59;
        }
      `}</style>

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink-800 to-rose-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+919136729121" className="flex items-center gap-2 hover:text-pink-200 transition-colors">
              <Phone className="w-4 h-4" />
              +91 9136729121
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Mon-Sat: 8:00 AM - 9:00 PM</span>
          </div>
        </div>
      </div>

      {/* Navigation - New Design */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Left Side - Teeth Symbol Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/32cdbdb36_Screenshot_2025-10-04_081758-removebg-preview.png" 
                alt="Trillium Dental Centre"
                className="h-12 md:h-16 lg:h-20 object-contain"
              />
            </Link>

            {/* Center - Tagline - NOW VISIBLE ON MOBILE */}
            <div className="text-center flex-1 mx-2 md:mx-8">
              <h2 className="text-base md:text-2xl lg:text-3xl font-bold" style={{color: '#8B2635'}}>
                Pathway to healthy smile...
              </h2>
              <p className="text-xs md:text-sm lg:text-base hidden sm:block" style={{color: '#8B2635'}}>
                Transforming Smiles, Enhancing Confidence
              </p>
            </div>

            {/* Right Side - Flower Logo */}
            <div className="hidden md:block">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/b9f56f5e4_image.png"
                alt="Trillium Flower"
                className="h-12 md:h-16 lg:h-20 w-12 md:w-16 lg:w-20 object-contain"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-pink-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation Links - Below Header */}
          <div className="hidden lg:flex items-center justify-center gap-6 pb-4 border-t border-gray-100 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-white"
                    : "text-gray-700 hover:bg-pink-50"
                }`}
                style={isActive(item.path) ? {backgroundColor: '#8B2635'} : {}}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            <Link to={createPageUrl("BookAppointment")}>
              <Button className="hover:opacity-90 rounded-full" style={{backgroundColor: '#8B2635'}}>
                <Calendar className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2 border-t border-gray-100 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-gray-700 hover:bg-pink-50"
                  }`}
                  style={isActive(item.path) ? {backgroundColor: '#8B2635'} : {}}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              <Link to={createPageUrl("BookAppointment")} onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" style={{backgroundColor: '#8B2635'}}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main>{children}</main>

      {/* Help Button - Bottom Right */}
      <HelpButton />

      {/* Discount Badge - Right Side Middle */}
      <DiscountBadge />

      {/* Trillium Symbol Section - Before Footer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/b9f56f5e4_image.png"
                alt="Trillium - White Lily"
                className="w-64 h-64 mx-auto rounded-full object-cover shadow-xl"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#8B2635'}}>
                The Three Petalled "Trinity Lily"
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <span className="font-semibold">(Mary's Garden)</span>
              </p>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "A three petalled lily in Mary's Garden signifies the Holy Trinity. 
                The Blossoms of Trillium symbolizes spiritual embodiment, beauty, 
                conscientiousness, grace, and recovery."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white" style={{background: 'linear-gradient(to right, #8B2635, #A0344A)'}}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e085aa0d39b7abdaa0132b/32cdbdb36_Screenshot_2025-10-04_081758-removebg-preview.png"
                alt="Trillium Dental Centre"
                className="h-20 mb-4 object-contain bg-white/10 p-2 rounded-lg"
              />
              <p className="text-pink-200 text-sm leading-relaxed">
                "Pathway to healthy smile..." - Trusted dental care for over 20 years
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-pink-200 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm text-pink-200">
                <li>
                  Sai Sampanna Bldg, Ground Floor<br />
                  Behind BEST Depot<br />
                  Vikhroli (East), Mumbai-83
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 9136729121
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Opening Hours</h4>
              <ul className="space-y-2 text-sm text-pink-200">
                <li>Monday - Saturday</li>
                <li className="font-semibold text-white">8:00 AM - 9:00 PM</li>
                <li className="mt-4 text-yellow-300">
                  🎉 Book online & get 20% OFF!
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-pink-700 mt-8 pt-8 text-center text-sm text-pink-300">
            <p>© {new Date().getFullYear()} Trillium Dental Centre. All rights reserved.</p>
            <p className="mt-2 italic">"Transforming Smiles, Enhancing Confidence"</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
