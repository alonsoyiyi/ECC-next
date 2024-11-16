'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatData, ChatDataResponse } from '@/types/chatTypes'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ChatListProps {
  onSelectChat: (chat: ChatData) => void;
  onSearch: (searchTerm: string) => void;
}

export default function ChatList({ onSelectChat, onSearch }: ChatListProps) {
  const [chatData, setChatData] = useState<ChatDataResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch('/api/chats')
        if (!response.ok) throw new Error('Error al cargar los chats')
        const data = await response.json()
        setChatData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setIsLoading(false)
      }
    }
    fetchChats()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>
  if (!chatData) return <div>No hay datos disponibles</div>

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Chats Disponibles</h2>
        <Input
  type="text"
  placeholder="Buscar chats..."
  value={searchTerm}
  onChange={handleSearch}
  className="w-48 bg-black text-white placeholder-gray-400 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
/>

      </div>
      <Accordion type="single" collapsible className="w-full">
        {chatData.indice.map((section, index) => (
          <AccordionItem key={index} value={`section-${index}`}>
            <AccordionTrigger>{section.label}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pl-4">
                {section.items.map((chatId) => {
                  const chat = chatData.chats.find(c => c.id === chatId)
                  if (!chat) return null
                  return (
                    <Button
                      key={chatId}
                      onClick={() => {
                        onSelectChat(chat)
                        setSelectedChatId(chatId)
                      }}
                      variant="ghost"
                      className={`w-full justify-start text-left text-sm py-1 h-auto ${
                        selectedChatId === chatId ? 'bg-red-500 text-white' : ''
                      }`}
                    >
                      {chat.title}
                    </Button>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}