'use client'
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-28">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex flex-col">
          <div className="mb-0">
            <h1 className="text-6xl font-bold mb-4">Whiteboard</h1>
            <p className="text-xl mb-8">Возможность создавать и редактировать доски вместе с другими людьми</p>
          </div>
          <div className="w-1/2 flex flex-row gap-4">
            <button onClick={() => router.push("/boards/create")} className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer">
                <span className="flex flex-row gap-2">
                    <Plus/>
                    Создать доску
                </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
