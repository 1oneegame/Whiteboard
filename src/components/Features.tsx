'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { Users, Lock, ArrowUpRight, DollarSign } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    title: "Колобораций с другими людьми",
    description: "Доска, созданная на Whiteboard, позволяет вам совместно редактировать контент с другими людьми, что позволяет вам работать вместе над одним проектом.",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Безопасность и конфиденциальность",
    description: "Доска, созданная на Whiteboard, является безопасной и конфиденциальной, что позволяет вам хранить свои заметки в безопасности.",
    icon: <Lock className="w-6 h-6" />
  },
  {
    title: "Легкость использования",
    description: "Доска, созданная на Whiteboard, является легкой в использовании, что позволяет вам быстро создавать и редактировать свои заметки.",
    icon: <ArrowUpRight className="w-6 h-6" />
  },
  {
    title: "Абсолютно бесплатно",
    description: "Доска, созданная на Whiteboard, является бесплатной, следовательно пользователи не должны платить за использование доски.",
    icon: <DollarSign className="w-6 h-6" />
  },
]

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      className="mt-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-10 text-gray-800"
      >
        Почему стоит использовать Whiteboard?
      </motion.h2>
      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="bg-white shadow-md scale-100 hover:scale-105 transition-all duration-300 p-4 rounded-md w-[500px] cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg font-bold mt-2 text-center flex items-center justify-center gap-2 text-gray-800">{feature.icon}{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 text-center text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
