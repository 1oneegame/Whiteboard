'use client'
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-28">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-0"
          >
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-6xl font-bold mb-4"
            >
              Whiteboard
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl mb-8"
            >
              Возможность создавать и редактировать доски вместе с другими людьми
            </motion.p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-1/2 flex flex-row gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/boards/create")} 
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer"
            >
                <span className="flex flex-row gap-2">
                    <Plus/>
                    Создать доску
                </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
