import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Board {
    id: number;
    name: string;
    collaborators: string;
    image: string;
}

interface CreateBoardProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateBoard({ isOpen, onClose }: CreateBoardProps) {
    const [newBoard, setNewBoard] = useState<Board>({
        id: 0,
        name: "",
        collaborators: "",
        image: "/images/placeholder.svg"
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBoards = async () => {
            const response = await fetch("/api/boards");
            const data = await response.json();
            setNewBoard(prev => ({
                ...prev,
                id: data.length > 0 ? Math.max(...data.map((b: Board) => b.id)) + 1 : 1
            }));
        };
        fetchBoards();
    }, []);

    const handleCreateBoard = async () => {
        if (!newBoard.name.trim()) {
            alert("Пожалуйста, введите название доски");
            return;
        }
        
        setIsLoading(true);
        
        try {
            const response = await fetch("/api/boards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBoard)
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log("Создана новая доска:", result.board);
                setNewBoard({
                    id: 0,
                    name: "",
                    collaborators: "",
                    image: "/images/placeholder.svg"
                });
                onClose();
            } else {
                alert("Ошибка при создании доски");
                console.error("Ошибка:", result.error);
            }
        } catch (error) {
            alert("Ошибка при создании доски");
            console.error("Ошибка:", error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <AnimatePresence>
            {isOpen && (
            <div className="w-full h-full fixed inset-0 flex items-center justify-center z-50">
                <motion.div 
                    className="absolute inset-0 backdrop-blur-sm bg-black/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                ></motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ 
                        duration: 0.3, 
                        type: "spring", 
                        damping: 25, 
                        stiffness: 300 
                    }}
                    className="relative z-10"
                >
                    <Card className="w-full max-w-md shadow-xl">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>Создать доску</CardTitle>
                            <motion.div
                                whileHover={{ rotate: 90, scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-5 h-5 cursor-pointer hover:text-red-500 hover:bg-gray-100 rounded-full p-1 transition-all duration-300" onClick={onClose}/>
                            </motion.div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Название доски</label>
                                <Input 
                                    type="text" 
                                    placeholder="Введите название" 
                                    value={newBoard.name}
                                    onChange={(e) => setNewBoard({ ...newBoard, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Участники</label>
                                <Input 
                                    type="text" 
                                    placeholder="Имена участников" 
                                    value={newBoard.collaborators}
                                    onChange={(e) => setNewBoard({ ...newBoard, collaborators: e.target.value })}
                                />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button 
                                    onClick={handleCreateBoard} 
                                    className="mt-2 w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Создание..." : "Создать"}
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
    )
}
