'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChatData, ChatDataResponse } from '@/types/chatTypes'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ChatListProps {
  onSelectChat: (chat: ChatData) => void;
}

export default function ChatList({ onSelectChat }: ChatListProps) {
  const [chatData, setChatData] = useState<ChatDataResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>
  if (!chatData) return <div>No hay datos disponibles</div>

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold mb-4">Chats Disponibles</h2>
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
                      onClick={() => onSelectChat(chat)}
                      variant="ghost"
                      className="w-full justify-start text-left text-sm py-1 h-auto"
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