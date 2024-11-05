import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { LegalData } from '@/types/legalTypes'

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'server')
    const filePath = path.join(jsonDirectory, 'LegalesData.json')
    
    try {
      await fs.access(filePath)
    } catch (error) {
      console.error('El archivo LegalesData.json no existe en:', filePath, error)
      return NextResponse.json(
        { error: 'Archivo de datos legales no encontrado' },
        { status: 404 }
      )
    }

    const fileContents = await fs.readFile(filePath, 'utf8')
    
    let data: LegalData
    try {
      data = JSON.parse(fileContents)
    } catch (error) {
      console.error('Error al parsear el JSON:', error)
      return NextResponse.json(
        { error: 'Formato de archivo inválido' },
        { status: 400 }
      )
    }

    if (!data.messages || !data.inputs) {
      console.error('Estructura del JSON inválida')
      return NextResponse.json(
        { error: 'Estructura de datos inválida' },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error al cargar los datos legales:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}