import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category parameter is required' })
  }

  // Definir la ruta al archivo JSON
  const filePath = path.join(process.cwd(), 'server', `${category}.json`)

  // Verificar que el archivo exista antes de leerlo
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error reading file' })
    console.error(error)
  }
}