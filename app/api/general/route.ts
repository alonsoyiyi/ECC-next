import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), 'server');
  const filePath = path.join(jsonDirectory, 'GeneralData.json');
  console.log(`Attempting to read file from: ${filePath}`)

  try {
    await fs.access(filePath);
  } catch (error) {
    console.error('El archivo GeneralData.json no existe en:', filePath, error);
    return NextResponse.json(
      { error: 'Archivo no encontrado' },
      { status: 404 }
    );
  }

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    console.log("File read successfully")
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
