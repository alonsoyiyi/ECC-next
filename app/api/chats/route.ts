import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { ChatDataResponse } from '@/types/chatTypes'

export async function GET() {
  try {
    // Obtener la ruta absoluta al directorio server
    const jsonDirectory = path.join(process.cwd(), 'server')
    
    // Verificar si el archivo existe
    const filePath = path.join(jsonDirectory, 'ChatData.json')
    try {
      await fs.access(filePath)
    } catch (error) {
      console.error('El archivo ChatData.json no existe en:', filePath)
      return NextResponse.json(
        { error: 'Archivo de chats no encontrado' },
        { status: 404 }
      )
    }

    // Leer el archivo
    const fileContents = await fs.readFile(filePath, 'utf8')
    
    // Intentar parsear el JSON
    let data: ChatDataResponse
    try {
      data = JSON.parse(fileContents)
    } catch (error) {
      console.error('Error al parsear el JSON:', error)
      return NextResponse.json(
        { error: 'Formato de archivo inválido' },
        { status: 400 }
      )
    }

    // Verificar la estructura del JSON
    if (!data.chats || !data.indice) {
      console.error('Estructura del JSON inválida')
      return NextResponse.json(
        { error: 'Estructura de datos inválida' },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error al cargar los chats:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}