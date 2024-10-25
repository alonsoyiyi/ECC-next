'use client'

import { useState } from 'react'
import MainLayout from '@/components/MainLayout'
import GeneralList from '@/components/GeneralList'
import GeneralDetail from '@/components/GeneralDetail'

export default function GeneralPage() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <GeneralList onSelectItem={setSelectedItemId} />
        </div>
        <div className="w-full md:w-2/3">
          <GeneralDetail selectedItemId={selectedItemId} />
        </div>
      </div>
    </MainLayout>
  )
}