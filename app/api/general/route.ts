import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'server');
    const filePath = path.join(jsonDirectory, 'GeneralData.json');

    try {
      await fs.access(filePath);
    } catch (error) {
      console.error('El archivo GeneralData.json no existe en:', filePath, error);
      return NextResponse.json(
        { error: 'Archivo no encontrado' },
        { status: 404 }
      );
    }

    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
