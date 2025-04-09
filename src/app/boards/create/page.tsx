'use client'
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CreateBoard from "@/components/CreateBoard";

interface Board {
    id: number;
    name: string;
    collaborators: string;
    image: string;
}

const boardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.4,
            ease: "easeOut"
        }
    }),
    hover: { 
        scale: 1.03, 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", 
        transition: { duration: 0.2 } 
    },
    tap: { scale: 0.98 }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            when: "beforeChildren"
        }
    }
};

export default function CreateBoardPage() {
    const router = useRouter();
    const [boards, setBoards] = useState<Board[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleCloseModal = () => {
        setIsCreating(false);
        fetchBoards();
    };

    const fetchBoards = async () => {
        try {
            const response = await fetch("/api/boards");
            const data = await response.json();
            setBoards(data);
        } catch (error) {
            console.error("Ошибка при загрузке досок:", error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen py-20 overflow-x-hidden">
            <div className="flex flex-row justify-between md:px-28 md:pt-4 ">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    className="text-3xl font-bold text-gray-800"
                >
                    Ваши доски:
                </motion.h2>
            </div>
            <motion.div 
                className="flex flex-wrap gap-8 md:px-20 md:pt-6 w-full md:w-screen"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {boards.map((board, index) => (
                    <motion.div 
                        key={board.id}
                        custom={index}
                        variants={boardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="flex flex-col gap-2 border-2 border-gray-300 rounded-md w-[300px] h-[250px] overflow-hidden cursor-pointer shadow-sm" 
                        onClick={() => router.push(`/boards/${board.id}`)}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image className="w-[300px] h-[150px] object-cover" src={board.image} alt={board.name} width={300} height={150} />
                        </motion.div>
                        <div className="flex flex-col px-2 pb-4">
                            <h3 className="text-md font-bold text-gray-800">{board.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{board.collaborators}</p>
                        </div>
                    </motion.div>
                ))}
                <motion.div 
                    key="new-board"
                    custom={boards.length}
                    variants={boardVariants}
                    whileHover={{ 
                        scale: 1.03, 
                        backgroundColor: "#2563eb", 
                        color: "white",
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center justify-center border-dashed border-2 border-blue-600 rounded-md w-[300px] h-[250px] text-blue-600 overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
                    onClick={() => setIsCreating(true)}
                >
                    <Plus className="w-10 h-10"/>
                    <span className="mt-2 font-medium">Создать новую доску</span>
                </motion.div>
            </motion.div>
            <CreateBoard isOpen={isCreating} onClose={handleCloseModal} />
        </div>
    )
}
