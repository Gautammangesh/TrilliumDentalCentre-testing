import React from "react";
import { motion } from "framer-motion";

export default function HeroSection({ title, subtitle, gradient = "linear-gradient(to right, #8B2635, #A0344A)" }) {
  return (
    <section className="text-white py-16" style={{background: gradient}}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-pink-100 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
