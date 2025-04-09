"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Whiteboard from "@/components/Whiteboard";

export default function WhiteboardPage() {
    // Получаем id из параметров URL
    const params = useParams();
    const boardId = Array.isArray(params.id) ? params.id[0] : params.id || "default";

    return (
        <div className="flex flex-col min-h-screen pb-10 pt-20">
            <div className="flex flex-row justify-between items-center md:px-28 md:pt-4 px-4 mb-6">
                <Link href="/boards/create">
                    <ArrowLeft className="w-8 h-8 cursor-pointer text-gray-800 hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-full p-1" />
                </Link>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-2xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2"
                >
                    Доска {boardId}
                </motion.h2>
            </div>
            <div 
                className="w-[95%] md:w-[90%] lg:w-[85%] max-w-[1200px] h-[70vh] mx-auto border-2 border-gray-300 rounded-md shadow-lg bg-white"
                style={{ minHeight: '500px' }}
            >
                <Whiteboard id={boardId} />
            </div>
        </div>
    )
}
