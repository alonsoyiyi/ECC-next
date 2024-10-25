import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

type Chat = {
  id: string
  title: string
}

type ChatListProps = {
  onSelectChat: (id: string | null) => void
}

export default function ChatList({ onSelectChat }: ChatListProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  useEffect(() => {
    // Cargar chats (ejemplo)
    setChats([
      { id: '1', title: 'Chat 1' },
      { id: '2', title: 'Chat 2' },
      { id: '3', title: 'Chat 3' },
    ])
  }, [])

  const handleSelectChat = (id: string) => {
    setSelectedChat(id)
    onSelectChat(id)
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Chats disponibles</h2>
      <div className="space-y-2">
        {chats.map((chat) => (
          <Button
            key={chat.id}
            variant={selectedChat === chat.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleSelectChat(chat.id)}
          >
            {chat.title}
          </Button>
        ))}
      </div>
    </div>
  )
}