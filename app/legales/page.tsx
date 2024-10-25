'use client'

import { useState } from 'react'
import MainLayout, { GlobalInputs } from '@/components/MainLayout'
import LegalList from '@/components/LegalList'
import LegalDetail from '@/components/LegalDetail'

export default function LegalesPage() {
  const [selectedLegalId, setSelectedLegalId] = useState<string | null>(null)

  return (
    <MainLayout>
      {({ globalInputs }: { globalInputs: GlobalInputs }) => (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <LegalList onSelectLegal={setSelectedLegalId} />
          </div>
          <div className="w-full md:w-2/3">
            <LegalDetail selectedLegalId={selectedLegalId} globalInputs={globalInputs} />
          </div>
        </div>
      )}
    </MainLayout>
  )
}