import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category parameter is required' })
  }

  const filePath = path.join(process.cwd(), 'server', `${category}.json`)
  console.log(`Attempting to read file from: ${filePath}`)

  try {
    await fs.access(filePath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`El archivo ${category}.json no existe en:`, filePath, error.message);
      return res.status(404).json({ error: 'File not found' })
    } else {
      console.error(`Error desconocido al verificar acceso al archivo ${category}.json en:`, filePath);
      return res.status(500).json({ error: 'Unknown error occurred' })
    }
  }

  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    console.log("File read successfully")
    res.status(200).json(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      res.status(500).json({ error: 'Error reading file' })
    } else {
      res.status(500).json({ error: 'Unknown error occurred' })
    }
  }
}
