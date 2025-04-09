import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const boardsFilePath = path.join(process.cwd(), 'public/data/boards.json');

export async function GET() {
  try {
    const fileContent = fs.readFileSync(boardsFilePath, 'utf8');
    const boards = JSON.parse(fileContent);
    return NextResponse.json(boards);
  } catch (error) {
    console.error('Ошибка при чтении файла досок:', error);
    return NextResponse.json({ error: 'Не удалось получить доски' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const fileContent = fs.readFileSync(boardsFilePath, 'utf8');
    const boards = JSON.parse(fileContent);
    
    const newBoard = await request.json();
    
    boards.push(newBoard);
    
    fs.writeFileSync(boardsFilePath, JSON.stringify(boards, null, 2));
    
    return NextResponse.json({ success: true, board: newBoard });
  } catch (error) {
    console.error('Ошибка при создании доски:', error);
    return NextResponse.json({ error: 'Не удалось создать доску' }, { status: 500 });
  }
} 