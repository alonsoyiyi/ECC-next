'use client'

import React, { useState, useEffect } from 'react'
import { ChatData, ChatDataResponse } from '@/types/chatTypes'
import ChatList from '@/components/ChatList'
import ChatDetail from '@/components/ChatDetail'
import { useGlobalInputs } from '@/components/GlobalInputsProvider'

export default function ChatsPage() {
  const { globalInputs } = useGlobalInputs()
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null)
  const [allChats, setAllChats] = useState<ChatData[]>([])
  const [searchResults, setSearchResults] = useState<ChatData[]>([])

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch('/api/chats')
        if (!response.ok) throw new Error('Error al cargar los chats')
        const data: ChatDataResponse = await response.json()
        setAllChats(data.chats)
      } catch (err) {
        console.error('Error al cargar los chats:', err)
      }
    }
    fetchChats()
  }, [])

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      setSearchResults([])
      return
    }
    const results = allChats.filter(chat => 
      chat.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  const handleSelectChat = (chat: ChatData) => {
    setSelectedChat(chat)
    setSearchResults([])
  }

  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <ChatList onSelectChat={handleSelectChat} onSearch={handleSearch} />
      </div>
      <div className="w-2/3 sticky top-4 self-start">
        <ChatDetail 
          selectedChat={selectedChat} 
          globalInputs={globalInputs}
          searchResults={searchResults}
          onSelectSearchResult={handleSelectChat}
        />
      </div>
    </div>
  )
}