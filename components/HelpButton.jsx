import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Help Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Card className="w-80 border-none shadow-2xl rounded-2xl overflow-hidden">
              <CardHeader className="text-white p-4" style={{background: 'linear-gradient(135deg, #8B2635, #A0344A)'}}>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>How can we help?</span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <a 
                  href="tel:+919136729121"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-500">+91 9136729121</p>
                  </div>
                </a>

                <a 
                  href="https://wa.me/919136729121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-500">Chat with us</p>
                  </div>
                </a>

                <button 
                  onClick={() => window.location.href = '/Contact'}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 transition-colors group w-full text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Us</p>
                    <p className="text-sm text-gray-500">Send a message</p>
                  </div>
                </button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Help Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 text-white"
          style={{background: 'linear-gradient(135deg, #8B2635, #A0344A)'}}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
        
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"
          />
        )}
      </motion.div>
    </>
  );
}
