"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Pen, Trash, Download } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

interface StrokeStyle {
  color: string;
  width: number;
}

interface WhiteboardProps {
  id: string;
}

const Whiteboard = ({ id }: WhiteboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<"pen" | "eraser">("pen");
  const [strokeStyle, setStrokeStyle] = useState<StrokeStyle>({
    color: "#000000",
    width: 3,
  });
  const [lastPosition, setLastPosition] = useState<Position | null>(null);

  const getStorageKey = useCallback(() => `whiteboard-data-${id}`, [id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (!parent) return;

      const { width, height } = parent.getBoundingClientRect();
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const imageData = localStorage.getItem(getStorageKey());
      if (imageData) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = imageData;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [id, getStorageKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const imageData = localStorage.getItem(getStorageKey());
    if (imageData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = imageData;
    }
  }, [id, getStorageKey]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPosition({ x, y });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPosition) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    
    if (currentTool === "pen") {
      ctx.strokeStyle = strokeStyle.color;
      ctx.lineWidth = strokeStyle.width;
    } else {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 20;
    }
    
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    setLastPosition(currentPosition);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
    saveCanvas();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setIsDrawing(true);
    setLastPosition({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !lastPosition) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const currentPosition = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(currentPosition.x, currentPosition.y);
    
    if (currentTool === "pen") {
      ctx.strokeStyle = strokeStyle.color;
      ctx.lineWidth = strokeStyle.width;
    } else {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 20;
    }
    
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    setLastPosition(currentPosition);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    endDrawing();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    localStorage.removeItem(getStorageKey());
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const imageData = canvas.toDataURL("image/png");
    localStorage.setItem(getStorageKey(), imageData);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const imageData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageData;
    link.download = `whiteboard-${id}.png`;
    link.click();
  };

  return (
    <div className="flex flex-col w-full h-full border border-gray-200">
      <div className="flex flex-wrap flex-row gap-2 p-2 bg-gray-100 rounded-t-md">
        <Button
          variant={currentTool === "pen" ? "default" : "outline"}
          size="icon"
          onClick={() => setCurrentTool("pen")}
          title="Перо"
        >
          <Pen className="h-4 w-4" />
        </Button>
        <Button
          variant={currentTool === "eraser" ? "default" : "outline"}
          size="icon"
          onClick={() => setCurrentTool("eraser")}
          title="Ластик"
        >
          <Eraser className="h-4 w-4" />
        </Button>
        {currentTool === "pen" && (
          <input
            type="color"
            value={strokeStyle.color}
            onChange={(e) =>
              setStrokeStyle({ ...strokeStyle, color: e.target.value })
            }
            className="w-8 h-8 rounded cursor-pointer"
            title="Цвет"
          />
        )}
        {currentTool === "pen" && (
          <select
            value={strokeStyle.width}
            onChange={(e) =>
              setStrokeStyle({
                ...strokeStyle,
                width: parseInt(e.target.value),
              })
            }
            className="px-2 py-1 rounded text-sm"
            title="Толщина"
          >
            <option value="1">Тонкая</option>
            <option value="3">Средняя</option>
            <option value="5">Толстая</option>
            <option value="10">Очень толстая</option>
          </select>
        )}
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={clearCanvas}
            title="Очистить"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button
            variant="outline" 
            size="icon"
            onClick={downloadCanvas}
            title="Скачать"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div 
        ref={containerRef} 
        className="flex-1 relative bg-white min-h-[500px]"
        style={{ width: '100%', height: 'calc(100% - 40px)' }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair touch-none bg-white"
          style={{ display: 'block', border: '1px solid #ddd' }}
        />
      </div>
    </div>
  );
};

export default Whiteboard; 