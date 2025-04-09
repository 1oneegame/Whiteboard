'use client'
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const boards = [
    {
        id: 1,
        name: "Board 1",
        collaborators: "Aizhas Serikov, Aizhas Serikov, Aizhas Serikov",
        image: "/images/placeholder.svg"
    },
    {
        id: 2,
        name: "Board 2",
        collaborators: "Aizhas Serikov, Aizhas Serikov, Aizhas Serikov",
        image: "/images/placeholder.svg"
    },
    {
        id: 3,
        name: "Board 3",
        collaborators: "Aizhas Serikov, Aizhas Serikov, Aizhas Serikov",
        image: "/images/placeholder.svg"
    },
    {
        id: 4,
        name: "Board 4",
        collaborators: "Aizhas Serikov, Aizhas Serikov, Aizhas Serikov",
        image: "/images/placeholder.svg"
    },
    {
        id: 5,
        name: "Board 5",
        collaborators: "Aizhas Serikov, Aizhas Serikov, Aizhas Serikov",
        image: "/images/placeholder.svg"
    }
]

export default function CreateBoard() {
    const router = useRouter();
    return (
        <div className="flex flex-col min-h-screen py-20 overflow-x-hidden">
            <div className="flex flex-row justify-between md:px-28 md:pt-4 ">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-3xl font-bold text-gray-800"
                >
                    Ваши доски:
                </motion.h2>
            </div>
            <div className="flex flex-wrap gap-8 md:px-20 md:pt-6 w-screen ">
                {boards.map((board, index) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col gap-2 border-2 border-gray-300 rounded-md w-[300px] h-[250px] overflow-hidden cursor-pointer" 
                        key={index}
                        onClick={() => router.push(`/boards/${board.id}`)}
                    >
                        <Image className="w-[300px] h-[150px]" src={board.image} alt={board.name} width={100} height={100} />
                        <div className="flex flex-col px-2 pb-4">
                            <h3 className="text-md font-bold text-gray-800">{board.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{board.collaborators}</p>
                        </div>
                    </motion.div>
                ))}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: boards.length * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#2563eb", color: "white" }}
                    className="flex flex-col items-center justify-center border-dashed border-2 border-blue-600 rounded-md w-[300px] h-[250px] text-blue-600 overflow-hidden cursor-pointer"
                >
                    <Plus className="w-10 h-10"/>
                </motion.div>
            </div>
        </div>
    )
}
