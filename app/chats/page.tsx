'use client'

import { useState } from 'react'
import MainLayout, { GlobalInputs } from '@/components/MainLayout'
import ChatList from '@/components/ChatList'
import ChatDetail from '@/components/ChatDetail'

export default function ChatsPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  return (
    <MainLayout>
      {({ globalInputs }: { globalInputs: GlobalInputs }) => (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <ChatList onSelectChat={setSelectedChatId} />
          </div>
          <div className="w-full md:w-2/3">
            <ChatDetail selectedChatId={selectedChatId} globalInputs={globalInputs} />
          </div>
        </div>
      )}
    </MainLayout>
  )
}