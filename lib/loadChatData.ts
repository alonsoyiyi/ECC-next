import { promises as fs } from 'fs'
import path from 'path'
import { ChatDataResponse } from '@/types/chatTypes'

export async function loadChatData(): Promise<ChatDataResponse> {
  const jsonDirectory = path.join(process.cwd(), 'server')
  const fileContents = await fs.readFile(jsonDirectory + '/ChatData.json', 'utf8')
  return JSON.parse(fileContents)
}