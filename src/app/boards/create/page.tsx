import { Plus } from "lucide-react";
import Image from "next/image";
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
    return (
        <div className="flex flex-col h-screen py-20">
            <div className="flex flex-row justify-between md:px-28 md:pt-4 ">
                <h2 className="text-3xl font-bold text-gray-800">Ваши доски:</h2>
            </div>
            <div className="flex flex-wrap gap-8 md:px-20 md:pt-6 w-screen">
                {boards.map((board, index) => (
                    <div 
                        className="flex flex-col gap-2 border-2 border-gray-300 rounded-md w-[300px] h-[250px] overflow-hidden scale-95 hover:scale-100 transition-all duration-300 cursor-pointer" 
                        key={index}
                    >
                        <Image className=" w-[300px] h-[150px]" src={board.image} alt={board.name} width={100} height={100} />
                        <div className="flex flex-col px-2 pb-4">
                            <h3 className="text-md font-bold text-gray-800">{board.name}</h3>
                            <p className="text-sm text-gray-500">{board.collaborators}</p>
                        </div>
                    </div>
                ))}
                <div 
                    className="flex flex-col items-center justify-center border-dashed border-2 border-blue-600 rounded-md w-[300px] h-[250px] hover:bg-blue-600 text-blue-600 hover:text-white overflow-hidden scale-95 hover:scale-100 transition-all duration-300 cursor-pointer"
                >
                    <Plus className="w-10 h-10"/>
                </div>
            </div>
        </div>
    )
}
