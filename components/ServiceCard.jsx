import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function ServiceCard({ service, index }) {
  const IconComponent = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-2xl transition-all duration-300 border-pink-200 bg-white">
        <CardHeader>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{background: 'linear-gradient(135deg, #8B2635, #A0344A)'}}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl" style={{color: '#8B2635'}}>
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {service.description}
          </p>
          
          {service.specialists && (
            <div>
              <p className="text-sm font-semibold mb-2" style={{color: '#8B2635'}}>Specialists:</p>
              {service.specialists.map((specialist, idx) => (
                <Badge key={idx} variant="secondary" className="mr-2 mb-2 bg-pink-100" style={{color: '#8B2635'}}>
                  {specialist}
                </Badge>
              ))}
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Key Features:</p>
            <ul className="space-y-1">
              {service.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span style={{color: '#8B2635'}} className="mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
