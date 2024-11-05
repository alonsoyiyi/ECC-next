'use client'

import React, { useState } from 'react'
import { ChatData } from '@/types/chatTypes'
import ChatList from '@/components/ChatList'
import ChatDetail from '@/components/ChatDetail'
import { useGlobalInputs } from '@/components/GlobalInputsProvider'

export default function ChatsPage() {
  const { globalInputs } = useGlobalInputs()
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null)

  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3 overflow-y-auto">
        <ChatList onSelectChat={setSelectedChat} />
      </div>
      <div className="w-2/3 sticky top-4 self-start">
        <ChatDetail globalInputs={globalInputs} selectedChat={selectedChat} />
      </div>
    </div>
  )
}