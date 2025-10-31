import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AchievementCard({ achievement, index }) {
  const IconComponent = achievement.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="text-center hover:shadow-xl transition-all duration-300 border-pink-200 bg-white">
        <CardContent className="pt-8 pb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{background: 'linear-gradient(135deg, #8B2635, #A0344A)'}}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold" style={{color: '#8B2635'}}>{achievement.label}</h3>
          <p className="text-gray-600 mt-1">{achievement.subtitle}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
