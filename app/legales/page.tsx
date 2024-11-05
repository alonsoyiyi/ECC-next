'use client'

import LegalDetail from '@/components/LegalDetail'
import { GlobalInputs } from '@/types/globalTypes'

export default function LegalesPage() {
  const emptyGlobalInputs: GlobalInputs = {
    nombre: '',
  }

  return (
    <div className="container mx-auto p-4">
      <LegalDetail 
        selectedLegalId="1" 
        globalInputs={emptyGlobalInputs}
      />
    </div>
  )
}