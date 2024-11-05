import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'server');
    const filePath = path.join(jsonDirectory, 'VentasData.json');

    // Verificar si el archivo existe
    try {
      await fs.access(filePath);
    } catch (error) {
      console.error('El archivo VentasData.json no existe en:', filePath, error);
      return NextResponse.json(
        { error: 'Archivo de ventas no encontrado' },
        { status: 404 }
      );
    }

    // Leer el archivo
    const fileContents = await fs.readFile(filePath, 'utf8');

    // Intentar parsear el JSON
    let data;
    try {
      data = JSON.parse(fileContents);
    } catch (error) {
      console.error('Error al parsear el JSON:', error);
      return NextResponse.json(
        { error: 'Formato de archivo inválido' },
        { status: 400 }
      );
    }

    // Verificar la estructura del JSON
    if (!data.plantillas || !data.inputs) {
      console.error('Estructura del JSON inválida');
      return NextResponse.json(
        { error: 'Estructura de datos inválida' },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al cargar los datos de ventas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
