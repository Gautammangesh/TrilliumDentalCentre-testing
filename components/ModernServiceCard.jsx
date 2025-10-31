import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ModernServiceCard({ service, index }) {
  const IconComponent = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group h-full hover:shadow-2xl transition-all duration-300 border-none bg-white rounded-2xl overflow-hidden">
        <div className="h-2 w-full" style={{background: 'linear-gradient(to right, #8B2635, #A0344A)'}}></div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300" style={{background: 'linear-gradient(135deg, #8B2635, #A0344A)'}}>
              <IconComponent className="w-7 h-7 text-white" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#8B2635] group-hover:translate-x-1 transition-all duration-300" />
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#8B2635] transition-colors">
            {service.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {service.description}
          </p>
          
          {service.specialists && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wide">Specialists</p>
              <div className="flex flex-wrap gap-2">
                {service.specialists.slice(0, 2).map((specialist, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-pink-50 text-[#8B2635] border-none text-xs">
                    {specialist.split(' ')[0]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Features</p>
            <ul className="space-y-1">
              {service.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-[#8B2635] mt-1">•</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
