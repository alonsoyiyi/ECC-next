import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query

  if (typeof category !== 'string') {
    return res.status(400).json({ error: 'Invalid category' })
  }

  const filePath = path.join(process.cwd(), 'server', `${category}.json`)

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error reading file' })
  }
}