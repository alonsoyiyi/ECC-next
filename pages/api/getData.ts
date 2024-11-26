import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

interface GeneralDataItem {
  id: string
  label: string
  message: string
  data?: Record<string, unknown>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category parameter is required' })
  }

  const filePath = path.join(process.cwd(), 'server', `${category}.json`)

  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const data: Record<string, GeneralDataItem> = JSON.parse(fileContents)
    res.status(200).json(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Ahora 'error' es un objeto de tipo Error
      console.error(error.message)
      res.status(500).json({ error: 'Error reading file' })
    } else {
      // Si el error no es una instancia de Error, manejamos ese caso
      res.status(500).json({ error: 'Unknown error occurred' })
    }
  }
}
